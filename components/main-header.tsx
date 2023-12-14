"use client";

import React from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import EsportIcon from "@/public/images/esport_icon.svg";
import Image from "next/image";
import { Button } from "./ui/button";
import { useIsLogin } from "@/hooks/useIsLoginStore";
import { usePostMutation } from "@/hooks/usePostMutation";
import { API_KEYS } from "@/common/apiKeys";
import { useToast } from "./ui/use-toast";
import { useQueryClient } from "react-query";

export const MainHeader = ({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const { isLogin, setIsLogin } = useIsLogin();
  const { trigger } = usePostMutation(API_KEYS.logout);
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  const onLogout = async () => {
    try {
      await trigger({});
      toast({
        title: "로그아웃 되었습니디",
      });
      replace("/");
      setIsLogin(false);
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
      queryClient.clear();
    } catch (error) {
      console.log(error);
    }
  };

  if (pathname !== "/auth/login" && pathname !== "/auth/signup") {
    return (
      <div className="w-full px-7 h-16 flex fixed justify-between items-center bg-[#1a1a1a] z-10">
        <div className="space-x-10 flex items-center">
          <div
            className="flex space-x-2 cursor-pointer"
            onClick={() => replace("/")}
          >
            <Image src={EsportIcon} width={24} height={24} alt="" />
            <h1 className="font-bold text-white text-[18px] ">LoLStar</h1>
          </div>
          <nav className="flex items-center space-x-5">
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
        {isLogin && (
          <Button
            onClick={onLogout}
            className="bg-transparent text-[#c4c4c4] font-bold hover:bg-transparent hover:text-[#555555] cursor-pointer"
          >
            로그아웃
          </Button>
        )}
      </div>
    );
  }
};
