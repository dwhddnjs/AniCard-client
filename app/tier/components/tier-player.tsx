import { PlayerTypes } from "@/app/roster/components/player-cards";
import Image from "next/image";
import React, { FC } from "react";

export type TierPlayerTypes = PlayerTypes & { id: string };

interface TierPlayerProps {
  player: TierPlayerTypes;
}

export const TierPlayer: FC<TierPlayerProps> = ({ player }) => {
  return (
    <div
      className={
        "bg-[#272727] w-[110px] rounded-md my-[8px]  pb-[6px]  shadow-md border-2 border-[#272727] hover:translate-y-2  duration-200 ease-linear"
      }
    >
      <div className="flex  w-full justify-center">
        <Image src={player.img} width={80} height={1} alt="" />
      </div>
      <div className="px-[12px]">
        <h2 className="text-white font-bold mt-[3px]">{player.nickname}</h2>
        <div className="text-[#c4c4c4] font-normal text-[10px] ">
          <p>{player.name}</p>
          <p>{player.team}</p>
        </div>
      </div>
    </div>
  );
};
