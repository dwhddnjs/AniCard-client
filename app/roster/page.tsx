"use client";

import { useRoster } from "@/hooks/useRoster";
import React, { Suspense, useEffect, useState } from "react";
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
import EmptyEsportIcon from "@/public/images/empty_esport_icon.svg";
import { Button } from "@/components/ui/button";
import { ChevronsDown, ChevronsUp, Divide } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSavedRoster } from "@/hooks/useSavedRoster";
import { RosterCard, RosterTypes } from "./components/roster-card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/empty-state";

export type selectedPlayerType = {
  id: number;
  position: string;
  nickname: string;
  img: string;
};

export default function RosterPage() {
  const { data, isLoading } = useRoster();
  const { data: rosterData } = useSavedRoster();

  const {
    selectedPlayers,
    onResetBox,
    onSelectPlayer,
    onUpdatePlayers,
    setRosterId,
  } = useRosterBoxStore();
  const [disable, setDisable] = useState(false);

  const onSelectCard = (roster: RosterTypes) => {
    onUpdatePlayers(roster.players);
    setRosterId(roster.id);
  };

  return (
    <div className=" min-h-screen min-w-screen flex">
      <div className="pl-[24px]  space-y-10 w-[82%] pt-[100px]">
        <PlayerCards
          players={data?.top}
          isLoading={isLoading}
          type="TOP"
          icon={TopIcon}
          onSelectPlayer={onSelectPlayer}
        />
        <PlayerCards
          players={data?.jgl}
          isLoading={isLoading}
          type="JGL"
          icon={JglIcon}
          onSelectPlayer={onSelectPlayer}
        />
        <PlayerCards
          players={data?.mid}
          isLoading={isLoading}
          type="MID"
          icon={MidIcon}
          onSelectPlayer={onSelectPlayer}
        />
        <PlayerCards
          players={data?.ad}
          isLoading={isLoading}
          type="AD"
          icon={AdIcon}
          onSelectPlayer={onSelectPlayer}
        />
        <PlayerCards
          players={data?.spt}
          isLoading={isLoading}
          type="SPT"
          icon={SptIcon}
          onSelectPlayer={onSelectPlayer}
        />
        <div className="h-[200px]" />
      </div>
      <div className=" w-[18%] h-[100%] bg-[#1a1a1a] py-[70px] px-[18px] space-y-5 fixed right-0  overflow-scroll">
        {rosterData?.length > 0 ? (
          rosterData?.map((roster: any) => (
            <RosterCard
              key={roster.id}
              roster={roster}
              onSelectCard={onSelectCard}
            />
          ))
        ) : (
          <div className="flex flex-col justify-center items-center space-y-3 mt-[100%]">
            <EmptyState />
          </div>
        )}
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
      {!disable && <RosterBox selectedPlayers={selectedPlayers} />}
    </div>
  );
}
