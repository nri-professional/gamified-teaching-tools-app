// app/api/levels/[levelId]/complete/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface Context {
    params: { levelId: string };
}

// POST /api/levels/:levelId/complete
// Marks this level as completed for the current user
// and updates user_course_progress.
// MVP: no complex locking, you can enforce that in the UI for now.
export async function POST(_req: Request, { params }: Context) {
    const supabase = await createClient();
    const levelId = Number(params.levelId);

    if (Number.isNaN(levelId)) {
        return NextResponse.json(
            { error: "Invalid level id" },
            { status: 400 }
        );
    }

    // 1. Get current user
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return NextResponse.json(
            { error: "Not authenticated" },
            { status: 401 }
        );
    }

    // 2. Get level info
    const { data: level, error: levelError } = await supabase
        .from("levels")
        .select("id, course_id, index_in_course, xp_reward")
        .eq("id", levelId)
        .single();

    if (levelError || !level) {
        return NextResponse.json(
            { error: "Level not found" },
            { status: 404 }
        );
    }

    const xpReward = level.xp_reward ?? 0;

    // 3. Check existing level progress to avoid double-awarding XP
    const { data: existingLevelProgress } = await supabase
        .from("user_level_progress")
        .select("id, status")
        .eq("user_id", user.id)
        .eq("level_id", level.id)
        .maybeSingle();

    const alreadyCompleted =
        existingLevelProgress && existingLevelProgress.status === "completed";

    // 4. Upsert level progress as completed
    const { error: upsertLevelError } = await supabase
        .from("user_level_progress")
        .upsert(
            {
                user_id: user.id,
                level_id: level.id,
                status: "completed",
                last_updated: new Date().toISOString(),
            },
            {
                onConflict: "user_id,level_id",
            }
        );

    if (upsertLevelError) {
        return NextResponse.json(
            { error: upsertLevelError.message },
            { status: 400 }
        );
    }

    // 5. Update user_course_progress summary
    //    - If no record: create one
    //    - If record: bump current_level_index forward
    //    - Only add XP if this is the first time completing this level
    const { data: courseProgress } = await supabase
        .from("user_course_progress")
        .select("id, current_level_index, total_xp")
        .eq("user_id", user.id)
        .eq("course_id", level.course_id)
        .maybeSingle();

    const newCurrentLevelIndex = Math.max(
        courseProgress?.current_level_index ?? 0,
        level.index_in_course
    );

    const newTotalXp =
        (courseProgress?.total_xp ?? 0) + (alreadyCompleted ? 0 : xpReward);

    const { data: updatedCourseProgress, error: upsertCourseError } =
        await supabase
            .from("user_course_progress")
            .upsert(
                {
                    user_id: user.id,
                    course_id: level.course_id,
                    current_level_index: newCurrentLevelIndex,
                    total_xp: newTotalXp,
                    last_updated: new Date().toISOString(),
                },
                { onConflict: "user_id,course_id" }
            )
            .select("course_id, current_level_index, total_xp")
            .single();

    if (upsertCourseError) {
        return NextResponse.json(
            { error: upsertCourseError.message },
            { status: 400 }
        );
    }

    return NextResponse.json({
        ok: true,
        level_id: level.id,
        course_id: level.course_id,
        current_level_index: updatedCourseProgress.current_level_index,
        total_xp: updatedCourseProgress.total_xp,
    });
}
