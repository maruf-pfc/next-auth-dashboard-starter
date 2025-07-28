"use client";

import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      {/* Dark mode toggle with text on the right */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Theme</span>
        <ModeToggle />
      </div>
    </div>
  );
}
