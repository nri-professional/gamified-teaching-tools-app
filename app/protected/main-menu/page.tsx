/*
  NOTE (generated code trace):
  The Main Menu page had its background image and fallback gradient removed in response to the user prompt:

  "remove the background image and fallback color gradient"

  The page otherwise retains its main navigation layout and styling.
*/

'use client';

import Link from 'next/link';
import { Flame, BookOpen, Trophy, User, FilePlus, Swords, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <main className="w-full flex justify-center">
      <section className="pixel-panel relative mt-10 w-full max-w-4xl rounded-3xl px-8 py-10 text-foreground overflow-hidden">
        <div className="absolute right-6 top-6 text-primary/70">
          <Sparkles className="h-5 w-5" />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="pixel-chip flex h-12 w-12 items-center justify-center rounded-md">
              <Flame className="h-6 w-6 text-primary" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                World 01
              </p>
              <h1 className="text-3xl md:text-4xl text-primary">LearnQuest</h1>
            </div>
          </div>
          <span className="pixel-chip px-4 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground">
            Adventure Mode
          </span>
        </div>

        <p className="mt-5 max-w-2xl text-sm text-muted-foreground">
          Choose a path to dive into your quest: revisit your dungeons, spar on the leaderboard, or craft new challenges.
        </p>

        <nav className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Button
            asChild
            variant="outline"
            className="pixel-button group flex items-center justify-between rounded-xl border-2 border-primary bg-primary/15 px-5 py-4 text-left text-foreground hover:-translate-y-1 hover:bg-primary/25"
          >
            <Link href="/protected/your-classes" className="flex w-full items-center justify-between">
              <span className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="flex flex-col leading-tight">
                  <span className="text-sm uppercase tracking-[0.18em]">Your Dungeons</span>
                  <span className="text-xs text-muted-foreground">Edit & train through your creations</span>
                </span>
              </span>
              <Swords className="h-5 w-5 text-primary/80" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="pixel-button group flex items-center justify-between rounded-xl border-2 border-emerald-300 bg-emerald-400/10 px-5 py-4 text-left text-foreground hover:-translate-y-1 hover:bg-emerald-400/20"
          >
            <Link href="/protected/leaderboards" className="flex w-full items-center justify-between">
              <span className="flex items-center gap-3">
                <Trophy className="h-5 w-5 text-emerald-300" />
                <span className="flex flex-col leading-tight">
                  <span className="text-sm uppercase tracking-[0.18em]">Leaderboards</span>
                  <span className="text-xs text-muted-foreground">See who rules the realm</span>
                </span>
              </span>
              <Sparkles className="h-5 w-5 text-emerald-200" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="pixel-button group flex items-center justify-between rounded-xl border-2 border-sky-300 bg-sky-400/10 px-5 py-4 text-left text-foreground hover:-translate-y-1 hover:bg-sky-400/20"
          >
            <Link href="/protected/browse-classes" className="flex w-full items-center justify-between">
              <span className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-sky-200" />
                <span className="flex flex-col leading-tight">
                  <span className="text-sm uppercase tracking-[0.18em]">Browse Dungeons</span>
                  <span className="text-xs text-muted-foreground">Tackle quests from the guild</span>
                </span>
              </span>
              <Flame className="h-5 w-5 text-sky-100" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="pixel-button group flex items-center justify-between rounded-xl border-2 border-amber-300 bg-amber-300/10 px-5 py-4 text-left text-foreground hover:-translate-y-1 hover:bg-amber-300/20"
          >
            <Link href="/protected/create-classes" className="flex w-full items-center justify-between">
              <span className="flex items-center gap-3">
                <FilePlus className="h-5 w-5 text-amber-200" />
                <span className="flex flex-col leading-tight">
                  <span className="text-sm uppercase tracking-[0.18em]">Forge Dungeon</span>
                  <span className="text-xs text-muted-foreground">Build fresh trials & foes</span>
                </span>
              </span>
              <User className="h-5 w-5 text-amber-100" />
            </Link>
          </Button>
        </nav>
      </section>
    </main>
  );
}
