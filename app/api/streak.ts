// lib/api/streak.ts

// Get current user's streak.
// Throws if not authenticated or request fails.
export async function getStreak() {
    const res = await fetch("/api/streak", {
        method: "GET",
        cache: "no-store",
    });

    if (res.status === 401) {
        // Not logged in, caller can decide to show nothing or prompt login
        throw new Error("Not authenticated");
    }

    if (!res.ok) {
        throw new Error("Failed to load streak");
    }

    return res.json() as Promise<{
        current_streak: number;
        longest_streak: number;
        last_active_date: string | null;
    }>;
}

// Update streak for current user.
// Pass only the fields you want to change.
export async function updateStreak(input: {
    current_streak?: number;
    longest_streak?: number;
    last_active_date?: string; // "YYYY-MM-DD"
}) {
    const res = await fetch("/api/streak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Failed to update streak");
    }

    return data as {
        current_streak: number;
        longest_streak: number;
        last_active_date: string | null;
    };
}
