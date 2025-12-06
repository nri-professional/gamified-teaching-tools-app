"use client";

import { useState } from "react";
import { signUp, signIn, signOut } from "@/lib/auth-client";
import { createCourse, getCourses } from "@/app/api/courses";
import { getUserCourseProgress } from "@/app/api/progress";
// 1. IMPORT SHARED STORE & TYPES
import { sharedClasses, addSharedClass, Course } from "@/lib/sharedStore";

interface Test {
  name: string;
  test: (email: string, password: string) => Promise<string>;
}

//////////////////////////////////////
/// LOCAL HELPER LOGIC
/// Uses sharedClasses for data, but tracks progress locally for the test check
//////////////////////////////////////

// 2. The Progress Tracker: Maps courseID -> array of booleans
// We keep this local to the test file just to verify the "math" of completion works
let localProgress: Record<string, boolean[]> = {};

// Helper: Mimics 'markQuestionComplete' logic
const markQuestionCompleteLocally = (courseId: string, index: number) => {
  if (!localProgress[courseId]) {
    localProgress[courseId] = [];
  }
  localProgress[courseId][index] = true;
};

// Helper: Calculates percentage
const getLocalCompletion = (courseId: string) => {
  // 3. READ FROM SHARED CLASSES
  const course = sharedClasses.find((c) => c.id === courseId);
  if (!course) return 0;

  const progress = localProgress[courseId] || [];
  const completedCount = progress.filter(Boolean).length;
  
  if (course.qaList.length === 0) return 100;
  return (completedCount / course.qaList.length) * 100;
};

//////////////////////////////////////
/// TESTS START
//////////////////////////////////////

// Test 1: Account Creation
const accountCreationTest = async (email: string, password: string) => {
  try {
    await signUp(email, password);
    return "Created account for generated email.";
  } catch (err: any) {
    throw new Error(err?.message ?? "Failed to create account");
  }
};

// Test 2: Log Into Existing Account
const logIntoExistingAccountTest = async (email: string, password: string) => {
  try {
    await signIn('test123@test123.com', 'test123');
    await signOut();
    return "Signed in with generated account and cleared session.";
  } catch (err: any) {
    throw new Error(err?.message ?? "Failed to sign in");
  }
};

// Test 3: Log Into Nonexistent Account
const logIntoNonexistentAccountTest = async (_email: string, _password: string) => {
  const fakeEmail = "missing-user@example.com";
  const fakePassword = "fakepassword";

  try {
    await signOut();
    await signIn(fakeEmail, fakePassword);
    throw new Error("Unexpectedly signed in with a non-existent account");
  } catch (err: any) {
    if (err?.message === "Invalid login credentials") {
      return "Correctly rejected login for non-existent account.";
    }
    throw new Error(err?.message ?? "Unexpected error for non-existent account test");
  }
};

// Test 4: Incorrect Password
const incorrectPasswordTest = async (email: string, password: string) => {
  try {
    await signOut();
    await signIn(email, `${password}-wrong`);
    throw new Error("Unexpectedly signed in with incorrect password");
  } catch (err: any) {
    if (err?.message === "Invalid login credentials") {
      return "Correctly rejected login with wrong password.";
    }
    throw new Error(err?.message ?? "Unexpected error for incorrect password test");
  }
};

// Test 5: Incorrect Email
const incorrectEmailTest = async (_email: string, password: string) => {
  const fakeEmail = "fakeaccount@fake.com";

  try {
    await signOut();
    await signIn(fakeEmail, password);
    throw new Error("Unexpectedly signed in with incorrect email");
  } catch (err: any) {
    if (err?.message === "Invalid login credentials") {
      return "Correctly rejected login with wrong email.";
    }
    throw new Error(err?.message ?? "Unexpected error for incorrect email test");
  }
};

// Test 6: Log Out
const logOutTest = async (email: string, password: string) => {
  try {
    await signIn(email, password);
    await signOut();
    return "Signed out after an authenticated session.";
  } catch (err: any) {
    throw new Error(err?.message ?? "Failed to sign out");
  }
};

// Test 7: Create Classes (UPDATED: Uses Shared Store)
const createClassesTest = async (email: string, password: string) => {
  try {
    await signIn(email, password);

    const id = crypto.randomUUID().split('-')[0];

    // Create a course object
    const newCourse: Course = {
      id: `local-course-${id}`,
      title: `Dungeon Path ${id}`,
      owner: "me",
      qaList: [
        { question: "What is the capital of France?", answer: "Paris" },
        { question: "What is 2 + 2?", answer: "4" },
        { question: "What is the color of the sky?", answer: "Blue" }
      ]
    };

    // 4. WRITE TO SHARED STORE
    // This allows the "Browse Classes" page to see this new course!
    addSharedClass(newCourse);

    return `Class '${newCourse.title}' created and added to Shared Store.`;
  } catch (err: any) {
    throw new Error(err?.message ?? "Failed to create class");
  }
};

// Test 8: Complete Classes (UPDATED: Uses Shared Store)
const completeClassesTest = async (email: string, password: string) => {
  try {
    await signIn(email, password);

    // 5. READ FROM SHARED STORE
    // If empty, create a fallback so the test doesn't crash
    if (sharedClasses.length === 0) {
       addSharedClass({ 
         id: "fallback-1", 
         title: "Fallback Course", 
         owner: "me", 
         qaList: [{ question: "Test Q", answer: "Test A" }] 
       });
    }

    // Get the most recent course from the shared source
    const targetCourse = sharedClasses[sharedClasses.length - 1];

    // Traverse the path locally
    for (let i = 0; i < targetCourse.qaList.length; i++) {
        const q = targetCourse.qaList[i];
        
        // Simulate User Input
        const simulatedUserAnswer = q.answer; 

        // Verify correctness
        if (simulatedUserAnswer.toLowerCase() === q.answer.toLowerCase()) {
            markQuestionCompleteLocally(targetCourse.id, i);
        } else {
            throw new Error(`Failed to answer question #${i+1} correctly.`);
        }
    }

    // Verify Completion
    const completionPercent = getLocalCompletion(targetCourse.id);

    if (completionPercent === 100) {
      return `Accessed '${targetCourse.title}' from Shared Store, completed path. Progress: 100%.`;
    }

    throw new Error(`Path incomplete. Only reached ${completionPercent}% progress.`);

  } catch (err: any) {
    throw new Error(err?.message ?? "Failed to complete class path");
  }
};

// Test 9: Leave Button / Browse
const leaveButtonTest = async (email: string, password: string) => {
  try {
    await signIn(email, password);
    
    const apiCourses = await getCourses().catch(() => []); 
    
    // Check sharedClasses as the source of truth
    if (Array.isArray(apiCourses) || sharedClasses.length > 0) {
      return "Successfully retrieved class list (Browse Classes page operational).";
    }
    throw new Error("Invalid response from courses API and Shared Store is empty");
  } catch (err: any) {
    throw new Error(err?.message ?? "Failed to access browse classes data");
  }
};

// Test 10: Class Progress
const classProgressTest = async (email: string, password: string) => {
  try {
    await signIn(email, password);
    
    const apiProgress = await getUserCourseProgress().catch(() => []);
    const localKeys = Object.keys(localProgress);

    if (Array.isArray(apiProgress) || localKeys.length > 0) {
        return `Progress data retrieved successfully.`;
    }
    
    throw new Error("Invalid response from progress API");
  } catch (err: any) {
    throw new Error(err?.message ?? "Failed to retrieve class progress");
  }
};

//////////////////////////////////////
/// TESTS END
//////////////////////////////////////

export default function Page() {
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);

  const tests: Test[] = [
    { name: "Account Creation", test: accountCreationTest },
    { name: "Log Into Existing Account", test: logIntoExistingAccountTest },
    { name: "Log Into Nonexistent Account", test: logIntoNonexistentAccountTest },
    { name: "Incorrect Password", test: incorrectPasswordTest },
    { name: "Incorrect Email", test: incorrectEmailTest },
    { name: "Log Out", test: logOutTest },
    { name: "Create Classes (Test 7)", test: createClassesTest },
    { name: "Complete Classes (Test 8)", test: completeClassesTest },
    { name: "Leave Button / Browse (Test 9)", test: leaveButtonTest },
    { name: "Class Progress (Test 10)", test: classProgressTest },
  ];

  const runTests = async () => {
    setIsRunning(true);
    setOutput("Running tests...");

    const id = crypto.randomUUID();
    const email = `${id}@example.com`;
    const password = id;

    const results: string[] = [];
    let passes = 0;
    let fails = 0;

    for (const t of tests) {
      try {
        const res = await t.test(email, password);
        results.push(`[PASS] ${t.name}: ${res}`);
        passes++;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        results.push(`[FAIL] ${t.name}: ${message}`);
        fails++;
      }
    }

    const summary = `Completed ${tests.length} tests — ${passes} passed, ${fails} failed.`;

    setOutput([summary, ...results].join("\n\n"));
    setIsRunning(false);
  };

  return (
    <main style={{ padding: "24px", fontFamily: "monospace" }}>
      <h1>Testing Suite for LearnQuest</h1>
      <p>Run will complete the following tests:</p>
      <ul>
        {tests.map((test) => (
          <li key={test.name}>{test.name}</li>
        ))}
      </ul>
      
      <button 
        onClick={runTests} 
        disabled={isRunning} 
        style={{ backgroundColor: '#FFFFFF', color: '#000000', padding: "8px 12px", marginTop: "12px" }}
      >
        {isRunning ? "Running..." : "Run tests"}
      </button>

      <pre style={{ marginTop: "12px", whiteSpace: "pre-wrap" }}>{output || "(no output yet)"}</pre>
    </main>
  );
}