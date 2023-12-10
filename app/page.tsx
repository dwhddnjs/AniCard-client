"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import Roster from "@/public/images/roster.png";
import News from "@/public/images/news.png";
import Tier from "@/public/images/tier.png";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Mail } from "lucide-react";

export default function HomePage() {
  const { push } = useRouter();

  return (
    <div className="w-full h-full bg-[#1a1a1a] flex flex-col  justify-center items-center ">
      {/* 첫 섹션 */}
      <div className="flex flex-col justify-between items-center pt-[80px] h-screen">
        <div className="  text-center space-y-6">
          <h3 className="text-4xl font-extrabold text-white tracking-wide">
            당신만의 LCK 로스터를 만들어보세요!
          </h3>
          <p className="text-md text-[#c4c4c4] leading-5 tracking-wide">
            E-Sport LCK 선수 평균 계약기간 1년 ~ 2년
            <br /> 치열한 LCK 스토브리그 선수 영입 경쟁에서 전력적인 승리를 위해
            당신만의 로스터를 구성 후 계획 해보세요.
          </p>
        </div>
        <div className="space-x-5">
          <Button
            onClick={() => push("/roster")}
            className="w-[160px] h-[44px] bg-[#74A99C] text-[16px] rounded-none font-bold "
          >
            로스터 만들기
          </Button>
          <Button
            onClick={() => push("/auth/login")}
            className="w-[120px] h-[44px] bg-[#272727] text-[16px] rounded-none font-bold"
          >
            로그인
          </Button>
        </div>
        <div className=" shadow-[#272727] shadow-2xl border-2 border-[#1e1e1e]">
          <Image src={Roster} width={1000} height={400} alt="" />
        </div>
      </div>
      {/* 두번째 섹션 */}
      <div className="flex bg-[#1e1e1e] w-full justify-center items-center  h-screen space-x-16">
        <div className=" flex flex-col items-center space-y-10">
          <div className="space-y-2">
            <h3 className="text-4xl font-extrabold text-white ">
              선수들의 티어를 정리해보세요!
            </h3>
            <p className="text-md text-[#c4c4c4] ">
              라인별 선수들의 티어 정리를 통해 영입 우선순위를 계획해보세요
            </p>
          </div>
          <Button
            onClick={() => push("/tier")}
            className="w-[160px] h-[48px] bg-[#74A99C] text-[16pxpx] rounded-none font-bold "
          >
            티어 정리하기
          </Button>
        </div>

        <div className=" border-2 border-[#1a1a1a]">
          <Image src={Tier} width={800} height={400} alt="" />
        </div>
      </div>
      {/* 세번째 섹션 */}
      <div className="flex bg-[#1a1a1a] w-full justify-center items-center  h-screen space-x-16">
        <div className=" border-2 border-[#1e1e1e]">
          <Image src={News} width={800} height={400} alt="" />
        </div>
        <div className=" flex flex-col items-center space-y-10">
          <div className="space-y-2">
            <h3 className="text-4xl font-extrabold text-white ">
              LCK 소식을 빠르게 보세요!
            </h3>
            <p className="text-md text-[#c4c4c4] ">
              E-sport LCK 소식를 빠르게 참고해서 더 전력적 영입을 계획해보세요.
            </p>
          </div>
          <Button
            onClick={() => push("/tier")}
            className="w-[160px] h-[48px] bg-[#74A99C] text-[16px] rounded-none font-bold "
          >
            소식을 보기
          </Button>
        </div>
      </div>
      {/* footer */}
      <div className="w-full  bg-[#1e1e1e] flex justify-end items-end p-3">
        <div className="flex items-center justify-center space-x-2">
          <Mail size={24} color="#c4c4c4" />
          <p className="text-[#c4c4c4] ">syd1215no@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
