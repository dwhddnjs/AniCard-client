import Image from "next/image";
import React from "react";

export type PlayerTypes = {
  nickname: string;
  team: string;
  img: string;
  name: string;
};

interface PlayerCardsProps {
  players: PlayerTypes[];
  title: string;
  icon: any;
}

export const PlayerCards: React.FC<PlayerCardsProps> = ({
  players,
  title,
  icon,
}) => {
  return (
    <div>
      <div className="flex items-center justify-start mb-[12px] space-x-2 ">
        <Image src={icon} width={30} height={30} alt="" />
        <h2 className="text-white text-xl font-extrabold ">{title}</h2>
      </div>
      <div className="flex flex-row flex-wrap ">
        {players?.map((player: any) => (
          <div
            key={player.nickname}
            className="bg-[#272727] rounded-md w-[130px] px-[12px] pb-[8px] mr-[20px] mb-[20px] shadow-xl border-2 border-[#272727]"
          >
            <Image src={player.img} width={140} height={150} alt="" />
            <h2 className="text-white font-bold mt-[3px]">{player.nickname}</h2>
            <div className="text-[#c4c4c4] font-normal text-xs ">
              <p>{player.name}</p>
              <p>{player.team}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
