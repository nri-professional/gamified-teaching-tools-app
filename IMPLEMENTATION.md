you must include an IMPLEMENTATION.md file that explains what feature you implemented, an explanation of what the generated code does and if it does what you were expecting, and what AI tool(s) was(were) used, how, and why. Also describe if any modifications were necessary to the prompts or code to get the submitted output.


# Template

<br>

# [Feature] AI Usage

## What feature was implemented

## Explanation of what the generated code does and if it does what you were expecting

## What AI tools were used

## How they were used

## Prompts:

## Why they were used

## Were any modifications neccesary to the prompts or code to get the submitted output?

<br>

# Main Menu AI Usage

## What feature was implemented
The feature was the main menu, complete with navigation to all our other planned menus.

## Explanation of what the generated code does and if it does what you were expecting
The generated code constructs the website with a title, a subtitle containing the streak, and five buttons that navigate to other pages. This code functions how I was expecting, but does not look the best. Manual configuration of the appearance will be looked at in the future.

## What AI tools were used
A mixture of ChatGPT and Github Copilot with Auto, GPT-5 mini, GPT-5, and Claude were used.

## How they were used
They were used with their Ask mode so that I could see how to implement features and fix errors when I had them. They were used with their Agent mode when I wanted it to quickly scaffold a feature based on my description.

## Prompts: 
Prompt: The design of this page is good, but I would like it to be more properly designed. Currently it looks like a mobile phone screen where the card everything is on isn't properly centered. Scan the #codebase to figure out proper coding type for this repository. We are using Next.js with shadcn and tailwind.
Prompt: why is the text times new roman and not the regular next.js font
Prompt: Can you make the text default next.js font instead of times new roman
Prompt: How would I make the Buttons go to a <Link>?
Prompt: Can you merge the functionality of the old-page, keep the new page's look though

Prompt: make a website front end with typescript, name of file is page.tsx. That is a not a mobile format
Prompt: give me a different background
Prompt: what line of code changes the background size
Prompt: make a background for the app that is similar to the picture given without the letters
Prompt: change the code theme
Prompt: Can you refine the code so that the box in the middle is centered and the content in the box as well.

## Why they were used
They were used to make development quick and to learn about the extent of these tool's usefulness.

## Were any modifications neccesary to the prompts or code to get the submitted output?
Not really directly. Whenever an issue was had, the LLM was just queried again and it typically fixed the code.

# Leaderboards AI Usage

prompt: now create a UI for leaderboards