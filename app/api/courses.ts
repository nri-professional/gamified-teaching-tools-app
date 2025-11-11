// lib/api/courses.ts

export async function getCourses() {
    const res = await fetch("/api/courses", {
        method: "GET",
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to load courses");
    return res.json();
}

export async function createCourse(input: {
    title: string;
    slug: string;
    description?: string;
}) {
    const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to create course");
    return data;
}

// fetch full course structure for course page
export async function getCourseStructure(slug: string) {
    const res = await fetch(`/api/courses/${slug}/structure`, {
        method: "GET",
        cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to load course");
    return data as {
        id: number;
        slug: string;
        title: string;
        description: string | null;
        created_by: string;
        levels: {
            id: number;
            index_in_course: number;
            title: string;
            xp_reward: number;
            questions: {
                id: number;
                type: string;
                prompt: string;
                question_options: { id: number; text: string }[];
            }[];
        }[];
    };
}
