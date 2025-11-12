// app/api/health/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
    try {
        const supabase = await createClient();

        // Try a very simple query against a known table
        const { data, error } = await supabase
            .from("courses")
            .select("id")
            .limit(1);

        if (error) {
            return NextResponse.json(
                {
                    ok: false,
                    stage: "query",
                    error: error.message,
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            ok: true,
            stage: "connected",
            sampleCourseIds: data?.map((c) => c.id) ?? [],
        });
    } catch (err: any) { /*An AI thinks this should be changed to unknown vs any*/
        return NextResponse.json(
            {
                ok: false,
                stage: "init",
                error: err?.message || String(err),
            },
            { status: 500 }
        );
    }
}
