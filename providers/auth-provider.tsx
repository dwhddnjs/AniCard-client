"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import { API_KEYS } from "@/common/apiKeys";
import { useIsLogin } from "@/hooks/useIsLoginStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push, replace } = useRouter();

  const pathname = usePathname();
  const { isLogin, setIsLogin } = useIsLogin();

  const getRefreshToken = async (rt: string) => {
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_API_URL}${API_KEYS.refresh}`,
      method: "post",
      headers: {
        Authorization: `Refresh ${rt}`,
      },
    });

    localStorage.setItem("access-token", res?.data?.data?.access_token);
    localStorage.setItem("refresh-token", res?.data?.data?.refresh_token);
    setIsLogin(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("access-token") as string;
    const refreshToken = localStorage.getItem("refresh-token") as string;

    try {
      const decodedToken = jwt.verify(
        token,
        process.env.NEXT_PUBLIC_ACCESS_SECRET_KEY as string
      ) as { exp: number };

      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (decodedToken.exp <= currentTimestamp) {
        getRefreshToken(refreshToken);
      } else {
        setIsLogin(true);
      }
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        getRefreshToken(refreshToken);
      }
    }

    if (isLogin && token && pathname === "/auth/login") {
      return replace("/roster");
    }
  }, [isLogin]);

  return <div>{children}</div>;
}
