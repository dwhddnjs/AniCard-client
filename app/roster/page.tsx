"use client";

import { useRoster } from "@/hooks/useRoster";
import Image from "next/image";
import React, { useState } from "react";
import topIcon from "@/public/images/top_icon.svg";
import jglIcon from "@/public/images/jgl_icon.svg";
import midIcon from "@/public/images/mid_icon.svg";
import supIcon from "@/public/images/sup_icon.svg";
import adIcon from "@/public/images/ad_icon.png";
import esportIcon from "@/public/images/esport_icon.svg";
import { PlayerCards } from "./components/player-cards";
import { Button } from "@/components/ui/button";

export default function RosterPage() {
  const { data } = useRoster();
  const [selectedPlayer, setSelectedPlayer] = useState([
    {
      id: 1,
      nickname: "Peyz",
      img: "https://nng-phinf.pstatic.net/MjAyMzA3MDZfODUg/MDAxNjg4NjI2NzAyMzY1.XmNiFz3E8Uw0GTXH0DkNXjTn5A-46-gW50DjLU1OZCEg.nxXvEzt_xdYF_iqivarZ0sDlPZeWDLfke06BSscnXScg.PNG/HUlabcQzATblGRFRdjNn.png",
    },
    {
      id: 2,
      nickname: "",
      img: "",
    },
    {
      id: 3,
      nickname: "",
      img: "",
    },
    {
      id: 4,
      nickname: "",
      img: "",
    },
    {
      id: 5,
      nickname: "",
      img: "",
    },
  ]);

  return (
    <div className=" min-h-screen min-w-screen flex">
      <div className="pl-[24px] pt-[24px] space-y-10 w-[82%]">
        <PlayerCards players={data?.top} title="TOP" icon={topIcon} />
        <PlayerCards players={data?.jgl} title="JGL" icon={jglIcon} />
        <PlayerCards players={data?.mid} title="MID" icon={midIcon} />
        <PlayerCards players={data?.ad} title="AD" icon={adIcon} />
        <PlayerCards players={data?.spt} title="SPT" icon={supIcon} />
        <div className="h-[200px]" />
      </div>
      <div className=" w-[18%] bg-[#1a1a1a]"></div>
      <div className="flex fixed w-fit bottom-0 left-1/3 -translate-x-1/3">
        <div className="w-[100px] h-[130px] border-[1px] bg-[#272727] border-[#1e1e1e] flex flex-col items-center justify-between pt-[18px] pb-[10px]">
          <div className="flex flex-col justify-center items-center space-y-1">
            <Image src={esportIcon} width={32} height={32} alt="" />
            <p className="text-[white] font-bold text-md">Roster</p>
          </div>
          <Button className="font-bold bg-[#74A99C]" size={"xs"}>
            저장
          </Button>
        </div>
        {selectedPlayer.map((player) => (
          <div
            key={player.id}
            className="w-[100px] h-[130px] border-[1px] bg-[#1a1a1a] border-[#272727] flex flex-col items-center relative"
          >
            {player.img && <Image src={player.img} fill alt="" />}
            {player.nickname && (
              <p className="absolute bottom-1 right-1 text-white font-bold">
                {player.nickname}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
