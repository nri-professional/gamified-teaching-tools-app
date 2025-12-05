/*
  NOTE (generated code trace):
  The following file was created/modified by assistant code changes in response to the user's request:

  User prompt that led to this code:
  "i want to make it so when the user hits submit on the create classes page, it shows up on the browse classes page, as well as updating their your classes page to show the class that they made. there is no database so just have this happen locally (See <attachments> above for file contents. You may not need to search or read the file again.)"

  Follow-up user prompt that added progress features:
  "within the your classes page, you should be able to edit the questions along with browse classes monitoring your progress on the questions with a percentage progress bar of how many classes you've completed."

  This file implements a client-side classes provider (localStorage) and progress tracking.
*/
/* Added deleteClass method*/

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type QAItem = {
  question: string;
  answer: string;
};

export type ClassItem = {
  id: string;
  title: string;
  qaList: QAItem[];
  owner: "me" | "other";
};

type ClassesContextType = {
  classes: ClassItem[];
  addClass: (title: string, qaList: QAItem[]) => void;
  updateClass: (updated: ClassItem) => void;
  markQuestionComplete: (classId: string, questionIndex: number) => void;
  getProgress: (classId: string) => boolean[];
  clear: () => void;
  deleteClass: (id: string) => void;
};

const ClassesContext = createContext<ClassesContextType | undefined>(undefined);

export const ClassesProvider = ({ children }: { children: React.ReactNode }) => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [progress, setProgress] = useState<Record<string, boolean[]>>({});

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("learnquest_classes");
      if (raw) setClasses(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
    try {
      const p = localStorage.getItem("learnquest_progress");
      if (p) setProgress(JSON.parse(p));
    } catch (e) {}
  }, []);

  // persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("learnquest_classes", JSON.stringify(classes));
    } catch (e) {
      // ignore
    }
    try {
      localStorage.setItem("learnquest_progress", JSON.stringify(progress));
    } catch (e) {}
  }, [classes]);

  // persist progress when it changes
  useEffect(() => {
    try {
      localStorage.setItem("learnquest_progress", JSON.stringify(progress));
    } catch (e) {}
  }, [progress]);

  const addClass = (title: string, qaList: QAItem[]) => {
    const id = Date.now().toString();
    const newClass: ClassItem = { id, title, qaList, owner: "me" };
    setClasses((prev) => [newClass, ...prev]);
    setProgress((p) => ({ ...p, [id]: new Array(qaList.length).fill(false) }));
  };

  const updateClass = (updated: ClassItem) => {
    setClasses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setProgress((p) => {
      const prevArr = p[updated.id] || [];
      const next = [...prevArr];
      if (updated.qaList.length > next.length) {
        next.push(...new Array(updated.qaList.length - next.length).fill(false));
      } else if (updated.qaList.length < next.length) {
        next.length = updated.qaList.length;
      }
      return { ...p, [updated.id]: next };
    });
  };

  const deleteClass = (id: string) =>{
    setClasses((prev) => prev.filter((cls) => cls.id !== id));
  };

  const markQuestionComplete = (classId: string, questionIndex: number) => {
    setProgress((p) => {
      const arr = p[classId] ? [...p[classId]] : [];
      arr[questionIndex] = true;
      return { ...p, [classId]: arr };
    });
  };

  const getProgress = (classId: string) => {
    return progress[classId] || [];
  };

  const clear = () => {
    setClasses([]);
    try {
      localStorage.removeItem("learnquest_classes");
    } catch (e) {}
  };

  return (
    <ClassesContext.Provider value={{ classes, addClass, updateClass, markQuestionComplete, getProgress, clear , deleteClass}}>
      {children}
    </ClassesContext.Provider>
  );
};

export const useClasses = () => {
  const ctx = useContext(ClassesContext);
  if (!ctx) throw new Error("useClasses must be used within ClassesProvider");
  return ctx;
};

export default ClassesContext;
