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
import { Trees, Hammer } from "lucide-react";
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
  <Card className="animate-page pixel-panel relative w-full max-w-[85vw] overflow-hidden rounded-3xl text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-6 top-6 h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(116,191,99,0.2),transparent_60%)] blur-xl" />
        <div className="absolute right-8 bottom-8 h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(215,180,106,0.2),transparent_60%)] blur-xl" />
      </div>
      <CardHeader className="relative space-y-2 pb-4">
        <div className="flex items-center gap-3">
          <span className="pixel-chip flex h-10 w-10 items-center justify-center rounded-md">
            <Trees className="h-5 w-5 text-primary" />
          </span>
          <div>
            <CardTitle className="text-3xl tracking-[0.25em]">LearnQuest</CardTitle>
            <p className="text-sm text-muted-foreground">Your Classes</p>
          </div>
        </div>
        <div className="pixel-chip inline-flex items-center gap-2 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-foreground">
          <Hammer className="h-4 w-4" />
          <span>Edit & grow your grove</span>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        {mine.length === 0 ? (
          <p className="text-sm text-muted-foreground">You haven't created any classes yet.</p>
        ) : (
          mine.map((cls) => (
            <div key={cls.id} className="space-y-2">
              <div className="flex items-center gap-3 rounded-xl border border-black/40 bg-black/25 px-4 py-3 backdrop-blur-sm">
                <span className="h-3 w-3 rounded-full bg-primary" />
                <span className="flex-1 border-b border-dashed border-border/60 pb-[2px] text-sm">{cls.title}</span>
                <div className="flex items-center gap-3">
                  <div className="text-xs text-muted-foreground">{cls.qaList.length} Q</div>
                  <div className="w-28">
                    <div className="h-2 bg-black/20 rounded-full w-full">
                      <div className="h-2 bg-primary rounded-full" style={{ width: `${progressPercent(cls.id)}%` }} />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{progressPercent(cls.id)}%</div>
                  </div>
                  <Button variant="ghost" className="pixel-button border border-transparent hover:border-primary/40" onClick={() => startEdit(cls)}>Edit</Button>
                </div>
              </div>

              {editingId === cls.id && (
                <div className="p-4 border border-border/60 rounded-md bg-black/20">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="bg-white/5 border-primary/40" />
                  </div>

                  <div className="mt-4 space-y-2">
                    <Label>Questions</Label>
                    {editQa.map((q, i) => (
                      <div key={i} className="flex gap-2">
                        <Input value={q.question} onChange={(e) => setQaField(i, 'question', e.target.value)} placeholder={`Question ${i+1}`} className="bg-white/5 border-primary/40" />
                        <Input value={q.answer} onChange={(e) => setQaField(i, 'answer', e.target.value)} placeholder={`Answer ${i+1}`} className="bg-white/5 border-primary/40" />
                        <Button variant="ghost" className="pixel-button border border-transparent hover:border-primary/40" onClick={() => removeQa(i)}>Remove</Button>
                      </div>
                    ))}
                    <Button onClick={addQa} className="pixel-button">+ Add Question</Button>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button onClick={saveEdit} className="pixel-button">Save</Button>
                    <Button variant="ghost" className="pixel-button border border-transparent hover:border-primary/40" onClick={cancelEdit}>Cancel</Button>
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
