/*
  NOTE (generated code trace):
  Changes in this file implement creating a class and saving it locally so it appears in Browse and Your Classes.
  Additional changes implement support for different question types (text, true/false, multiple choice)
  and per-question difficulty (easy/medium/hard).

  User prompt that led to these changes:
  "i want to make it so when the user hits submit on the create classes page, it shows up on the browse classes page, as well as updating their your classes page to show the class that they made. there is no database so just have this happen locally (See <attachments> above for file contents. You may not need to search or read the file again.)"

  "this is the page.tsx file for my create-classes page can you implement the option of adding true/false and multiple choice questions along with the option of adding difficulties of easy/medium/hard to the questions as well. make the ui simple and consistent along with the rest of the program"
*/

"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useClasses } from "../ClassesContext";

type QuestionType = "text" | "true_false" | "multiple_choice";
type Difficulty = "easy" | "medium" | "hard";

type QAItem = {
  question: string;
  answer: string; // for TF/MC this is the correct option text
  type: QuestionType;
  difficulty: Difficulty;
  options: string[]; // used for TF/MC
  correctOptionIndex: number | null;
};

type QAField = "question" | "answer" | "type" | "difficulty";

const createEmptyQAItem = (): QAItem => ({
  question: "",
  answer: "",
  type: "text",
  difficulty: "easy",
  options: [],
  correctOptionIndex: null,
});

export default function Page2() {
  const [qaList, setQaList] = useState<QAItem[]>([createEmptyQAItem()]);
  const [dungeonTitle, setDungeonTitle] = useState("");
  const { addClass } = useClasses();
  const router = useRouter();

  const addQuestion = () => {
    setQaList((prev) => [...prev, createEmptyQAItem()]);
  };

  const updateQA = (index: number, field: QAField, value: string) => {
    setQaList((prev) => {
      const copy = [...prev];
      const item = { ...copy[index], [field]: value };
      copy[index] = item;
      return copy;
    });
  };

  const handleTypeChange = (index: number, newType: QuestionType) => {
    setQaList((prev) => {
      const copy = [...prev];
      let item = { ...copy[index], type: newType as QuestionType };

      if (newType === "true_false") {
        item.options = ["True", "False"];
        item.correctOptionIndex = 0;
        item.answer = "True";
      } else if (newType === "multiple_choice") {
        // ensure 4 options exist
        const existing = item.options && item.options.length > 0 ? item.options : ["", "", "", ""];
        item.options = [...existing].slice(0, 4);
        while (item.options.length < 4) item.options.push("");
        item.correctOptionIndex = null;
        item.answer = "";
      } else {
        // text question
        item.options = [];
        item.correctOptionIndex = null;
        // keep existing answer text
      }

      copy[index] = item;
      return copy;
    });
  };

  const updateOption = (qIndex: number, optionIndex: number, value: string) => {
    setQaList((prev) => {
      const copy = [...prev];
      const item = { ...copy[qIndex] };
      const options = item.options ? [...item.options] : [];
      options[optionIndex] = value;
      item.options = options;

      // keep answer in sync if this option is currently correct
      if (item.correctOptionIndex === optionIndex) {
        item.answer = value;
      }

      copy[qIndex] = item;
      return copy;
    });
  };

  const setCorrectOption = (qIndex: number, optionIndex: number) => {
    setQaList((prev) => {
      const copy = [...prev];
      const item = { ...copy[qIndex] };
      item.correctOptionIndex = optionIndex;
      item.answer = item.options[optionIndex] || "";
      copy[qIndex] = item;
      return copy;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = dungeonTitle || "Untitled Lesson";
    addClass(title, qaList);
    router.push("/protected/browse-classes");
  };

  return (
    <div className="min-h-screen w-full bg-black">
      <Card className="w-full max-w-[85vw] border-2 border-white bg-transparent text-slate-50 rounded-3xl mx-auto mt-8">
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
                  value={dungeonTitle}
                  onChange={(e) => setDungeonTitle(e.target.value)}
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
                  className="space-y-3 rounded-2xl border border-black/60 bg-black/20 p-4 backdrop-blur-sm"
                >
                  <p className="text-xs font-semibold text-slate-100">
                    Enemy #{index + 1}
                  </p>

                  {/* Type + Difficulty row */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <Label className="text-xs" htmlFor={`type-${index}`}>
                        Question Type
                      </Label>
                      <select
                        id={`type-${index}`}
                        value={item.type}
                        onChange={(e) =>
                          handleTypeChange(index, e.target.value as QuestionType)
                        }
                        className="w-full rounded-full border border-black/70 bg-black/30 px-3 py-1 text-xs text-slate-100 outline-none"
                      >
                        <option value="text">Text (Open Answer)</option>
                        <option value="true_false">True / False</option>
                        <option value="multiple_choice">Multiple Choice</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs" htmlFor={`difficulty-${index}`}>
                        Difficulty
                      </Label>
                      <select
                        id={`difficulty-${index}`}
                        value={item.difficulty}
                        onChange={(e) =>
                          updateQA(index, "difficulty", e.target.value)
                        }
                        className="w-full rounded-full border border-black/70 bg-black/30 px-3 py-1 text-xs text-slate-100 outline-none"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                  </div>

                  {/* Question */}
                  <div className="space-y-1.5">
                    <Label htmlFor={`question-${index}`} className="text-xs">
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

                  {/* Answer / options depending on type */}
                  {item.type === "text" && (
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
                  )}

                  {item.type === "true_false" && (
                    <div className="space-y-2">
                      <p className="text-xs text-slate-100">
                        Correct Answer
                      </p>
                      <div className="flex gap-4 text-xs">
                        {["True", "False"].map((label, optIdx) => (
                          <label
                            key={label}
                            className="flex items-center gap-1 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name={`tf-${index}`}
                              checked={item.correctOptionIndex === optIdx}
                              onChange={() => setCorrectOption(index, optIdx)}
                              className="h-3 w-3"
                            />
                            <span>{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.type === "multiple_choice" && (
                    <div className="space-y-2">
                      <p className="text-xs text-slate-100">
                        Options (select the correct one)
                      </p>
                      <div className="space-y-1.5">
                        {item.options.map((opt, optIdx) => (
                          <div
                            key={optIdx}
                            className="flex items-center gap-2 text-xs"
                          >
                            <input
                              type="radio"
                              name={`mc-${index}`}
                              checked={item.correctOptionIndex === optIdx}
                              onChange={() => setCorrectOption(index, optIdx)}
                              className="h-3 w-3"
                            />
                            <Input
                              placeholder={`Option ${optIdx + 1}`}
                              value={opt}
                              onChange={(e) =>
                                updateOption(index, optIdx, e.target.value)
                              }
                              className="rounded-full border border-black/70 bg-black/20 text-xs backdrop-blur-sm"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
    </div> 
  );
}