'use client';

import Link from 'next/link';
import { Flame, BookOpen, Trophy, User, FilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <main
      className="relative min-h-screen bg-center bg-cover flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/zelda-village-bg.png')",
      }}
    >
      {/* Fallback color/gradient in case the image doesn't load */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-slate-750 to-amber-200 opacity-70" />

      {/* Main parchment panel - centered */}
      <div
        className="relative z-10 flex flex-col items-center p-16 max-w-lg w-full mx-4
                   bg-[rgba(40,25,10,0.9)] shadow-2xl border-4 border-[#c8a24a] rounded-xl
                   backdrop-blur-sm"
      >
        {/* Title */}
        <h1 
          className="text-6xl font-bold tracking-wide text-[#f5e6c5] drop-shadow-lg mb-8 text-center"
        >
          LearnQuest
        </h1>

        {/* Streak */}
        <div
          className="flex items-center gap-3 text-3xl font-semibold text-[#d9c280] mb-10"
        >
          <Flame className="w-8 h-8 text-orange-300 drop-shadow-md" />
          5 Day Streak!
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-6 text-2xl text-[#f5e6c5] w-full">
          <Button asChild variant="outline" className="flex items-center justify-center gap-4 px-4 py-3 border-2 border-[#c8a24a] rounded-md hover:bg-[#c8a24a]/20 transition-all bg-transparent text-[#f5e6c5]">
            <Link href="/protected/your-courses" className="flex items-center gap-4">
              <BookOpen className="w-7 h-7 text-[#c8a24a]" />
              Your Courses
            </Link>
          </Button>

          <Button asChild variant="outline" className="flex items-center justify-center gap-4 px-4 py-3 border-2 border-[#c8a24a] rounded-md hover:bg-[#c8a24a]/20 transition-all bg-transparent text-[#f5e6c5]">
            <Link href="/protected/leaderboards" className="flex items-center gap-4">
              <Trophy className="w-7 h-7 text-[#c8a24a]" />
              Leaderboards
            </Link>
          </Button>

          <Button asChild variant="outline" className="flex items-center justify-center gap-4 px-4 py-3 border-2 border-[#c8a24a] rounded-md hover:bg-[#c8a24a]/20 transition-all bg-transparent text-[#f5e6c5]">
            <Link href="/protected/profile" className="flex items-center gap-4">
              <User className="w-7 h-7 text-[#c8a24a]" />
              Profile
            </Link>
          </Button>

          <Button asChild variant="outline" className="flex items-center justify-center gap-4 px-4 py-3 border-2 border-[#c8a24a] rounded-md hover:bg-[#c8a24a]/20 transition-all bg-transparent text-[#f5e6c5]">
            <Link href="/protected/browse-courses" className="flex items-center gap-4">
              <BookOpen className="w-7 h-7 text-[#c8a24a]" />
              Browse Courses
            </Link>
          </Button>

          <Button asChild variant="outline" className="flex items-center justify-center gap-4 px-4 py-3 border-2 border-[#c8a24a] rounded-md hover:bg-[#c8a24a]/20 transition-all bg-transparent text-[#f5e6c5]">
            <Link href="/protected/create-lessons" className="flex items-center gap-4">
              <FilePlus className="w-7 h-7 text-[#c8a24a]" />
              Create Lessons
            </Link>
          </Button>
        </nav>
      </div>
    </main>
  );
}