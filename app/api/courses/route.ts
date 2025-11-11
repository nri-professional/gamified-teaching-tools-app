// app/api/courses/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/courses
// Public: list courses for homepage
export async function GET() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("courses")
        .select("id, slug, title, description, created_by")
        .eq("is_public", true)
        .order("id");

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json(data);
}

// POST /api/courses
// Auth required: create a course owned by current user
// Body: { title, slug, description? }
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
    const { title, slug, description } = body || {};

    if (!title || !slug) {
        return NextResponse.json(
            { error: "Missing title or slug" },
            { status: 400 }
        );
    }

    const { data, error } = await supabase
        .from("courses")
        .insert({
            title,
            slug,
            description: description ?? null,
            created_by: user.id,
            is_public: true,
        })
        .select("id, slug, title, description, created_by")
        .single();

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }

    return NextResponse.json(data, { status: 201 });
}
