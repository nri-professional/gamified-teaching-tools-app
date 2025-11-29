/*
  NOTE (generated code trace):
  This file received several assistant-generated enhancements per these user prompts:

  1) Make cards bigger and add quiz flow:
    "within browse classes, make the card bigger and more aesthetically pleasing. as well as being able to click into the class with the questions being shown in a sequential format and being able to fill in a box to answer the question. where if the user gets it wrong they cant move on and if they get it right then they can move on to the next question. at the end the user should be able to leave the class and go back to browse classes page."

  2) Add editing/progress integration (mark questions complete):
    "within the your classes page, you should be able to edit the questions along with browse classes monitoring your progress on the questions with a percentage progress bar of how many classes you've completed."

  3) Add interactive path UI and connectors:
    "now make the answering questions portion of the classes an interactable where users start at an initial square (question) and move to the next square (question) once they've completed the current question. These squares should be placed in a sort of \"path\" mimicking their progress to a final square where if completed they finish the class and can return back to the browse classes page."

  4) Replace straight connectors with curved SVG to mimic a roadmap:
    "include a path in between the squares, mimicking a sort of roadmap to the end of the class"

  The file now includes larger cards, a sequential quiz that marks progress, a progress bar on cards, and an interactive path UI with SVG connectors.
*/

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trees, MapPinned } from "lucide-react";
import { useClasses } from "../ClassesContext";

export default function Page() {
  const { classes, markQuestionComplete, getProgress } = useClasses();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = classes.find((c) => c.id === selectedId) ?? null;

  // Quiz state
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const openClass = (id: string) => {
    setSelectedId(id);
    setIndex(0);
    setAnswer("");
    setFeedback(null);
  };

  const leaveClass = () => {
    setSelectedId(null);
    setIndex(0);
    setAnswer("");
    setFeedback(null);
  };

  const submitAnswer = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!selected) return;
    const correct = selected.qaList[index]?.answer?.trim().toLowerCase() ?? "";
    if (answer.trim().toLowerCase() === correct) {
      setFeedback("Correct!");
      // mark as completed in progress tracker
      markQuestionComplete(selected.id, index);
      // move to next after brief delay to show feedback
      setTimeout(() => {
        setAnswer("");
        setFeedback(null);
        if (index + 1 < selected.qaList.length) {
          setIndex((i) => i + 1);
        } else {
          // finished
          setFeedback("Completed the class!");
        }
      }, 600);
    } else {
      setFeedback("Incorrect - try again.");
    }
  };

  const overallProgress = (clsId: string) => {
    const arr = getProgress(clsId) || [];
    const total = classes.find((c) => c.id === clsId)?.qaList.length ?? 0;
    if (total === 0) return 0;
    const done = arr.filter(Boolean).length;
    return Math.round((done / total) * 100);
  };

  return (
    <div className="relative w-full flex justify-center animate-page">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(116,191,99,0.15),transparent_60%)] blur-3xl" />
        <div className="absolute right-10 top-32 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(215,180,106,0.18),transparent_55%)] blur-3xl" />
        <div className="absolute left-1/2 bottom-0 h-56 w-56 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(67,122,94,0.22),transparent_55%)] blur-3xl" />
      </div>

      <div className="relative w-full max-w-6xl pixel-panel rounded-3xl p-6 md:p-8 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.02),transparent)] pointer-events-none" />
        {!selected ? (
          <div className="space-y-4 relative">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Guild Grove
                </p>
                <h2 className="text-3xl text-primary">Browse Classes</h2>
                <p className="text-sm text-muted-foreground">
                  Pick a quest and follow the path of squares. Finish the line to clear the dungeon.
                </p>
              </div>
              <div className="pixel-chip flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.18em] text-foreground">
                <Trees className="h-4 w-4" />
                <span>{classes.length} posted</span>
              </div>
            </div>

            {classes.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No classes yet. Forge one to begin your journey.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {classes.map((cls) => (
                  <Card
                    key={cls.id}
                    className="cursor-pointer overflow-hidden rounded-2xl border-2 border-primary/50 bg-gradient-to-br from-[#0f1b2f] via-[#0f1628] to-[#0c1220] shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
                    onClick={() => openClass(cls.id)}
                  >
                    <div className="p-6 text-foreground">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="mb-2 text-xl font-semibold text-primary">
                            {cls.title}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {cls.qaList.length} questions
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                            Creator
                          </div>
                          <div className="text-sm text-foreground">
                            {cls.owner === "me" ? "You" : "Teacher"}
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">
                        {cls.qaList
                          .slice(0, 3)
                          .map((q, i) => `Q${i + 1}: ${q.question}`)
                          .join(" | ")}
                      </p>
                      <div className="mt-4">
                        <div className="h-2 w-full overflow-hidden rounded-full bg-black/40">
                          <div
                            className="h-2 rounded-full bg-primary transition-all"
                            style={{ width: `${overallProgress(cls.id)}%` }}
                          />
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          Progress: {overallProgress(cls.id)}%
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Card className="pixel-panel rounded-3xl p-6 md:p-7">
            <CardHeader className="flex flex-col gap-4 p-0">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-2xl text-primary">
                    {selected.title}
                  </CardTitle>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Question {Math.min(index + 1, selected.qaList.length)} of{" "}
                    {selected.qaList.length}
                  </p>
                </div>
                <Button variant="secondary" onClick={leaveClass} className="pixel-button">
                  Leave
                </Button>
              </div>

              {/* Progress path: squares that represent each question in a path */}
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                {(() => {
                  const prog = getProgress(selected.id) || [];
                  const allDone =
                    selected.qaList.length > 0 &&
                    prog.filter(Boolean).length === selected.qaList.length;
                  return selected.qaList
                    .map((q, i) => {
                      const done = Boolean(prog[i]);
                      const isCurrent = i === index;
                      const isLocked = !done && i !== index;
                      return (
                        <div key={i} className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              if (done || isCurrent) setIndex(i);
                            }}
                            className={`h-12 w-12 rounded-md border-2 text-sm font-semibold transition-colors ${
                              done
                                ? "bg-emerald-400 border-emerald-300 text-emerald-950"
                                : isCurrent
                                  ? "bg-primary border-amber-200 text-primary-foreground"
                                  : "bg-black/30 border-black/60 text-muted-foreground"
                            } ${isLocked ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
                          >
                            {i + 1}
                          </button>
                          {i < selected.qaList.length - 1 && (
                            <div className="flex items-center">
                              <svg
                                className="h-6 w-10"
                                viewBox="0 0 40 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0 8 C10 0, 30 16, 40 8"
                                  stroke={done ? "#1dd0b1" : "rgba(255,255,255,0.16)"}
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      );
                    })
                    .concat(
                      <div key="final" className="flex items-center gap-2">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-md border-2 text-xs font-semibold ${
                            allDone
                              ? "bg-emerald-400 border-emerald-300 text-emerald-950"
                              : "bg-black/30 border-black/60 text-muted-foreground"
                          }`}
                        >
                          END
                        </div>
                      </div>
                    );
                })()}
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              {selected.qaList.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  This class has no questions.
                </p>
              ) : (
                <form onSubmit={submitAnswer} className="space-y-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">
                      {selected.qaList[index].question}
                    </Label>
                  </div>
                  <div>
                    <Input
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Type your answer here"
                      className="border-primary/40 bg-black/40"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button type="submit" className="pixel-button">
                      Submit
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setAnswer(selected.qaList[index].answer);
                        setFeedback("Revealed answer");
                      }}
                      className="pixel-button border border-transparent hover:border-muted"
                    >
                      Reveal
                    </Button>
                    <div className="text-sm text-primary">{feedback}</div>
                  </div>

                  {feedback === "Completed the class!" && (
                    <div className="mt-4">
                      <Button onClick={leaveClass} className="pixel-button">
                        Return to Browse
                      </Button>
                    </div>
                  )}
                </form>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
