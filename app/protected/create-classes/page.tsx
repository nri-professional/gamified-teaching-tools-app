/*
  NOTE (generated code trace):
  Changes in this file implement creating a class and saving it locally so it appears in Browse and Your Classes.

  User prompt that led to these changes:
  "i want to make it so when the user hits submit on the create classes page, it shows up on the browse classes page, as well as updating their your classes page to show the class that they made. there is no database so just have this happen locally (See <attachments> above for file contents. You may not need to search or read the file again.)"
*/

"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trees, FilePlus2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useClasses } from "../ClassesContext";

type QAItem = {
  question: string;
  answer: string;
};

export default function Page2() {
  const [qaList, setQaList] = useState<QAItem[]>([
    { question: "", answer: "" },
  ]);
  const [dungeonTitle, setDungeonTitle] = useState("");
  const { addClass } = useClasses();
  const router = useRouter();

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
    const title = dungeonTitle || "Untitled Lesson";
    addClass(title, qaList);
    // navigate to browse so the user sees the created class
    router.push("/protected/browse-classes");
  };

  return (
  <Card className="pixel-panel relative w-full max-w-[85vw] overflow-hidden rounded-3xl text-foreground">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-6 top-6 h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(116,191,99,0.2),transparent_60%)] blur-xl" />
          <div className="absolute right-8 bottom-8 h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(215,180,106,0.2),transparent_60%)] blur-xl" />
        </div>
        <CardContent className="relative p-6">
          {/* TOP BAR: title only, full width */}
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="pixel-chip flex h-10 w-10 items-center justify-center rounded-md">
                <Trees className="h-5 w-5 text-primary" />
              </span>
              <div>
                <h1 className="text-3xl font-semibold tracking-[0.25em]">
                  LearnQuest
                </h1>
                <p className="text-sm text-muted-foreground md:text-left">
                  Create Lesson
                </p>
              </div>
            </div>
            <div className="pixel-chip inline-flex items-center gap-2 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-foreground">
              <FilePlus2 className="h-4 w-4" />
              <span>New dungeon</span>
            </div>
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
                  value={dungeonTitle}
                  onChange={(e) => setDungeonTitle(e.target.value)}
                  className="rounded-full border border-primary/40 bg-white/5 backdrop-blur-sm"
                />
              </div>

              <div className="mt-auto flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full rounded-full font-semibold pixel-button"
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
                  className="space-y-2 rounded-2xl border border-primary/30 bg-black/25 p-4 backdrop-blur-sm"
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
                      className="rounded-full border border-primary/40 bg-white/5 text-sm backdrop-blur-sm"
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
                      className="rounded-full border border-primary/40 bg-white/5 text-sm backdrop-blur-sm"
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                onClick={addQuestion}
                className="w-full rounded-full md:w-auto pixel-button"
                variant="secondary"
              >
                + Add Question
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
  );
}
