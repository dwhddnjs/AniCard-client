"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import { API_KEYS } from "@/common/apiKeys";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push, replace } = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access-token") as string;
    const refreshToken = localStorage.getItem("refresh-token") as string;

    if (token) {
      const decodedToken = jwt.verify(
        token,
        process.env.NEXT_PUBLIC_ACCESS_SECRET_KEY as string
      ) as { exp: number };

      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (decodedToken.exp >= currentTimestamp) {
        axios({
          url: `${process.env.NEXT_PUBLIC_API_URL}${API_KEYS.refresh}`,
          method: "post",
          headers: {
            Authorization: `Refresh ${refreshToken}`,
          },
        })
          .then((res) => {
            if (res.data) {
              console.log("res.data: ", res.data);
              localStorage.setItem(
                "access-token",
                res?.data?.data.access_token
              );
              localStorage.setItem(
                "refresh-token",
                res?.data?.data.refresh_token
              );
              replace("/shop");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    } else {
      replace("/auth/login");
    }
  }, []);

  return <div>{children}</div>;
}
