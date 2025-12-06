'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CreditsPage() {
  const developers = [
    "Nicholas Ricketts",
    "Kevin Toker",
    "Julian Whitman",
    "Cody Cockrell",
    "Adrian Villatoro Uriona"
  ];

  return (
    <main className="min-h-screen flex items-center justify-center">

      {/* Main parchment panel - centered */}
      <div
        className="relative z-10 flex flex-col items-center p-16 max-w-lg w-full mx-14
                   bg-[rgba(40,25,10,0.9)] shadow-2xl border-4 border-[#c8a24a] rounded-xl
                   backdrop-blur-sm"
      >
        {/* Title */}
        <h1 
          className="text-5xl font-bold tracking-wide text-[#f5e6c5] drop-shadow-lg mb-10 text-center"
        >
          Credits
        </h1>

        {/* Developer List */}
        <div className="flex flex-col gap-4 mb-10 text-center w-full">
          {developers.map((name, index) => (
            <div key={index} className="text-2xl text-[#f5e6c5] font-medium tracking-wide">
              {name}
            </div>
          ))}
        </div>

        {/* Back Button */}
        <Button asChild variant="outline" className="flex items-center justify-center gap-4 px-6 py-3 border-2 border-[#c8a24a] rounded-md hover:bg-[#c8a24a]/20 transition-all bg-transparent text-[#f5e6c5]">
          <Link href="/protected/main-menu" className="flex items-center gap-2">
            <ArrowLeft className="w-6 h-6 text-[#c8a24a]" />
            Back to Menu
          </Link>
        </Button>
      </div>
    </main>
  );
}