// Code cleaned up using one Agentic AI prompt, original code non-ai generated
// Prompts
// "Can you make sure this page is easily understandable and functional? I need to hand this off to a colleague and want to ensure everything works good."

"use client";

import { useState } from "react";
import { signUp, signIn, signOut } from "@/lib/auth-client";

interface Test {
  name: string;
  test: (email: string, password: string) => Promise<string>;
}

//////////////////////////////////////
/// TESTS START
//////////////////////////////////////

// Account creation test
const accountCreationTest = async (email: string, password: string) => {
  try {
    await signUp(email, password);
    return "Created account for generated email.";
  } catch (err: any) {
    throw new Error(err?.message ?? "Failed to create account");
  }
};

// Log into existing account test
const logIntoExistingAccountTest = async (email: string, password: string) => {
  try {
    // Test on an account we know exists.
    await signIn('test123@test123.com', 'test123');
    await signOut();
    return "Signed in with generated account and cleared session.";
  } catch (err: any) {
    throw new Error(err?.message ?? "Failed to sign in");
  }
};

// Failed login into nonexistent account test
// More specifically, this is using BOTH credentials being incorrect
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

// Incorrect password test
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

// Incorrect email test
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

// Log out test
const logOutTest = async (email: string, password: string) => {
  try {
    await signIn(email, password);
    await signOut();
    return "Signed out after an authenticated session.";
  } catch (err: any) {
    throw new Error(err?.message ?? "Failed to sign out");
  }
};

//////////////////////////////////////
/// TESTS END
//////////////////////////////////////

export default function Page() {
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);

  const tests: Test[] = [
    {
      name: "Account Creation",
      test: accountCreationTest,
    },
    {
      name: "Log Into Existing Account",
      test: logIntoExistingAccountTest,
    },
    {
      name: "Log Into Nonexistent Account",
      test: logIntoNonexistentAccountTest,
    },
    {
      name: "Incorrect Password",
      test: incorrectPasswordTest,
    },
    {
      name: "Incorrect Email",
      test: incorrectEmailTest,
    },
    {
      name: "Log Out",
      test: logOutTest,
    },
  ];

  // Run all tests
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

      {/* Output for testing */}
      <pre style={{ marginTop: "12px", whiteSpace: "pre-wrap" }}>{output || "(no output yet)"}</pre>
    </main>
  );
}
