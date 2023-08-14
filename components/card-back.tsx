import Image from "next/image";
import React from "react";
import cardBackIcon from "@/public/images/card-back-icon.png";

const CardBack = () => {
  return (
    <div className="w-[300px] h-[450px] flex items-center justify-center rounded-2xl bg-gradient-to-b from-green-400 to-green-700 drop-shadow-2xl border-8 border-green-400">
      <Image src={cardBackIcon} width={200} height={350} alt="" />
    </div>
  );
};

export default CardBack;
