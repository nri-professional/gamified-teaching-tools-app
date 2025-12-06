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

  5) Support question types (text / true-false / multiple choice) and use that
     to render the appropriate answer UI instead of always using fill-in-the-blank.
*/

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClasses } from "../ClassesContext";

type QuestionType = "text" | "true_false" | "multiple_choice";

type ExtendedQAItem = {
  question: string;
  answer: string;
  type?: QuestionType;
  difficulty?: "easy" | "medium" | "hard";
  options?: string[];
  correctOptionIndex?: number | null;
};

const getQuestionType = (q: ExtendedQAItem | undefined): QuestionType => {
  if (!q?.type) return "text";
  if (q.type === "true_false" || q.type === "multiple_choice") return q.type;
  return "text";
};

const getCorrectAnswer = (q: ExtendedQAItem | undefined): string => {
  if (
    q &&
    Array.isArray(q.options) &&
    typeof q.correctOptionIndex === "number" &&
    q.options[q.correctOptionIndex]
  ) {
    return String(q.options[q.correctOptionIndex]);
  }
  return (q?.answer ?? "").toString();
};

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

    const currentQuestion = selected.qaList[index] as ExtendedQAItem | undefined;
    const correct = getCorrectAnswer(currentQuestion).trim().toLowerCase();
    const user = answer.trim().toLowerCase();

    if (user === correct) {
      setFeedback("Correct!");
      markQuestionComplete(selected.id, index);
      setTimeout(() => {
        setAnswer("");
        setFeedback(null);
        if (index + 1 < selected.qaList.length) {
          setIndex((i) => i + 1);
        } else {
          setFeedback("Completed the class!");
        }
      }, 600);
    } else {
      setFeedback("Incorrect — try again.");
    }
  };

  const handleReveal = () => {
    if (!selected) return;
    const currentQuestion = selected.qaList[index] as ExtendedQAItem | undefined;
    const correct = getCorrectAnswer(currentQuestion);
    setAnswer(correct);
    setFeedback("Revealed answer");
  };

  const overallProgress = (clsId: string) => {
    const arr = getProgress(clsId) || [];
    const total = classes.find((c) => c.id === clsId)?.qaList.length ?? 0;
    if (total === 0) return 0;
    const done = arr.filter(Boolean).length;
    return Math.round((done / total) * 100);
  };

  const currentQuestion = selected
    ? (selected.qaList[index] as ExtendedQAItem | undefined)
    : undefined;
  const currentType: QuestionType = currentQuestion
    ? getQuestionType(currentQuestion)
    : "text";

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl p-6 border-2 border-white rounded-2xl">
        {!selected ? (
          <div>
            <h2 className="text-3xl font-semibold text-slate-50 mb-6">
              Browse Classes
            </h2>
            {classes.length === 0 ? (
              <p className="text-sm text-slate-200">
                No classes yet. Create one!
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {classes.map((cls) => (
                  <Card
                    key={cls.id}
                    className="cursor-pointer transform hover:scale-[1.02] transition-shadow shadow-md hover:shadow-xl p-0 overflow-hidden"
                    onClick={() => openClass(cls.id)}
                  >
                    <div className="p-6 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-slate-50">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-xl font-bold mb-2">
                            {cls.title}
                          </div>
                          <div className="text-sm text-slate-300">
                            {cls.qaList.length} questions
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-slate-400">Creator</div>
                          <div className="text-sm text-slate-200">
                            {cls.owner === "me" ? "You" : "Teacher"}
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-slate-300 line-clamp-3">
                        {cls.qaList
                          .slice(0, 3)
                          .map((q, i) => `Q${i + 1}: ${q.question}`)
                          .join(" — ")}
                      </p>
                      <div className="mt-4">
                        <div className="h-2 bg-black/20 rounded-full w-full">
                          <div
                            className="h-2 bg-emerald-400 rounded-full"
                            style={{ width: `${overallProgress(cls.id)}%` }}
                          />
                        </div>
                        <div className="text-xs text-slate-300 mt-1">
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
          <Card className="p-6 border-2 border-white">
            <CardHeader className="flex items-center justify-between p-0">
              <div className="w-full">
                <CardTitle className="text-2xl">
                  {selected.title}
                </CardTitle>
                <p className="text-sm text-slate-300">
                  Question {Math.min(index + 1, selected.qaList.length)} of{" "}
                  {selected.qaList.length}
                </p>

                {/* Progress path: squares that represent each question in a path */}
                <div className="mt-4 flex flex-wrap gap-2 items-center justify-center">
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
                              className={`h-12 w-12 flex items-center justify-center rounded-md border-2 ${
                                done
                                  ? "bg-emerald-500 border-emerald-400 text-black"
                                  : isCurrent
                                  ? "bg-amber-400 border-amber-300 text-black"
                                  : "bg-black/20 border-black/40 text-slate-300"
                              } ${
                                isLocked
                                  ? "opacity-60 cursor-not-allowed"
                                  : "cursor-pointer"
                              }`}
                            >
                              {i + 1}
                            </button>
                            {i < selected.qaList.length - 1 && (
                              <div className="flex items-center">
                                <svg
                                  className="w-10 h-6"
                                  viewBox="0 0 40 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M0 8 C10 0, 30 16, 40 8"
                                    stroke={
                                      done
                                        ? "#34d399"
                                        : "rgba(255,255,255,0.12)"
                                    }
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
                            className={`h-12 w-12 flex items-center justify-center rounded-md border-2 ${
                              allDone
                                ? "bg-emerald-500 border-emerald-400 text-black"
                                : "bg-black/20 border-black/40 text-slate-300"
                            }`}
                          >
                            🏁
                          </div>
                        </div>
                      );
                  })()}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={leaveClass}>
                  Leave
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              {selected.qaList.length === 0 || !currentQuestion ? (
                <p className="text-sm text-slate-200">
                  This class has no questions.
                </p>
              ) : (
                <form onSubmit={submitAnswer} className="space-y-4">
                  <div>
                    <Label className="text-sm text-slate-300">
                      {currentQuestion.question}
                    </Label>
                  </div>

                  {/* Answer UI depends on question type */}
                  {currentType === "text" && (
                    <div>
                      <Input
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Type your answer here"
                      />
                    </div>
                  )}

                  {currentType === "true_false" && (
                    <div className="flex gap-3 mt-2">
                      {["True", "False"].map((opt) => (
                        <Button
                          key={opt}
                          type="button"
                          onClick={() => setAnswer(opt)}
                          variant={answer === opt ? "default" : "outline"}
                          className="flex-1"
                        >
                          {opt}
                        </Button>
                      ))}
                    </div>
                  )}

                  {currentType === "multiple_choice" && (
                    <div className="grid gap-2 mt-2">
                      {(currentQuestion.options ?? []).map(
                        (opt, idx) => (
                          <Button
                            key={idx}
                            type="button"
                            onClick={() => setAnswer(opt)}
                            variant={answer === opt ? "default" : "outline"}
                            className="w-full justify-start text-left"
                          >
                            {String.fromCharCode(65 + idx)}.{" "}
                            {opt || `Option ${idx + 1}`}
                          </Button>
                        )
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Button type="submit">Submit</Button>
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={handleReveal}
                    >
                      Reveal
                    </Button>
                    <div className="text-sm text-slate-300">{feedback}</div>
                  </div>

                  {feedback === "Completed the class!" && (
                    <div className="mt-4">
                      <Button onClick={leaveClass}>Return to Browse</Button>
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