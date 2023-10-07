import Image from "next/image";
import React from "react";
import pugIcon from "@/public/images/pug-icon.png";
import { CardTypes } from "@/types/card";

export interface CardBackProps {
  card: CardTypes;
}

const front = () => (
  <div className="w-[200px] h-[300px] flex items-center justify-center rounded-2xl bg-gradient-to-b from-amber-200 to-amber-600 drop-shadow-3xl border-8 border-amber-600">
    <Image src={pugIcon} width={200} height={350} alt="" />
  </div>
);

const back: React.FC<CardBackProps> = ({ card }) => (
  <div className="w-[200px] h-[300px] flex justify-start rounded-2xl overflow-hidden drop-shadow-2xl border-8 flex-col border-white shadow-md ">
    <div className="relative">
      <Image src={card.image} alt="" width={200} height={200} />
      <div
        className={
          card.tier === "rare"
            ? "px-3 py-1 font-bold text-md bg-blue-400 text-white mx-2 rounded-3xl absolute  -bottom-4 left-8 "
            : "px-3 py-1 font-bold text-md bg-gray-400 text-white mx-2 rounded-3xl absolute  -bottom-4 left-8 "
        }
      >
        {card.title}
      </div>
    </div>
    <div
      className={
        card.tier === "rare"
          ? "px-2 pt-5 space-y-1 bg-gradient-to-b from-blue-100 to-blue-200 h-full"
          : "px-2 pt-5 space-y-1 bg-gradient-to-b from-gray-100 to-gray-200 h-full"
      }
    >
      <div className="text-blue-600 text-sm font-semibold">
        등급 : {card.tier}
      </div>
    </div>
  </div>
);

const Card = {
  front,
  back,
};

export default Card;
