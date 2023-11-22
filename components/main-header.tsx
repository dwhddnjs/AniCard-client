"use client";

import React from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const MainHeader = ({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();

  const routes = [
    {
      href: `/roster`,
      label: "Roster",
      active: pathname === `/roster`,
    },
    {
      href: `/news`,
      label: "News",
      active: pathname === `/news`,
    },
  ];

  if (
    pathname !== "/auth/login" &&
    pathname !== "/auth/signup" &&
    pathname !== "/"
  ) {
    return (
      <div className="w-full flex items-center px-6 h-16 space-x-10  fixed bg-[#1a1a1a] z-10">
        <h1 className="font-bold text-white text-[18px] ">LoLStar</h1>
        <nav className="flex items-center space-x-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-white",
                route.active ? "text-white dark:text-white" : "text-[#555555]"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    );
  }
};
