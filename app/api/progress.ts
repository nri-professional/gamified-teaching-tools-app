// lib/api/progress.ts

export type CourseProgress = {
    course_id: number;
    current_level_index: number | null;
    total_xp: number;
};

export async function getUserCourseProgress(): Promise<CourseProgress[]> {
    const res = await fetch("/api/progress", {
        method: "GET",
        cache: "no-store",
    });

    if (res.status === 401) {
        // not logged in, treat as no progress
        return [];
    }

    if (!res.ok) {
        throw new Error("Failed to load progress");
    }

    return res.json();
}
