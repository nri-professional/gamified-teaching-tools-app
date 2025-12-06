"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
// 1. IMPORT 'Course' HERE
import { sharedClasses, addSharedClass, Course } from "@/lib/sharedStore"; 

type QAItem = {
  question: string;
  answer: string;
};

// We can remove ClassItem and just use Course to keep types consistent
// or alias it if you prefer. For simplicity, we use Course.

type ClassesContextType = {
  classes: Course[];
  addClass: (title: string, qaList: QAItem[]) => void;
  updateClass: (updated: Course) => void;
  markQuestionComplete: (classId: string, questionIndex: number) => void;
  getProgress: (classId: string) => boolean[];
  clear: () => void;
};

const ClassesContext = createContext<ClassesContextType | undefined>(undefined);

export const ClassesProvider = ({ children }: { children: React.ReactNode }) => {
  const [progress, setProgress] = useState<Record<string, boolean[]>>({});
  
  // Initialize with sharedClasses so the Test data appears immediately
  const [classes, setClasses] = useState<Course[]>(sharedClasses);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("learnquest_classes");
      if (raw) {
        const localData = JSON.parse(raw);
        // Optional: Merge local storage with sharedClasses if needed, 
        // but for now, we just ensure we have data.
        if (localData.length > 0) setClasses(localData);
      }
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

  // MERGED addClass FUNCTION
  const addClass = (title: string, qaList: QAItem[]) => {
    const newClass: Course = {
      id: crypto.randomUUID(),
      title,
      owner: "me",
      qaList,
    };

    // 1. Update React State (UI updates immediately)
    setClasses((prev) => [newClass, ...prev]);

    // 2. Update Shared Store (Test suite sees this)
    addSharedClass(newClass);

    // 3. Initialize Progress
    setProgress((p) => ({ ...p, [newClass.id]: new Array(qaList.length).fill(false) }));
  };

  const updateClass = (updated: Course) => {
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
    <ClassesContext.Provider value={{ classes, addClass, updateClass, markQuestionComplete, getProgress, clear }}>
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