import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <div className="animate-page flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Thank you for signing up!</CardTitle>
              <CardDescription>Your account has been successfully created.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You&apos;re in! Welcome to LearnQuest.
              </p>
              <Link
                href="/auth/login"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Click here to go to the login screen and log in!
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
