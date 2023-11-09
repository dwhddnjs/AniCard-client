import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useRosterBoxStore } from "@/hooks/useRosterBoxStore";
import { cn } from "@/lib/utils";
import { Medal } from "lucide-react";
import Image from "next/image";
import React from "react";

export type PlayerTypes = {
  nickname: string;
  team: string;
  img: string;
  name: string;
  career: string[];
};

interface PlayerCardsProps {
  players: PlayerTypes[];
  type: string;
  icon: string;
  onSelectPlayer: (type: string, player: PlayerTypes) => void;
}

export const PlayerCards: React.FC<PlayerCardsProps> = ({
  players,
  type,
  icon,
  onSelectPlayer,
}) => {
  const { selectedPlayers } = useRosterBoxStore();

  const selectedLine = selectedPlayers.filter(
    (el) => el.position === type.toLowerCase()
  )[0];

  return (
    <div className="z-0">
      <div className="flex items-center justify-start mb-[12px] space-x-2 ">
        <Image src={icon} width={30} height={30} alt="" />
        <h2 className="text-white text-xl font-extrabold ">{type}</h2>
      </div>
      <div className="flex flex-row flex-wrap ">
        {players?.map((player) => (
          <HoverCard key={player.nickname}>
            <HoverCardTrigger>
              <div
                className={cn(
                  "bg-[#272727] rounded-md w-[130px] px-[12px] pb-[8px] mr-[20px] mb-[20px] shadow-md border-2 border-[#272727] hover:translate-y-2  duration-200 ease-linear",
                  player.nickname === selectedLine.nickname &&
                    "border-[#c4c4c4]"
                )}
                onClick={() => onSelectPlayer(type, player)}
              >
                <Image src={player.img} width={140} height={150} alt="" />
                <h2 className="text-white font-bold mt-[3px]">
                  {player.nickname}
                </h2>
                <div className="text-[#c4c4c4] font-normal text-xs ">
                  <p>{player.name}</p>
                  <p>{player.team}</p>
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="bg-[#1a1a1a] border-0 relative drop-shadow-none">
              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-b-[12px] border-b-[#1a1a1a] border-r-[8px] border-r-transparent absolute top-[-12px] left-[45%]"></div>
              <div className="flex justify-center items-center w-fit space-x-1 mb-2">
                <Medal color="#fff" width={14} height={14} />
                <h3 className="font-semibold text-white text-sm">주요 경력</h3>
              </div>
              <div className="space-y-0.5 ml-[4px]">
                {!player?.career ? (
                  <p className="text-[#c4c4c4] text-xs">없음</p>
                ) : (
                  player?.career?.map((career) => (
                    <p className="text-[#c4c4c4] text-xs" key={career}>
                      {`●  ${career}`}
                    </p>
                  ))
                )}
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
};
