"use client";

import { Button } from "@/components/ui/button";
import { Pack } from "@/types/pack";
import Image from "next/image";
import React from "react";

interface ShopPackProps {
  pack: Pack;
}

const ShopPack: React.FC<ShopPackProps> = ({ pack }) => {
  return (
    <div>
      <Image src={pack.img} width={300} height={400} alt={""} />
      <div className="px-2 space-y-1">
        <div className="font-bold text-3xl">{pack.label}</div>
        <div className="text-gray-500 text-lg">{pack.description}</div>
        <div className="text-blue-600 font-semibold text-lg">
          {pack.price} 원
        </div>
      </div>
      <div className=" flex justify-center items-center py-7">
        <Button className="w-full h-[48px] rounded-xl text-lg">구매하기</Button>
      </div>
    </div>
  );
};

export default ShopPack;
