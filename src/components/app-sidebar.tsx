"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ChevronsUpDown,
  User,
  LogOut,
  LayoutGrid,
  ChevronDown,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { mainMenuItems } from "@/lib/menu-items";

export function AppSidebar() {
  const { data: session } = useSession();

  if (!session?.user) return null;
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <LayoutGrid className="h-6 w-6 text-primary" />
          <div className="flex flex-col">
            <span className="text-base font-semibold">NextAuth Dashboard</span>
            <span className="text-sm text-muted-foreground">
              Starter Template
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <RecursiveMenuItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt="User Profile Picture"
                width={32}
                height={32}
                className="rounded-full object-cover w-8 h-8"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold">
                {session.user.name
                  ? session.user.name.charAt(0).toUpperCase()
                  : "U"}
              </div>
            )}

            <div className="flex flex-col leading-tight">
              <span className="font-medium text-sm">{session.user.name}</span>
              <span className="text-xs text-muted-foreground">
                {session.user.email}
              </span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="ml-2">
              <ChevronsUpDown className="w-4 h-4 text-muted-foreground cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  className="flex items-center cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button
                  onClick={() => signOut()}
                  className="flex items-center w-full text-left cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

interface MenuItem {
  title: string;
  url?: string;
  icon?: React.ElementType;
  isRoot?: boolean;
  haveChildren?: boolean;
  children?: MenuItem[];
}

interface RecursiveMenuItemProps {
  item: MenuItem;
  level?: number;
}

export function RecursiveMenuItem({ item, level = 0 }: RecursiveMenuItemProps) {
  const [open, setOpen] = useState(false);
  const hasChildren =
    item.haveChildren && item.children && item.children.length > 0;

  const paddingLeft =
    item.isRoot && !item.haveChildren ? "0.5rem" : `${(level + 1) * 1}rem`;

  return (
    <>
      <SidebarMenuItem>
        {hasChildren ? (
          <SidebarMenuButton
            asChild={false}
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 w-full text-left -ml-2"
            style={{ paddingLeft }}
          >
            <>
              {item.icon && (
                <item.icon className="h-5 w-5 text-muted-foreground" />
              )}
              <span>{item.title}</span>
              <ChevronDown
                className={`ml-auto h-4 w-4 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </>
          </SidebarMenuButton>
        ) : (
          item.url && (
            <SidebarMenuButton asChild>
              <Link
                href={item.url}
                className="flex items-center gap-2 w-full"
                style={{ paddingLeft }}
              >
                {item.icon && (
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                )}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          )
        )}
      </SidebarMenuItem>

      {hasChildren && open && (
        <div>
          {item.children?.map((child) => (
            <RecursiveMenuItem
              key={child.title}
              item={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </>
  );
}
