"use client";

import { useRoster } from "@/hooks/useRoster";
import React, { useState } from "react";
import { PlayerCards } from "./components/player-cards";
import TopIcon from "@/public/images/top_icon_p.svg";
import JglIcon from "@/public/images/jgl_icon_p.svg";
import MidIcon from "@/public/images/mid_icon_p.svg";
import AdIcon from "@/public/images/ad_icon_p.svg";
import SptIcon from "@/public/images/spt_icon_p.svg";
import { RosterBox, renderPositionImg } from "./components/roster-box";
import { useRosterBoxStore } from "@/hooks/useRosterBoxStore";
import Image from "next/image";
import EsportIcon from "@/public/images/esport_icon.svg";

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
        <div className=" bg-[#1e1e1e] rounded-lg pt-[12px] px-[12px] pb-[10px] relative shadow-lg border-2 border-[#272727]">
          <h3 className="text-[white] font-bold text-md ml-[4px] mb-[4px]">
            예비 로스터
          </h3>
          <div className="flex space-x-2 mb-2">
            {selectedPlayers.map((player) => (
              <div key={player.id}>
                {player?.img && (
                  <Image src={player.img} width={50} height={50} alt="" />
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 grid-flow-row space-y-[2px]">
            {selectedPlayers.map((player) => (
              <div
                key={player.id}
                className="flex text-[12px] text-[white] space-x-1 items-center"
              >
                <Image
                  src={renderPositionImg(player.position)}
                  width={16}
                  height={16}
                  alt=""
                />
                <p className="text-[10px] font-medium">{player?.nickname}</p>
              </div>
            ))}
          </div>
          <div className="w-0 h-0 border-t-[32px] border-t-transparent border-r-[32px] border-r-[#272727] rounded-br-md absolute bottom-0 right-0" />
        </div>
      </div>
      <RosterBox selectedPlayers={selectedPlayers} onResetBox={onResetBox} />
    </div>
  );
}
