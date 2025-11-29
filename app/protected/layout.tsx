/*
  NOTE (generated code trace):
  This file was modified to wrap protected pages with the ClassesProvider so locally-created classes
  are available across the protected area. Change requested by the user prompt:

  "i want to make it so when the user hits submit on the create classes page, it shows up on the browse classes page, as well as updating their your classes page to show the class that they made. there is no database so just have this happen locally (See <attachments> above for file contents. You may not need to search or read the file again.)"
*/

import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { ClassesProvider } from "./ClassesContext";
import { BookOpen } from "lucide-react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-transparent via-transparent to-black/20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(116,191,99,0.18),transparent_60%)] blur-3xl" />
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(215,180,106,0.23),transparent_55%)] blur-3xl" />
        <div className="absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(69,118,89,0.18),transparent_55%)] blur-3xl" />
      </div>

      <div className="relative flex-1 w-full flex flex-col items-center px-4 pb-16">
        <nav className="w-full flex justify-center pt-10">
          <div className="w-full max-w-6xl flex justify-between items-center px-5 py-4 pixel-panel rounded-2xl backdrop-blur">
            <Link
              href={"/protected/main-menu"}
              className="flex items-center gap-2 text-sm md:text-base tracking-[0.25em] text-primary hover:text-foreground transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              LearnQuest
            </Link>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
            </div>
          </div>
        </nav>

        <div className="flex-1 flex flex-col gap-12 w-full max-w-6xl mt-10">
          <ClassesProvider>{children}</ClassesProvider>
        </div>
      </div>
    </main>
  );
}
