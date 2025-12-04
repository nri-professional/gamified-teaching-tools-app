You must include an IMPLEMENTATION.md file that explains what feature you implemented, an explanation of what the generated code does and if it does what you were expecting, and what AI tool(s) was(were) used, how, and why. Also describe if any modifications were necessary to the prompts or code to get the submitted output.

## Summary - features implemented - Nicholas Ricketts

- Testing page with 6 implemented tests, all ensuring our log ins are functional.
- Implements 5 unit tests, and 1 integration test.

## Files changed / created - Nicholas Ricketts

- app/testing/page.tsx - created
  - Contains a page with a testing suite for LearnQuest

## What the generated code does and verification notes - Nicholas Ricketts

- The code runs tests on various functions imported from around the app.

## AI tools used, how, and why - Kevin Toker

- Tool used: Github Copilot with GPT-5.1-Codex-Max
- How: I used the assistant to clean up my code and make it more understandable for others.
- Why: I had to manually ensure that my code was functional and did not trust the AI tool to get that part right. Instead, it just cleaned up my code, fixing indents, making variable names more semantic, things like that.
- Prompt: 'Can you make sure this page is easily understandable and functional? I need to hand this off to a colleague and want to ensure everything works good.'

## Summary — features implemented - Kevin Toker

- Local in-browser classes store (no backend): create classes on the Create page, browse them on Browse Classes, and see them on Your Classes. Data persists to localStorage.
- Editable classes: inline editor on `Your Classes` to edit title and QA pairs.
- Sequential quiz flow: click a class in `Browse Classes` to open a quiz UI that shows one question at a time and requires a correct answer to advance.
- Visual progress tracking: per-question boolean progress stored in localStorage and displayed as a progress bar on class cards and as nodes in an interactive path UI.
- Interactive path UI: question squares arranged in a path with SVG curved connectors; nodes show completed/current/locked states; final finish node appears when all questions are done.
- Profile card: shows registered email (via `useUser()`), number of classes created, and number of classes fully completed.
- Leaderboards & Main Menu visual tweaks: removed background image/gradient from main-menu and leaderboards, polished leaderboard rows, made Back button functional and responsive.
- Border color standardization: changed main "window" borders to white across protected pages except Main Menu and Leaderboards as requested.
- Prompt-trace comments: top-of-file comments were added listing the prompts that produced the changes (for traceability).

## Files changed / created - Kevin Toker

- app/protected/ClassesContext.tsx — NEW/modified
  - Client-side React context/provider to hold classes and per-question progress. Persists to localStorage (`learnquest_classes`, `learnquest_progress`). Exposes: classes, addClass, updateClass, markQuestionComplete, getProgress, clear.

- app/protected/layout.tsx — modified
  - Wrapped protected pages with `ClassesProvider` so classes/progress are available across protected pages.

- app/protected/create-classes/page.tsx — modified
  - Wire form submit to call `addClass(title, qaList)` and navigate to `/protected/browse-classes`.

- app/protected/browse-classes/page.tsx — modified
  - Replaced sample content with a responsive grid of larger class cards, per-card progress bar, and an in-page quiz view.
  - Quiz view includes: sequential question path (squares), SVG curved connectors, answer input, per-question correctness checking that prevents advancing until correct, and marking progress via `markQuestionComplete`.

- app/protected/your-classes/page.tsx — modified
  - Shows classes owned by the user (owner === 'me'). Added inline editor for title + QA pairs that calls `updateClass` and adjusts progress length.

- app/protected/profile/page.tsx — modified
  - Shows registered email (via `useUser()`), count of created classes, and count of classes completed (via `getProgress`).

- app/protected/leaderboards/page.tsx — modified
  - Removed background image & overlay, softened leaderboard row visuals, made Back button functional (navigates to `/protected/main-menu`), and adjusted header layout for small screens.

- app/protected/main-menu/page.tsx — modified
  - Removed the background image and fallback gradient. Kept navigation layout.

- Small style changes in multiple files to change top-level card/container borders to `border-white` (except main-menu and leaderboards which keep their gold/parchment border look).

- Added block comments in the files above with the prompts that produced the edits to help traceability.

## What the generated code does and verification notes - Kevin Toker

- ClassesContext
  - Stores an array of ClassItem objects: { id, title, qaList, owner } and a progress map { [classId]: boolean[] }.
  - Persists both to localStorage. `addClass` initializes the progress array. `updateClass` updates QA lists and resizes progress arrays accordingly. `markQuestionComplete` flips a per-question boolean to true.
  - Expected behavior: works locally in a single browser and persists across reloads. Not multi-user — progress is isolated to the browser/localStorage.

- Create → Browse → Your Classes
  - Creating a class calls `addClass`, which pushes the new class onto the context and persists it. The Browse and Your Classes pages read from the same context and render the new class immediately.

- Quiz flow and Progress
  - The quiz UI shows a path made of numbered square nodes and a final flag node. Users answer the current question via a text input. Correct answers (case-insensitive trimmed equality) mark the question complete and advance to the next node. Incorrect answers show feedback and block progression.
  - The Browse cards show a small progress bar computed from `getProgress`, and Your Classes shows a per-class progress percent and an editor.

- Profile
  - Displays the current user's email (via `useUser()` from your existing lib) and counts of classes created and fully completed using `getProgress`.

Limitations / expectations

- This is a local-only solution. There is no server-side sharing of classes or cross-device persistence . To make it multi-user, the data model would need to be saved in a backend (Supabase is present in the repo and can be wired later).
- Answer checking is strict equality (trimmed, case-insensitive). If you want fuzzy matching, multiple accepted answers, or normalized answers, we can change the checking logic.
- The path UI uses inline SVG connectors between adjacent nodes; it wraps naturally but does not compute an absolute path overlay across wrapped lines. For a single connected SVG roadmap across the full layout more complex position calculations are necessary.

## AI tools used, how, and why - Kevin Toker

- Tool used: Github Copilot
  - How: I used the assistant to generate and apply code edits directly to files (created/updated files using programmatic edits). The assistant used the repository context to make targeted changes and then updated files via patches.
  - Why: to implement the requested UI/UX features quickly and consistently across files, and to wire the local-state plumbing (context + localStorage) without manual repetitive edits.

# Main Menu AI Usage - Nicholas Ricketts

## What feature was implemented - Nicholas Ricketts
The feature was the main menu, complete with navigation to all our other planned menus.

## Explanation of what the generated code does and if it does what you were expecting - Nicholas Ricketts
The generated code constructs the website with a title, a subtitle containing the streak, and five buttons that navigate to other pages. This code functions how I was expecting, but does not look the best. Manual configuration of the appearance will be looked at in the future.

## What AI tools were used - Nicholas Ricketts
A mixture of ChatGPT and Github Copilot with Auto, GPT-5 mini, GPT-5, and Claude were used.

## How they were used - Nicholas Ricketts
They were used with their Ask mode so that I could see how to implement features and fix errors when I had them. They were used with their Agent mode when I wanted it to quickly scaffold a feature based on my description.

## Prompts: - Nicholas Ricketts
Prompt: The design of this page is good, but I would like it to be more properly designed. Currently it looks like a mobile phone screen where the card everything is on isn't properly centered. Scan the #codebase to figure out proper coding type for this repository. We are using Next.js with shadcn and tailwind.
Prompt: why is the text times new roman and not the regular next.js font
Prompt: Can you make the text default next.js font instead of times new roman
Prompt: How would I make the Buttons go to a <Link>?
Prompt: Can you merge the functionality of the old-page, keep the new page's look though

## Prompts: - Julian Whitman
Prompt: make a website front end with typescript, name of file is page.tsx. That is a not a mobile format
Prompt: give me a different background
Prompt: what line of code changes the background size
Prompt: make a background for the app that is similar to the picture given without the letters
Prompt: change the code theme
Prompt: Can you refine the code so that the box in the middle is centered and the content in the box as well.

## Why they were used - Nicholas Ricketts
They were used to make development quick and to learn about the extent of these tool's usefulness.

## Were any modifications neccesary to the prompts or code to get the submitted output? - Nicholas Ricketts
Not really directly. Whenever an issue was had, the LLM was just queried again and it typically fixed the code.

# Leaderboards AI Usage - Julian Whitman

prompt: now create a UI for leaderboards

## Features implemented through AI Adrian Villatoro

For this assignment, I used ChatGPT to help generate several UI-related functions and components for my portion, including: 

The dynamic question/answer system for the Create Lesson page (Page2), 
The Your Classes page (Page3), and 
The shared BackgroundWrapper component that applies a blurred landscape background image. 

Throughout development, I asked ChatGPT to refactor layouts into landscape format, resolve overlapping layout issues, and convert all UI code into TypeScript .tsx using my existing component library (Card, Input, Button, Label). Additionally, ChatGPT provided styling guidance such as removing dark gradient overlays, switching to transparent glass-style cards with black outlines, matching sizing between pages, and adjusting Tailwind classes like max-w-[85vw], bg-transparent, and backdrop-blur-sm.

Prompts used: 
“Can you create  this UI in webapp form using TypeScript with only the selected components?”
“Can you add an answer section for each question added?”
“Remove the difficulty selector.”
“Wrap the entire page in a blurred background image using this image link.”
“Make the layout landscape instead of vertical.”
“Fix the overlap between LearnQuest and the question box.”
“After adding the third question, the submit button disappears. Can you fix that?”
“Can you update the Your Classes page so it matches the Create Lesson card styling?”

## Features implemented through AI Cody Cockrell
# Summary: features implemented
- Public course browse API: **GET /api/courses**
- Course creation API: **POST /api/courses**
- Single course with levels and questions: **GET /api/courses/[slug]/structure**
- Streak APIs: **GET /api/streak**, **POST /api/streak**
- Progress summary: **GET /api/progress**
- Complete a level: **POST /api/levels/[levelId]/complete**
- Auth helpers: **signUp**, **signIn**, **signOut**, **useUser**
- Frontend helpers: **getCourses**, **createCourse**, **getCourseStructure**, **getStreak**, **updateStreak**, **getUserCourseProgress**, **completeLevel**

# Files added or updated
- `app/api/health/route.ts`
- `app/api/courses/route.ts`
- `app/api/courses/[slug]/structure/route.ts`
- `app/api/streak/route.ts`
- `app/api/progress/route.ts`
- `app/api/levels/[levelId]/complete/route.ts`
- `lib/api/courses.ts` `lib/api/streak.ts` `lib/api/progress.ts` `lib/api/levels.ts`
- `lib/auth-client.ts` `lib/useUser.ts`
- `middleware.ts` 

# What the generated code does and verification
- API routes talk to Supabase on the server using the existing `createClient` in `lib/supabase/server.ts`.
- RLS protects user data. Public content is readable without auth.
- Verification for this: `/api/health` returns ok, courses list loads logged out, creating a course works when logged in, streak get and update work, completing a level updates both `user_level_progress` and `user_course_progress` once.
- Outcome matches expectations.

# AI tools used, how, and why
- **ChatGPT** was used to help design endpoints and general structure of the database.
- I used it by describing the project to the AI and what I wanted to accomplish, and it gave me some options from there.
- I used it to streamline the design process. I also used to generate files and code where I was not comfortable in the language and needed assistance.

# Modifications to prompts or code
- Some modifications were necessary but it was more on the syntax side in order for it to understand correct versions/techstack.
