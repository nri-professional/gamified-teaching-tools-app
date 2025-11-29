'use client';

import { Trophy, Medal, Crown, Flame, ArrowLeft, Trees } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Player = {
  rank: number;
  name: string;
  xp: number;
  streak: number;
  avatar: string;
};

export default function Page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'weekly' | 'allTime'>('weekly');

  const leaderboardData: Record<'weekly' | 'allTime', Player[]> = {
    weekly: [
      { rank: 1, name: 'Evergreen Scout', xp: 2850, streak: 12, avatar: '🌲' },
      { rank: 2, name: 'Trailblazer', xp: 2640, streak: 15, avatar: '🧭' },
      { rank: 3, name: 'Grove Guardian', xp: 2380, streak: 8, avatar: '🌿' },
      { rank: 4, name: 'Ridge Runner', xp: 2100, streak: 10, avatar: '🏔️' },
      { rank: 5, name: 'Wild Whisper', xp: 1950, streak: 7, avatar: '🦊' },
      { rank: 6, name: 'Sunbeam Sage', xp: 1820, streak: 9, avatar: '🌞' },
      { rank: 7, name: 'Brook Warden', xp: 1680, streak: 6, avatar: '🏞️' },
      { rank: 8, name: 'Timber Tracker', xp: 1540, streak: 11, avatar: '🪵' },
    ],
    allTime: [
      { rank: 1, name: 'Trailblazer', xp: 28500, streak: 89, avatar: '🧭' },
      { rank: 2, name: 'Evergreen Scout', xp: 26400, streak: 76, avatar: '🌲' },
      { rank: 3, name: 'Ridge Runner', xp: 24800, streak: 68, avatar: '🏔️' },
      { rank: 4, name: 'Grove Guardian', xp: 22100, streak: 54, avatar: '🌿' },
      { rank: 5, name: 'Sunbeam Sage', xp: 20950, streak: 62, avatar: '🌞' },
      { rank: 6, name: 'Brook Warden', xp: 19200, streak: 45, avatar: '🏞️' },
      { rank: 7, name: 'Wild Whisper', xp: 17800, streak: 51, avatar: '🦊' },
      { rank: 8, name: 'Timber Tracker', xp: 16400, streak: 38, avatar: '🪵' },
    ],
  };

  const currentData = leaderboardData[activeTab];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-6 w-6 text-primary" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-foreground/70" />;
    if (rank === 3) return <Medal className="h-6 w-6 text-amber-400" />;
    return <span className="font-bold text-primary">{rank}</span>;
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return 'bg-primary/15 border-primary/40';
    if (rank === 2) return 'bg-white/5 border-white/20';
    if (rank === 3) return 'bg-amber-300/10 border-amber-200/30';
    return 'bg-black/20 border-border/50';
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(116,191,99,0.16),transparent_60%)] blur-3xl" />
        <div className="absolute right-16 top-24 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(215,180,106,0.18),transparent_55%)] blur-3xl" />
        <div className="absolute left-1/2 bottom-8 h-56 w-56 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(67,122,94,0.22),transparent_55%)] blur-3xl" />
      </div>

      <div className="relative w-full max-w-5xl">
        <div className="absolute inset-x-10 top-6 h-20 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_60%)] blur-xl" />
        <div className="pixel-panel relative rounded-3xl p-8 md:p-10 overflow-hidden">
          <div className="absolute -left-6 top-10 h-12 w-12 rounded-full bg-[radial-gradient(circle,rgba(116,191,99,0.45),transparent_65%)] blur-md" />
          <div className="absolute right-6 bottom-8 h-14 w-14 rounded-full bg-[radial-gradient(circle,rgba(215,180,106,0.45),transparent_65%)] blur-md" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.02),transparent)] pointer-events-none" />

          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <button
              onClick={() => router.push('/protected/main-menu')}
              className="flex items-center gap-2 text-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-6 w-6" />
              <span className="text-lg">Back to camp</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="pixel-chip flex h-11 w-11 items-center justify-center rounded-md">
                <Trees className="h-6 w-6 text-primary" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Forest League</p>
                <h1 className="text-3xl md:text-4xl text-primary">Leaderboards</h1>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8 grid grid-cols-2 gap-3 md:w-fit">
            <button
              onClick={() => setActiveTab('weekly')}
              className={`pixel-button rounded-xl border-2 px-6 py-3 text-sm uppercase tracking-[0.18em] transition-all ${
                activeTab === 'weekly'
                  ? 'border-primary bg-primary/20 text-primary-foreground'
                  : 'border-border/70 bg-black/30 text-foreground hover:bg-black/40'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setActiveTab('allTime')}
              className={`pixel-button rounded-xl border-2 px-6 py-3 text-sm uppercase tracking-[0.18em] transition-all ${
                activeTab === 'allTime'
                  ? 'border-primary bg-primary/20 text-primary-foreground'
                  : 'border-border/70 bg-black/30 text-foreground hover:bg-black/40'
              }`}
            >
              All Time
            </button>
          </div>

          {/* Leaderboard List */}
          <div className="w-full space-y-3">
            {currentData.map((player) => (
              <div
                key={player.rank}
                className={`flex items-center justify-between rounded-xl border px-4 py-4 transition-all hover:-translate-y-[2px] hover:border-primary/50 hover:bg-primary/10 ${getRankBg(
                  player.rank,
                )}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex w-8 justify-center">{getRankIcon(player.rank)}</div>
                  <div className="text-3xl">{player.avatar}</div>
                  <div>
                    <div className="text-lg font-semibold text-foreground">{player.name}</div>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      <Flame className="h-4 w-4 text-primary" />
                      {player.streak} day streak
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm uppercase tracking-[0.16em] text-muted-foreground">XP</div>
                  <div className="text-xl font-bold text-primary">{player.xp.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Your Rank */}
          <div className="mt-8 grid gap-3 rounded-2xl border border-primary/40 bg-primary/10 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🧝</div>
                <div>
                  <div className="text-lg font-semibold text-foreground">Your Rank: #42</div>
                  <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Keep learning to climb higher!
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm uppercase tracking-[0.16em] text-muted-foreground">XP</div>
                <div className="text-xl font-bold text-primary">890</div>
              </div>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-black/30">
              <div className="h-2 w-[42%] rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
