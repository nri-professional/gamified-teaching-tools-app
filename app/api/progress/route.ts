// app/api/progress/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/progress
// Auth only: returns per-course summary progress for current user
export async function GET(req: Request) {
    const supabase = await createClient();

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

    const { data, error } = await supabase
        .from("user_course_progress")
        .select("course_id, current_level_index, total_xp");

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json(data ?? []);
}
