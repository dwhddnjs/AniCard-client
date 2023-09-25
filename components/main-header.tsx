"use client";

import React from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MainHeader = ({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();

  const routes = [
    {
      href: `/store`,
      label: "Store",
      active: pathname === `/store`,
    },
    {
      href: `/packs`,
      label: "Packs",
      active: pathname === `/packs`,
    },
  ];

  if (
    pathname !== "/auth/login" &&
    pathname !== "/auth/signup" &&
    pathname !== "/"
  ) {
    return (
      <div
        className="w-full flex items-center border px-6 h-16 space-x-10
      "
      >
        <h1 className="font-bold">ANICARD</h1>
        <nav className="flex items-center space-x-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
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

export default MainHeader;
