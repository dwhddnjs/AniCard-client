"use client";

import React from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import EsportIcon from "@/public/images/esport_icon.svg";
import Image from "next/image";

export const MainHeader = ({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const { replace } = useRouter();

  const routes = [
    {
      href: `/roster`,
      label: "Roster",
      active: pathname === `/roster`,
    },

    {
      href: `/tier`,
      label: "Tier",
      active: pathname === `/tier`,
    },
    {
      href: `/news`,
      label: "News",
      active: pathname === `/news`,
    },
  ];

  if (pathname !== "/auth/login" && pathname !== "/auth/signup") {
    return (
      <div className="w-full flex items-center px-7 h-16 space-x-12  fixed bg-[#1a1a1a] z-10">
        <div
          className="flex space-x-2 cursor-pointer"
          onClick={() => replace("/")}
        >
          <Image src={EsportIcon} width={24} height={24} alt="" />
          <h1 className="font-bold text-white text-[18px] ">LoLStar</h1>
        </div>
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
