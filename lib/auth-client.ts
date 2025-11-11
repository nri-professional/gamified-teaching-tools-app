"use client";

import { createClient as createSupabaseBrowserClient } from "@/lib/supabase/client";

// Email + password sign up
export async function signUp(email: string, password: string) {
    const supabase = createSupabaseBrowserClient();
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

// Email + password sign in
export async function signIn(email: string, password: string) {
    const supabase = createSupabaseBrowserClient();
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

// Sign out
export async function signOut() {
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error(error.message);
    }
}
