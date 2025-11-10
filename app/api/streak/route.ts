// app/api/streak/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/streak
export async function GET() {
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
        .from("user_streaks")
        .select("current_streak, longest_streak, last_active_date")
        .eq("user_id", user.id)
        .single();

    // PGRST116 is "No rows found", which is fine here
    if (error && error.code !== "PGRST116") {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }

    if (!data) {
        return NextResponse.json({
            current_streak: 0,
            longest_streak: 0,
            last_active_date: null,
        });
    }

    return NextResponse.json(data);
}

// POST /api/streak
export async function POST(req: Request) {
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

    const body = await req.json();
    const {
        current_streak,
        longest_streak,
        last_active_date,
    } = body || {};

    const update = {
        user_id: user.id,
        ...(current_streak !== undefined && { current_streak }),
        ...(longest_streak !== undefined && { longest_streak }),
        ...(last_active_date !== undefined && { last_active_date }),
    };

    const { data, error } = await supabase
        .from("user_streaks")
        .upsert(update, { onConflict: "user_id" })
        .select("current_streak, longest_streak, last_active_date")
        .single();

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }

    return NextResponse.json(data);
}
