/*
  NOTE (generated code trace):
  The your-classes page was extended to allow inline editing of classes (title + QA pairs)
  and to display progress bars. This was implemented in response to the user prompt:

  "within the your classes page, you should be able to edit the questions along with browse classes monitoring your progress on the questions with a percentage progress bar of how many classes you've completed."

  The page uses the ClassesContext methods `updateClass` and `getProgress` added earlier.
*/

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClasses, ClassItem } from "../ClassesContext";

export default function Page3() {
  const { classes, updateClass, getProgress } = useClasses();
  const mine = classes.filter((c) => c.owner === "me");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editQa, setEditQa] = useState<{ question: string; answer: string }[]>([]);

  const startEdit = (cls: ClassItem) => {
    setEditingId(cls.id);
    setEditTitle(cls.title);
    setEditQa(cls.qaList.map((q) => ({ ...q })));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditQa([]);
  };

  const saveEdit = () => {
    if (!editingId) return;
    const updated: ClassItem = { id: editingId, title: editTitle || "Untitled", qaList: editQa, owner: "me" };
    updateClass(updated);
    cancelEdit();
  };

  const setQaField = (idx: number, field: "question" | "answer", value: string) => {
    setEditQa((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };

  const addQa = () => setEditQa((p) => [...p, { question: "", answer: "" }]);
  const removeQa = (i: number) => setEditQa((p) => p.filter((_, idx) => idx !== i));

  const progressPercent = (clsId: string) => {
    const arr = getProgress(clsId) || [];
    const total = classes.find((c) => c.id === clsId)?.qaList.length ?? 0;
    if (total === 0) return 0;
    const done = arr.filter(Boolean).length;
    return Math.round((done / total) * 100);
  };

  return (
  <Card className="w-full max-w-[85vw] border-2 border-white bg-transparent text-slate-50 rounded-3xl backdrop-blur-sm">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-3xl tracking-[0.25em]">LearnQuest</CardTitle>
        <p className="text-sm text-slate-100">Your Classes</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {mine.length === 0 ? (
          <p className="text-sm text-slate-200">You haven't created any classes yet.</p>
        ) : (
          mine.map((cls) => (
            <div key={cls.id} className="space-y-2">
              <div className="flex items-center gap-3 rounded-xl border border-black/40 bg-black/20 px-4 py-3 backdrop-blur-sm">
                <span className={`h-3 w-3 rounded-full bg-slate-300`} />
                <span className={`flex-1 border-b pb-[2px] text-sm`}>{cls.title}</span>
                <div className="flex items-center gap-3">
                  <div className="text-xs text-slate-300">{cls.qaList.length} Q</div>
                  <div className="w-28">
                    <div className="h-2 bg-black/20 rounded-full w-full">
                      <div className="h-2 bg-emerald-400 rounded-full" style={{ width: `${progressPercent(cls.id)}%` }} />
                    </div>
                    <div className="text-xs text-slate-300 mt-1">{progressPercent(cls.id)}%</div>
                  </div>
                  <Button variant="ghost" onClick={() => startEdit(cls)}>Edit</Button>
                </div>
              </div>

              {editingId === cls.id && (
                <div className="p-4 border border-black/30 rounded-md bg-black/10">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                  </div>

                  <div className="mt-4 space-y-2">
                    <Label>Questions</Label>
                    {editQa.map((q, i) => (
                      <div key={i} className="flex gap-2">
                        <Input value={q.question} onChange={(e) => setQaField(i, 'question', e.target.value)} placeholder={`Question ${i+1}`} />
                        <Input value={q.answer} onChange={(e) => setQaField(i, 'answer', e.target.value)} placeholder={`Answer ${i+1}`} />
                        <Button variant="ghost" onClick={() => removeQa(i)}>Remove</Button>
                      </div>
                    ))}
                    <Button onClick={addQa}>+ Add Question</Button>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button onClick={saveEdit}>Save</Button>
                    <Button variant="ghost" onClick={cancelEdit}>Cancel</Button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}