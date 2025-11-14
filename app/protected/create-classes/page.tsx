"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BackgroundWrapper from "@/components/BackgroundWrapper";

type QAItem = {
  question: string;
  answer: string;
};

export default function Page2() {
  const [qaList, setQaList] = useState<QAItem[]>([
    { question: "", answer: "" },
  ]);

  const addQuestion = () => {
    setQaList((prev) => [...prev, { question: "", answer: "" }]);
  };

  const updateQA = (index: number, field: keyof QAItem, value: string) => {
    setQaList((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit lesson:", qaList);
  };

  return (
    <BackgroundWrapper>
        <Card className="w-full max-w-[85vw] border-2 border-black bg-transparent text-slate-50 rounded-3xl">

        <CardContent className="p-6">
          {/* TOP BAR: title only, full width */}
          <div className="mb-6 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
            <h1 className="text-3xl font-semibold tracking-[0.25em]">
              LearnQuest
            </h1>
            <p className="text-sm text-slate-100 md:text-right">
              Create Lesson
            </p>
          </div>

          {/* MAIN CONTENT: left + right columns */}
          <form
            className="flex flex-col gap-8 md:flex-row"
            onSubmit={handleSubmit}
            >
            {/* LEFT: dungeon title + submit */}
            <div className="flex flex-col gap-6 md:w-1/3">
              <div className="space-y-2">
                <Label htmlFor="dungeonTitle">Title Dungeon:</Label>
                <Input
                  id="dungeonTitle"
                  name="dungeonTitle"
                  placeholder="Title Dungeon"
                  className="rounded-full border border-black/70 bg-black/20 backdrop-blur-sm"
                />
              </div>

              <div className="mt-auto flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full rounded-full font-semibold"
                >
                  Submit
                </Button>
              </div>
            </div>

            {/* RIGHT: scrollable enemies/questions */}
            <div className="md:w-2/3 space-y-3 overflow-y-auto pr-2">
              <Label>Questions &amp; Answers:</Label>

              {qaList.map((item, index) => (
                <div
                  key={index}
                  className="space-y-2 rounded-2xl border border-black/60 bg-black/20 p-4 backdrop-blur-sm"
                >
                  <p className="text-xs font-semibold text-slate-100">
                    Enemy #{index + 1}
                  </p>

                  {/* Question */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor={`question-${index}`}
                      className="text-xs"
                    >
                      Question
                    </Label>
                    <Input
                      id={`question-${index}`}
                      placeholder={`Question #${index + 1}`}
                      value={item.question}
                      onChange={(e) =>
                        updateQA(index, "question", e.target.value)
                      }
                      className="rounded-full border border-black/70 bg-black/20 text-sm backdrop-blur-sm"
                    />
                  </div>

                  {/* Answer */}
                  <div className="space-y-1.5">
                    <Label htmlFor={`answer-${index}`} className="text-xs">
                      Answer
                    </Label>
                    <Input
                      id={`answer-${index}`}
                      placeholder={`Answer #${index + 1}`}
                      value={item.answer}
                      onChange={(e) =>
                        updateQA(index, "answer", e.target.value)
                      }
                      className="rounded-full border border-black/70 bg-black/20 text-sm backdrop-blur-sm"
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                onClick={addQuestion}
                className="w-full rounded-full md:w-auto"
                variant="secondary"
              >
                + Add Question
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </BackgroundWrapper>
  );
}