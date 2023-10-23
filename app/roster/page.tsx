"use client";

import { useRoster } from "@/hooks/useRoster";
import Image from "next/image";
import React from "react";
import topIcon from "@/public/images/top_icon.svg";

export default function RosterPage() {
  const { data } = useRoster();

  // if (data) {
  //   return null;
  // }

  return (
    <div className="h-screen flex">
      <div className="w-[80%] p-[24px]">
        <div className="flex  items-center justify-start mb-[12px] space-x-1">
          <Image src={topIcon} width={30} height={30} alt="" />
          <h2 className="text-white text-xl font-extrabold ">TOP</h2>
        </div>
        <div className="flex flex-row flex-wrap ">
          {data?.top?.map((player: any) => (
            <div
              key={player.nickname}
              className="bg-[#272727] rounded-md w-[130px] px-[12px] py-[8px] mr-[20px] mb-[20px]"
            >
              <Image src={player.img} width={140} height={150} alt="" />
              <h2 className="text-white font-bold mt-[3px]">
                {player.nickname}
              </h2>
              <div className="text-[#c4c4c4] font-normal text-xs ">
                <p>{player.name}</p>
                <p>{player.team}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-2 w-[20%]"></div>
    </div>
  );
}
