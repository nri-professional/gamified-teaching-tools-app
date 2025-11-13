'use client';

import { Flame, BookOpen, Trophy, User, FilePlus } from 'lucide-react';

export default function Page() {
  return (
    <main
      className="relative min-h-screen bg-center bg-cover"
      style={{
        // <- put your image in /public/images/zelda-village-bg.png
        backgroundImage: "url('https://www.google.com/imgres?q=background%20images%20for%20games%20blurd&imgurl=https%3A%2F%2Fc4.wallpaperflare.com%2Fwallpaper%2F951%2F583%2F798%2Ffantasy-art-warrior-dark-souls-iii-dark-souls-wallpaper-preview.jpg')",
      }}
    >
      {/* Fallback color/gradient in case the image doesn't load */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-slate-900 to-amber-900 opacity-70" />

      {/* Main parchment panel */}
      <div
        className="relative z-10 flex flex-col items-start p-16 mt-10 ml-10 max-w-lg
                   bg-[rgba(40,25,10,0.9)] shadow-2xl border-4 border-[#c8a24a] rounded-xl
                   backdrop-blur-sm"
      >
        {/* Title */}
        <h1
          className="text-6xl font-bold tracking-wide text-[#f5e6c5] drop-shadow-lg mb-8"
          style={{ fontFamily: 'serif' }}
        >
          LearnQuest
        </h1>

        {/* Streak */}
        <div
          className="flex items-center gap-3 text-3xl font-semibold text-[#d9c280] mb-10"
          style={{ fontFamily: 'serif' }}
        >
          <Flame className="w-8 h-8 text-orange-300 drop-shadow-md" />
          5 Day Streak!
        </div>

        {/* Menu */}
        <nav
          className="flex flex-col gap-6 text-2xl text-[#f5e6c5]"
          style={{ fontFamily: 'serif' }}
        >
          <button className="flex items-center gap-4 px-4 py-3 border-2 border-[#c8a24a] rounded-md hover:bg-[#c8a24a]/20 transition-all">
            <BookOpen className="w-7 h-7 text-[#c8a24a]" />
            Your Courses
          </button>

          <button className="flex items-center gap-4 px-4 py-3 border-2 border-[#c8a24a] rounded-md hover:bg-[#c8a24a]/20 transition-all">
            <Trophy className="w-7 h-7 text-[#c8a24a]" />
            Leaderboards
          </button>

          <button className="flex items-center gap-4 px-4 py-3 border-2 border-[#c8a24a] rounded-md hover:bg-[#c8a24a]/20 transition-all">
            <User className="w-7 h-7 text-[#c8a24a]" />
            Profile
          </button>

          <button className="flex items-center gap-4 px-4 py-3 border-2 border-[#c8a24a] rounded-md hover:bg-[#c8a24a]/20 transition-all">
            <BookOpen className="w-7 h-7 text-[#c8a24a]" />
            Browse Courses
          </button>

          <button className="flex items-center gap-4 px-4 py-3 border-2 border-[#c8a24a] rounded-md hover:bg-[#c8a24a]/20 transition-all">
            <FilePlus className="w-7 h-7 text-[#c8a24a]" />
            Create Lessons
          </button>
        </nav>
      </div>
    </main>
  );
}
