'use client';

import { Trophy, Medal, Crown, Flame, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function Page() {
  const [activeTab, setActiveTab] = useState('weekly');

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

  const currentData = leaderboardData[activeTab];

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="text-[#c8a24a] font-bold">{rank}</span>;
  };

  const getRankBg = (rank) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-600/30 to-yellow-800/30 border-yellow-500/50';
    if (rank === 2) return 'bg-gradient-to-r from-gray-400/20 to-gray-600/20 border-gray-400/50';
    if (rank === 3) return 'bg-gradient-to-r from-amber-600/20 to-amber-800/20 border-amber-600/50';
    return 'bg-[rgba(60,45,20,0.5)] border-[#c8a24a]/30';
  };

  return (
    <main
      className="relative min-h-screen bg-center bg-cover flex items-center justify-center py-12"
      style={{
        backgroundImage: "url('/images/zelda-village-bg.png')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-slate-900 to-amber-900 opacity-70" />

      <div
        className="relative z-10 flex flex-col items-center p-12 max-w-3xl w-full
                   bg-[rgba(40,25,10,0.95)] shadow-2xl border-4 border-[#c8a24a] rounded-xl
                   backdrop-blur-sm"
      >
        {/* Header */}
        <div className="flex items-center justify-between w-full mb-8">
          <button className="flex items-center gap-2 text-[#c8a24a] hover:text-[#f5e6c5] transition-colors">
            <ArrowLeft className="w-6 h-6" />
            <span className="text-lg" style={{ fontFamily: 'serif' }}>Back</span>
          </button>
          
          <div className="flex items-center gap-3">
            <Trophy className="w-10 h-10 text-[#c8a24a]" />
            <h1
              className="text-5xl font-bold tracking-wide text-[#f5e6c5] drop-shadow-lg"
              style={{ fontFamily: 'serif' }}
            >
              Leaderboards
            </h1>
          </div>
          
          <div className="w-20" />
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
            style={{ fontFamily: 'serif' }}
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
            style={{ fontFamily: 'serif' }}
          >
            All Time
          </button>
        </div>

        {/* Leaderboard List */}
        <div className="w-full space-y-3">
          {currentData.map((player) => (
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
                  <div
                    className="text-xl font-semibold text-[#f5e6c5]"
                    style={{ fontFamily: 'serif' }}
                  >
                    {player.name}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#d9c280]">
                    <Flame className="w-4 h-4 text-orange-400" />
                    {player.streak} day streak
                  </div>
                </div>
              </div>

              {/* XP */}
              <div
                className="text-2xl font-bold text-[#c8a24a]"
                style={{ fontFamily: 'serif' }}
              >
                {player.xp.toLocaleString()} XP
              </div>
            </div>
          ))}
        </div>

        {/* Your Rank */}
        <div className="mt-8 w-full p-4 bg-[rgba(200,162,74,0.2)] border-2 border-[#c8a24a] rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-2xl">👤</div>
              <div>
                <div
                  className="text-lg font-semibold text-[#f5e6c5]"
                  style={{ fontFamily: 'serif' }}
                >
                  Your Rank: #42
                </div>
                <div className="text-sm text-[#d9c280]">Keep learning to climb higher!</div>
              </div>
            </div>
            <div
              className="text-xl font-bold text-[#c8a24a]"
              style={{ fontFamily: 'serif' }}
            >
              890 XP
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}