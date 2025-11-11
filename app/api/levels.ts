// lib/api/levels.ts

export async function completeLevel(levelId: number) {
    const res = await fetch(`/api/levels/${levelId}/complete`, {
        method: "POST",
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Failed to complete level");
    }

    return data as {
        ok: true;
        level_id: number;
        course_id: number;
        current_level_index: number;
        total_xp: number;
    };
}
