"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";
import { BreadcrumbNavigator } from "@/components/breadcrumb";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin"); // Redirect to signin if not logged in
    }
  }, [status, router]);

  // Optionally render nothing or a loading state while checking session
  if (status === "loading") {
    return null; // or a spinner/loading indicator here
  }

  // Only render dashboard content if user is authenticated
  if (!session) {
    return null; // Prevent rendering anything before redirect happens
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center p-2">
              <SidebarTrigger className="text-muted-foreground" />
              <div className="mt-5 ml-4">
                <BreadcrumbNavigator />
              </div>
            </div>
            <Navbar />
          </div>
          <main className="flex-1 p-4 w-full overflow-auto">
            {children}
            <Toaster />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
