"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainMenuItems } from "@/lib/menu-items";

export function BreadcrumbNavigator() {
  const pathname = usePathname() ?? "";
  const pathSegments = pathname.split("/").filter(Boolean);

  // Build breadcrumb data
  const breadcrumbs = pathSegments.map((segment, index) => {
    const fullPath = "/" + pathSegments.slice(0, index + 1).join("/");
    const match = mainMenuItems.find((item) => item.url && fullPath.endsWith(item.url));

    return {
      name: match?.title || segment,
      href: fullPath,
      isLast: index === pathSegments.length - 1,
    };
  });

  return (
    <div className="-mt-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {breadcrumbs.map((crumb) => (
            <React.Fragment key={crumb.href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {crumb.isLast ? (
                  <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href}>{crumb.name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
