'use client';

import Link from 'next/link';
import { Flame, BookOpen, Trophy, User, FilePlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <section className="w-full">
      {/* Background banner with overlay */}
      <div
        className="relative w-full rounded-2xl overflow-hidden bg-center bg-cover"
        style={{
          // Put your image in /public/images/zelda-village-bg.jpg (or .png)
          backgroundImage: "url('/images/zelda-village-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-slate-900/80 to-amber-900/80" />

        {/* Centered content */}
        <div className="relative flex items-center justify-center min-h-[460px] sm:min-h-[520px] p-6 sm:p-10">
          <Card className="w-full max-w-xl border-4 border-[#c8a24a] bg-[rgba(40,25,10,0.9)] text-[#f5e6c5] shadow-2xl backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-4xl sm:text-5xl font-bold tracking-wide drop-shadow-lg">
                LearnQuest
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Streak */}
              <div className="flex items-center gap-3 text-2xl sm:text-3xl font-semibold text-[#d9c280]">
                <Flame className="w-7 h-7 sm:w-8 sm:h-8 text-orange-300 drop-shadow-md" />
                5 Day Streak!
              </div>

              {/* Menu */}
              <nav className="flex flex-col gap-4 text-lg sm:text-xl">
                <Button asChild variant="outline" className="justify-start w-full border-2 border-[#c8a24a] text-[#f5e6c5] hover:bg-[#c8a24a]/20">
                  <Link href="/protected/your-courses">
                    <BookOpen className="w-6 h-6 text-[#c8a24a]" />
                    Your Courses
                  </Link>
                </Button>

                <Button asChild variant="outline" className="justify-start w-full border-2 border-[#c8a24a] text-[#f5e6c5] hover:bg-[#c8a24a]/20">
                  <Link href="/protected/leaderboards">
                    <Trophy className="w-6 h-6 text-[#c8a24a]" />
                    Leaderboards
                  </Link>
                </Button>

                <Button asChild variant="outline" className="justify-start w-full border-2 border-[#c8a24a] text-[#f5e6c5] hover:bg-[#c8a24a]/20">
                  <Link href="/protected/profile">
                    <User className="w-6 h-6 text-[#c8a24a]" />
                    Profile
                  </Link>
                </Button>

                <Button asChild variant="outline" className="justify-start w-full border-2 border-[#c8a24a] text-[#f5e6c5] hover:bg-[#c8a24a]/20">
                  <Link href="/protected/browse-courses">
                    <BookOpen className="w-6 h-6 text-[#c8a24a]" />
                    Browse Courses
                  </Link>
                </Button>

                <Button asChild variant="outline" className="justify-start w-full border-2 border-[#c8a24a] text-[#f5e6c5] hover:bg-[#c8a24a]/20">
                  <Link href="/protected/create-lessons">
                    <FilePlus className="w-6 h-6 text-[#c8a24a]" />
                    Create Lessons
                  </Link>
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
