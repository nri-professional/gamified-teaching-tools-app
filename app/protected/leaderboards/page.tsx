'use client';
/*
  NOTE (generated code trace):
  The Leaderboards page was modified by assistant edits in response to these user prompts:

  1) "for the leaderboards page remove the gradient background, match the font seen on the main page and make it aesthetically pleasing please. (See <attachments> above for file contents. You may not need to search or read the file again.)"

  2) "make the back button functional which should return you to the main menu, also the font did not change for some reason"

  3) "Space the back button properly, i don't think the window is large enough at the moment"

  Changes include: removed background image/overlay, softened rank row styles, wired Back button to use Next.js navigation, and made header responsive.
*/

'use client';

import { Trophy, Medal, Crown, Flame, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'weekly' | 'allTime'>('weekly');

  const leaderboardData = {
    weekly: [
      { rank: 1, name: 'Link the Hero', xp: 2850, streak: 12, avatar: '🗡️' },
      { rank: 2, name: 'Zelda the Wise', xp: 2640, streak: 15, avatar: '👑' },
      { rank: 3, name: 'Ganon Slayer', xp: 2380, streak: 8, avatar: '🛡️' },
      { rank: 4, name: 'Epona Rider', xp: 2100, streak: 10, avatar: '🐴' },
      { rank: 5, name: 'Navi Guide', xp: 1950, streak: 7, avatar: '✨' },
      { rank: 6, name: 'Midna Shadow', xp: 1820, streak: 9, avatar: '🌙' },
      { rank: 7, name: 'Daruk Boulder', xp: 1680, streak: 6, avatar: '💪' },
      { rank: 8, name: 'Revali Arrow', xp: 1540, streak: 11, avatar: '🏹' },
    ],
    allTime: [
      { rank: 1, name: 'Zelda the Wise', xp: 28500, streak: 89, avatar: '👑' },
      { rank: 2, name: 'Link the Hero', xp: 26400, streak: 76, avatar: '🗡️' },
      { rank: 3, name: 'Revali Arrow', xp: 24800, streak: 68, avatar: '🏹' },
      { rank: 4, name: 'Ganon Slayer', xp: 22100, streak: 54, avatar: '🛡️' },
      { rank: 5, name: 'Midna Shadow', xp: 20950, streak: 62, avatar: '🌙' },
      { rank: 6, name: 'Epona Rider', xp: 19200, streak: 45, avatar: '🐴' },
      { rank: 7, name: 'Daruk Boulder', xp: 17800, streak: 51, avatar: '💪' },
      { rank: 8, name: 'Navi Guide', xp: 16400, streak: 38, avatar: '✨' },
    ],
  };

  const currentData = leaderboardData[activeTab as 'weekly' | 'allTime'];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="text-[#c8a24a] font-bold">{rank}</span>;
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return 'bg-[rgba(200,162,74,0.06)] border-yellow-500/30';
    if (rank === 2) return 'bg-[rgba(200,200,200,0.02)] border-gray-300/25';
    if (rank === 3) return 'bg-[rgba(255,165,0,0.03)] border-amber-600/25';
    return 'bg-[rgba(60,45,20,0.25)] border-[#c8a24a]/20';
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-12">

      <div
        className="relative z-10 flex flex-col items-center p-10 max-w-4xl w-full
                   bg-[rgba(30,28,24,0.95)] shadow-2xl border-2 border-[#c8a24a]/30 rounded-2xl"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-8 gap-4">
          <button onClick={() => router.push('/protected/main-menu')} className="self-start md:self-auto flex items-center gap-2 text-[#c8a24a] hover:text-[#f5e6c5] transition-colors">
            <ArrowLeft className="w-6 h-6" />
            <span className="text-lg text-[#f5e6c5]">Back</span>
          </button>

          <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
            <Trophy className="w-10 h-10 text-[#c8a24a]" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-[#f5e6c5] drop-shadow-lg text-center md:text-left">
              Leaderboards
            </h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-8 py-3 text-xl font-semibold rounded-lg transition-all border-2 ${
              activeTab === 'weekly'
                ? 'bg-[#c8a24a] text-[#281909] border-[#c8a24a]'
                : 'bg-transparent text-[#c8a24a] border-[#c8a24a] hover:bg-[#c8a24a]/20'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setActiveTab('allTime')}
            className={`px-8 py-3 text-xl font-semibold rounded-lg transition-all border-2 ${
              activeTab === 'allTime'
                ? 'bg-[#c8a24a] text-[#281909] border-[#c8a24a]'
                : 'bg-transparent text-[#c8a24a] border-[#c8a24a] hover:bg-[#c8a24a]/20'
            }`}
          >
            All Time
          </button>
        </div>

        {/* Leaderboard List */}
        <div className="w-full space-y-3">
          {currentData.map((player: any) => (
            <div
              key={player.rank}
              className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all hover:scale-[1.02] ${getRankBg(
                player.rank
              )}`}
            >
              {/* Rank & Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-8 flex justify-center">
                  {getRankIcon(player.rank)}
                </div>
                <div className="text-4xl">{player.avatar}</div>
                <div>
                  <div className="text-xl font-semibold text-[#f5e6c5]">
                    {player.name}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#d9c280]">
                    <Flame className="w-4 h-4 text-orange-400" />
                    {player.streak} day streak
                  </div>
                </div>
              </div>

              {/* XP */}
              <div className="text-2xl font-bold text-[#c8a24a]">{player.xp.toLocaleString()} XP</div>
            </div>
          ))}
        </div>

        {/* Your Rank */}
        <div className="mt-8 w-full p-4 bg-[rgba(200,162,74,0.2)] border-2 border-[#c8a24a] rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-2xl">👤</div>
              <div>
                <div className="text-lg font-semibold text-[#f5e6c5]">Your Rank: #42</div>
                <div className="text-sm text-[#d9c280]">Keep learning to climb higher!</div>
              </div>
            </div>
            <div className="text-xl font-bold text-[#c8a24a]">890 XP</div>
          </div>
        </div>
      </div>
    </main>
  );
}