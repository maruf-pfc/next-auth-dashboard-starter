"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) redirect("/signin");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-semibold mb-4">
        Hello, {session.user?.name} 👋
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        You&apos;re successfully logged in. Click the button below to continue
        to your dashboard.
      </p>
      <Link href="/dashboard">
        <Button variant="outline" className="cursor-pointer">
          Go to Dashboard
        </Button>
      </Link>
    </div>
  );
}
