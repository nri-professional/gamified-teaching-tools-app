"use client";

import BackgroundWrapper from "@/components/BackgroundWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ClassItem = {
  id: number;
  title: string;
  color: string;
};

const demoClasses: ClassItem[] = [
  { id: 1, title: "Basics of Algebra", color: "bg-emerald-300 border-emerald-300" },
  { id: 2, title: "Intro to Python", color: "bg-cyan-300 border-cyan-300" },
  { id: 3, title: "High School Biology", color: "bg-rose-300 border-rose-300" },
  { id: 4, title: "Differential Equations", color: "bg-sky-300 border-sky-300" },
];

export default function Page3() {
  return (
    <BackgroundWrapper>
      {/* <-- SAME EXACT OUTER BOX AS CREATE LESSON --> */}
      <Card className="w-full max-w-[85vw] border-2 border-black bg-transparent text-slate-50 rounded-3xl backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-3xl tracking-[0.25em]">
            LearnQuest
          </CardTitle>
          <p className="text-sm text-slate-100">Your Classes</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {demoClasses.map((cls) => {
            const [dot, underline] = cls.color.split(" ");
            return (
              <div
                key={cls.id}
                className="flex items-center gap-3 rounded-xl border border-black/40 bg-black/20 px-4 py-3 backdrop-blur-sm"
              >
                <span className={`h-3 w-3 rounded-full ${dot}`} />
                <span
                  className={`flex-1 border-b pb-[2px] text-sm ${underline}`}
                >
                  {cls.title}
                </span>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </BackgroundWrapper>
  );
}