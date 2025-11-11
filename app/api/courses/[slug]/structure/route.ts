import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface RouteContext {
    params: { slug: string };
}

export async function GET(_req: Request, context: RouteContext) {
    const { slug } = context.params;
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("courses")
        .select(`
      id,
      slug,
      title,
      description,
      created_by,
      levels (
        id,
        index_in_course,
        title,
        xp_reward,
        questions (
          id,
          type,
          prompt,
          question_options (
            id,
            text
          )
        )
      )
    `)
        .eq("slug", slug)
        .eq("is_public", true)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(data);
}
