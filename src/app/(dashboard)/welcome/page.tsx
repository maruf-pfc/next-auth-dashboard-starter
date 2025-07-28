"use client";

import { Lightbulb, Mail, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Welcome() {
  return (
    <main className="bg-background text-foreground flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <Card className="w-full max-w-2xl shadow-md rounded-2xl border border-muted">
        <CardContent className="p-4 sm:p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <Lightbulb className="w-12 h-12 text-primary mx-auto mb-3 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-bold leading-snug">
              Welcome to <span className="text-primary">CPS Task Manager!</span>
            </h1>
            <p className="mt-2 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
              Your journey with efficient task management starts here.
            </p>
          </div>

          <Separator className="my-6" />

          {/* Access Info */}
          <div className="bg-muted/50 border-l-4 border-primary p-4 rounded-lg mb-6">
            <div className="flex items-start">
              <Users className="w-5 h-5 text-primary mt-1 mr-3" />
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-1">
                  Limited Access
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                  You currently have{" "}
                  <span className="font-medium text-primary">
                    limited access
                  </span>{" "}
                  to the app&apos;s features. To unlock the full potential,
                  please contact our team.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-muted/50 border-l-4 border-purple-500 p-4 rounded-lg">
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-purple-700 mt-1 mr-3" />
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-1 text-purple-800 dark:text-purple-400">
                  How to Get Full Access
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Please contact the{" "}
                  <span className="font-medium text-purple-700 dark:text-purple-400">
                    CPS Academy Managers
                  </span>{" "}
                  to request full access.
                </p>

                <Button
                  asChild
                  variant="default"
                  className="mt-3 text-sm px-4 py-2 rounded-full"
                >
                  <a href="mailto:smm@cpsacademy.io">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Managers
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
