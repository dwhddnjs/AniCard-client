"use client";

import { useRoster } from "@/hooks/useRoster";
import React, { useState } from "react";
import { PlayerCards } from "./components/player-cards";
import TopIcon from "@/public/images/top_icon_p.svg";
import JglIcon from "@/public/images/jgl_icon_p.svg";
import MidIcon from "@/public/images/mid_icon_p.svg";
import AdIcon from "@/public/images/ad_icon_p.svg";
import SptIcon from "@/public/images/spt_icon_p.svg";
import { RosterBox } from "./components/roster-box";
import { useRosterBoxStore } from "@/hooks/useRosterBoxStore";

export type selectedPlayerType = {
  id: number;
  position: string;
  nickname: string;
  img: string;
};

export default function RosterPage() {
  const { data } = useRoster();
  const { selectedPlayers, onResetBox, onSelectPlayer } = useRosterBoxStore();

  return (
    <div className=" min-h-screen min-w-screen flex">
      <div className="pl-[24px] pt-[24px] space-y-10 w-[82%]">
        <PlayerCards
          players={data?.top}
          type="TOP"
          icon={TopIcon}
          onSelectPlayer={onSelectPlayer}
        />
        <PlayerCards
          players={data?.jgl}
          type="JGL"
          icon={JglIcon}
          onSelectPlayer={onSelectPlayer}
        />
        <PlayerCards
          players={data?.mid}
          type="MID"
          icon={MidIcon}
          onSelectPlayer={onSelectPlayer}
        />
        <PlayerCards
          players={data?.ad}
          type="AD"
          icon={AdIcon}
          onSelectPlayer={onSelectPlayer}
        />
        <PlayerCards
          players={data?.spt}
          type="SPT"
          icon={SptIcon}
          onSelectPlayer={onSelectPlayer}
        />
        <div className="h-[200px]" />
      </div>
      <div className=" w-[18%] bg-[#1a1a1a] pt-[24px] px-[18px]">
        <div className=" bg-[#272727] rounded-md h-[100px] p-[12px] space-y-1">
          <h3 className="text-[white] font-bold text-lg">Roster</h3>
          <div className="flex space-x-2">
            <div className="border-2 w-[32px] h-[32px] rounded-3xl" />
            <div className="border-2 w-[32px] h-[32px] rounded-3xl" />
            <div className="border-2 w-[32px] h-[32px] rounded-3xl" />
            <div className="border-2 w-[32px] h-[32px] rounded-3xl" />
            <div className="border-2 w-[32px] h-[32px] rounded-3xl" />
          </div>
        </div>
      </div>
      <RosterBox selectedPlayers={selectedPlayers} onResetBox={onResetBox} />
    </div>
  );
}
