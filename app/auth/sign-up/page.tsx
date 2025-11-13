import { SignUpForm } from "@/components/sign-up-form";

/*
Prompt: What does this mean? This branch IS merged to origin though
PS C:\Users\black\OneDrive\Desktop\School Stuff\Semester 3\CS 3704\gamified-teaching-tools-app> git branch -d nri-professional/sign_in_home_patch
warning: not deleting branch 'nri-professional/sign_in_home_patch' that is not yet merged to
         'refs/remotes/origin/nri-professional/sign_in_home_patch', even though it is merged to HEAD
error: the branch 'nri-professional/sign_in_home_patch' is not fully merged
hint: If you are sure you want to delete it, run 'git branch -D nri-professional/sign_in_home_patch'
hint: Disable this message with "git config advice.forceDeleteBranch false"

Prompt: okay I deleted the remote branch, can I just sync my local branches or do I now need to delete those manually too
*/

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}
