"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/types/card";
import React from "react";

interface CardPackProps {
  card: Card;
}

const CardPack: React.FC<CardPackProps> = ({ card }) => {
  return (
    <div className="border w-[150] ">
      <div className="w-[150px] h-[150px]" />
      <div>{card.label}</div>
      <div>{card.description}</div>
      <div>{card.price}</div>
      <Button>구매하기</Button>
    </div>
  );
};

export default CardPack;
