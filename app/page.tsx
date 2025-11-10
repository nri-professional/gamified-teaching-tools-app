import { redirect } from "next/navigation";

// Server-side redirect to make the login page the default landing page.
export default function Home() {
  redirect("/auth/login");
}
