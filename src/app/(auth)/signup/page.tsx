"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Mail } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Signup() {
  const handleSocialSignIn = async (provider: "google" | "github") => {
    await signIn(provider, {
      callbackUrl: "/dashboard", // Redirect after successful login
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create a new account</CardTitle>
          <CardDescription>
            Enter your details below to create a new account
          </CardDescription>
          <CardAction>
            <Link href="/signin">
              <Button variant="link" className="cursor-pointer">
                Sign In
              </Button>
            </Link>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input
                  id="full-name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="retype-password">Retype Password</Label>
                <Input id="retype-password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" className="w-full cursor-pointer">
            Sign Up
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => handleSocialSignIn("google")}
          >
            <Mail size={18} />
            Sign Up with Google
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => handleSocialSignIn("github")}
          >
            <Github size={18} />
            Sign Up with GitHub
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
