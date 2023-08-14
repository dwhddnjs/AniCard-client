"use client";

import React from "react";
import CardPack from "./components/card-pack";

export default function ShopPage() {
  const cardPack = [
    {
      id: "1",
      label: "노말 팩",
      description: "노말 카드팩입니다",
      price: 1000,
    },
    {
      id: "2",
      label: "유니크 팩",
      description: "유니크 카드팩입니다",
      price: 2000,
    },
    {
      id: "3",
      label: "에픽 팩",
      description: "에픽 카드팩입니다",
      price: 3000,
    },
  ];

  return (
    <div className="w-full flex">
      <div className="w-full flex space-x-4 justify-center pt-[100px]">
        {cardPack.map((card) => (
          <CardPack key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
