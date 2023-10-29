import Image from "next/image";
import esportIcon from "@/public/images/esport_icon.svg";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { selectedPlayerType } from "../page";
import TopIcon from "@/public/images/top_icon_p.svg";
import JglIcon from "@/public/images/jgl_icon_p.svg";
import MidIcon from "@/public/images/mid_icon_p.svg";
import AdIcon from "@/public/images/ad_icon_p.svg";
import SptIcon from "@/public/images/spt_icon_p.svg";
import { Check, RotateCcw, ChevronsDown, ChevronsUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface RosterBoxProps {
  selectedPlayers: selectedPlayerType[];
  onResetBox: () => void;
}

export const renderPositionImg = (position: string) => {
  let result;
  switch (position) {
    case "top":
      result = TopIcon;
      break;
    case "jgl":
      result = JglIcon;
      break;
    case "mid":
      result = MidIcon;
      break;
    case "ad":
      result = AdIcon;
      break;
    default:
      result = SptIcon;
      break;
  }
  return result;
};

export const RosterBox: React.FC<RosterBoxProps> = ({
  selectedPlayers,
  onResetBox,
}) => {
  return (
    <div className="flex fixed w-fit bottom-0 left-1/3 -translate-x-1/3">
      <div className="w-[100px] h-[130px] border-[1px] bg-[#272727] border-[#1e1e1e] flex flex-col items-center justify-between pt-[18px] pb-[10px]">
        <div className="flex flex-col justify-center items-center space-y-1">
          <Image src={esportIcon} width={32} height={32} alt="" />
          <p className="text-[white] font-bold text-md">Roster</p>
        </div>
        <div className="space-x-2 flex">
          <Button
            className="font-bold bg-[#74A99C] rounded-[50%] text-xs"
            size={"xs"}
          >
            <Check width={20} />
          </Button>
          <Button
            className="font-bold bg-transparent rounded-[50%]"
            size={"xs"}
          >
            <RotateCcw width={18} onClick={onResetBox} />
          </Button>
        </div>
      </div>
      {selectedPlayers?.map((player) => (
        <div
          key={player?.id}
          className="w-[100px] h-[130px] border-[1px] bg-[#1a1a1a] border-[#272727] flex flex-col relative "
        >
          <div className="p-1">
            <Image
              src={renderPositionImg(player?.position)}
              width={18}
              height={18}
              alt=""
            />
          </div>
          {player?.img && <Image src={player?.img} fill alt="" />}
          {player?.nickname && (
            <p className="absolute bottom-1 right-1 text-white font-bold text-xs drop-shadow-[1px_1px_2px_#000000]">
              {player?.nickname}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
