import Image from "next/image";
import React from "react";
import pugIcon from "@/public/images/pug-icon.png";

const CardBack = () => {
  return (
    <div className="w-[300px] h-[450px] flex items-center justify-center rounded-2xl bg-gradient-to-b from-amber-200 to-amber-600 drop-shadow-3xl border-8 border-amber-600">
      <Image src={pugIcon} width={200} height={350} alt="" />
    </div>
  );
};

export default CardBack;
