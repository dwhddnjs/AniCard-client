import { useSavedRoster } from "@/hooks/useSavedRoster";
import Image from "next/image";
import React, { FC, useState } from "react";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRemoveRosterMutation } from "@/hooks/useRemoveRosterMutation";
import { cn } from "@/lib/utils";
import { useRosterBoxStore } from "@/hooks/useRosterBoxStore";
import { positionOrder } from "@/common/constant";
import { renderPositionImg } from "@/common/function";

export type PlayerTypes = {
  id: number;
  nickname: string;
  position: string;
  img: string;
};

export type RosterTypes = {
  id: number;
  title: string;
  userId: string;
  players: PlayerTypes[];
};

interface RosterCardProps {
  roster: RosterTypes;
  onSelectCard: (roster: RosterTypes) => void;
}

export const RosterCard: FC<RosterCardProps> = ({ roster, onSelectCard }) => {
  const { mutate } = useRemoveRosterMutation(roster.id);
  const { rosterId, onResetBox } = useRosterBoxStore();

  const sortRoster = roster?.players?.sort(
    (a, b) =>
      positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position)
  );

  const onRemoveRoster = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      mutate();
    } catch (error) {
      console.log(error);
    } finally {
      onResetBox();
    }
  };

  return (
    <div
      onClick={() => onSelectCard(roster)}
      className={cn(
        "bg-[#1e1e1e] rounded-lg pt-[8px] px-[12px] pb-[10px] relative shadow-lg border-2 border-[#272727]",
        rosterId === roster.id && "border-[#c4c4c4]"
      )}
    >
      <div className="flex justify-between items-center mb-[4px]">
        <h3 className="text-[white] font-bold text-md ml-[4px] ">
          {roster?.title}
        </h3>
        <Button
          size={"xs"}
          className="bg-transparent"
          onClick={(e) => onRemoveRoster(e)}
        >
          <X width={16} height={16} color="#c4c4c4" />
        </Button>
      </div>
      <div className="flex space-x-2 mb-2 ">
        {roster?.players?.map((player) => (
          <div key={player.id}>
            <Image src={player.img} width={50} height={50} alt="" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 grid-flow-row space-y-[2px] ">
        {sortRoster.map((player) => (
          <div
            key={player.id}
            className="flex text-[12px] text-[white] space-x-1 items-center"
          >
            <Image
              src={renderPositionImg(player.position)}
              height={16}
              width={16}
              alt=""
            />
            <p className="text-[10px] font-medium">{player?.nickname}</p>
          </div>
        ))}
      </div>
      <div className="w-0 h-0 border-t-[32px] border-t-transparent border-r-[32px] border-r-[#272727] rounded-br-md absolute bottom-0 right-0" />
    </div>
  );
};
