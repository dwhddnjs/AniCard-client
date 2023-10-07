"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import landingDog from "@/public/images/landing_dog.png";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HomePage() {
  const { push } = useRouter();

  return (
    <div className="w-full h-screen flex flex-row justify-between items-center p-[200px] bg-gradient-to-b from-green-200 to-green-600">
      <div className="flex flex-col justify-between space-y-40">
        <div>
          <h3 className="text-4xl font-extrabold ">
            당신의 강아지카드를 모아보세요
          </h3>
          <p className="text-lg text-gray-700">
            어쩌구 저쩌구 사사사사사사삿사사사사사사
          </p>
        </div>
        <Button onClick={() => push("/auth/login")}>시작하기</Button>
      </div>
      <div className=" overflow-hidden rounded-3xl ">
        <Image src={landingDog} width={550} height={300} alt="" />
      </div>
    </div>
  );
}
