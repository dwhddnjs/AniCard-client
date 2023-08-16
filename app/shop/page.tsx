"use client";

import React from "react";
import epicPack from "@/public/images/epic.png";
import nomalPack from "@/public/images/normal.png";
import uniquePack from "@/public/images/unique.png";
import ShopPack from "./components/shop-pack";

export default function ShopPage() {
  const cardPack = [
    {
      id: "1",
      label: "노말 팩",
      img: nomalPack,
      description: "노말 카드팩입니다",
      price: 1000,
    },
    {
      id: "2",
      label: "유니크 팩",
      img: uniquePack,
      description: "유니크 카드팩입니다",
      price: 2000,
    },
    {
      id: "3",
      label: "에픽 팩",
      img: epicPack,
      description: "에픽 카드팩입니다",
      price: 3000,
    },
  ];

  return (
    <div className="w-full flex">
      <div className="w-full flex justify-center pt-[90px] space-x-24">
        {cardPack.map((pack) => (
          <ShopPack key={pack.id} pack={pack} />
        ))}
      </div>
    </div>
  );
}
