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
import { Button } from "@/components/ui/button";
import { ChevronsDown, ChevronsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSavedRoster } from "@/hooks/useSavedRoster";
import { RosterCard, RosterTypes } from "./components/roster-card";

export type selectedPlayerType = {
  id: number;
  position: string;
  nickname: string;
  img: string;
};

export default function RosterPage() {
  const { data } = useRoster();
  const { data: rosterData } = useSavedRoster();
  console.log("rosterData: ", rosterData);

  const { selectedPlayers, onResetBox, onSelectPlayer } = useRosterBoxStore();
  const [disable, setDisable] = useState(false);

  return (
    <div className=" min-h-screen min-w-screen flex">
      <div className="pl-[24px]  space-y-10 w-[82%] pt-[100px]">
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
      <div className=" w-[18%] h-[100%] bg-[#1a1a1a] py-[70px] px-[18px] space-y-5 fixed right-0  overflow-scroll">
        {rosterData?.map((roster: any) => (
          <RosterCard key={roster.id} roster={roster} />
        ))}
      </div>
      <div
        className={cn(
          "h-fit fixed bottom-[130px] left-[40%] -translate-x-[40%]",
          disable && "bottom-1"
        )}
      >
        <Button
          className="bg-transparent hover:bg-transparent"
          size="icon"
          onClick={() => setDisable((prev) => !prev)}
        >
          {!disable ? (
            <ChevronsDown color="#c4c4c4" size={36} />
          ) : (
            <ChevronsUp color="#c4c4c4" size={36} />
          )}
        </Button>
      </div>
      {!disable && (
        <RosterBox selectedPlayers={selectedPlayers} onResetBox={onResetBox} />
      )}
    </div>
  );
}
