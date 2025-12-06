// src/lib/sharedStore.ts

export interface QAItem {
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  title: string;
  owner: string;
  qaList: QAItem[];
}

// This array acts as your database.
// It lives outside of React components, so it can be shared between
// the Test Suite and the Application Context.
export const sharedClasses: Course[] = [];

export const addSharedClass = (course: Course) => {
  sharedClasses.push(course);
};

export const getSharedClasses = () => {
  return sharedClasses;
};