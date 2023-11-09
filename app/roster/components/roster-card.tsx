import { useSavedRoster } from "@/hooks/useSavedRoster";
import Image from "next/image";
import React, { FC } from "react";
import { renderPositionImg } from "./roster-box";

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
}

export const RosterCard: FC<RosterCardProps> = ({ roster }) => {
  return (
    <div className=" bg-[#1e1e1e] rounded-lg pt-[12px] px-[12px] pb-[10px] relative shadow-lg border-2 border-[#272727]">
      <h3 className="text-[white] font-bold text-md ml-[4px] mb-[4px]">
        {roster?.title}
      </h3>
      <div className="flex space-x-2 mb-2 ">
        {roster?.players?.map((player) => (
          <div key={player.id}>
            <Image src={player.img} width={50} height={50} alt="" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 grid-flow-row space-y-[2px] ">
        {roster?.players?.map((player) => (
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
