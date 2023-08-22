"use client";

import React, { useState } from "react";
import epicPack from "@/public/images/epic.png";
import nomalPack from "@/public/images/normal.png";
import uniquePack from "@/public/images/unique.png";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Modal from "@/components/modal";
import ReactFlipCard from "reactjs-flip-card";
import Card from "@/components/card";
import dog from "@/public/images/dog.jpeg";

export default function PacksPage() {
  const [selectedPack, setSelectedPack] = useState<StaticImageData | null>(
    null
  );
  const [open, setOpen] = useState(false);

  console.log("selectedPack: ", selectedPack);

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

  const cardData = [
    {
      id: "1",
      label: "춤추는 강아지",
      img: dog,
      tier: "normal",
      description:
        "이것은 춤추는 강아지입니다 그날의 기분에 맞춰 춤추는 모습이 신나보이네요",
    },
    {
      id: "2",
      label: "춤추는 강아지",
      img: dog,
      tier: "normal",
      description:
        "이것은 춤추는 강아지입니다 그날의 기분에 맞춰 춤추는 모습이 신나보이네요",
    },
    {
      id: "3",
      label: "춤추는 강아지",
      img: dog,
      tier: "normal",
      description:
        "이것은 춤추는 강아지입니다 그날의 기분에 맞춰 춤추는 모습이 신나보이네요",
    },
    {
      id: "4",
      label: "춤추는 강아지",
      img: dog,
      tier: "normal",
      description:
        "이것은 춤추는 강아지입니다 그날의 기분에 맞춰 춤추는 모습이 신나보이네요",
    },
    {
      id: "5",
      label: "춤추는 강아지",
      img: dog,
      tier: "normal",
      description:
        "이것은 춤추는 강아지입니다 그날의 기분에 맞춰 춤추는 모습이 신나보이네요",
    },
    {
      id: "6",
      label: "춤추는 강아지",
      img: dog,
      tier: "rare",
      description:
        "이것은 춤추는 강아지입니다 그날의 기분에 맞춰 춤추는 모습이 신나보이네요",
    },
  ];

  const onSelectPack = (img: any) => {
    if (selectedPack && selectedPack?.src === img.src) {
      setSelectedPack(null);
    } else {
      setSelectedPack(img);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-3 border space-y-5 p-5">
        {cardPack.map((pack) => (
          <div key={pack.id} onClick={() => onSelectPack(pack.img)}>
            <Image src={pack.img} width={150} height={200} alt="" />
          </div>
        ))}
      </div>
      <div className="flex flex-1 border h-full justify-center pt-36">
        {/* <CardBack /> */}
        {selectedPack && (
          <div className="space-y-16">
            <div>
              <Image src={selectedPack} width={300} height={400} alt="" />
            </div>
            <Button
              onClick={() => setOpen(true)}
              className="w-full h-[48px] rounded-xl text-lg"
            >
              열기
            </Button>
          </div>
        )}
      </div>
      <Modal
        isOpen={open}
        onOpenChange={setOpen}
        className="border-none shadow-none bg-transparent h-full flex justify-center item-center"
        disbleClose
      >
        <div className="border-black flex flex-col justify-between items-center h-full py-8">
          <div className="grid grid-flow-col grid-rows-2 gap-56 mr-24">
            {cardData.map((card) => (
              <ReactFlipCard
                key={card.id}
                flipTrigger="onClick"
                frontComponent={<Card.front />}
                backComponent={<Card.back card={card} />}
              />
            ))}
          </div>
          <Button
            onClick={() => setOpen(false)}
            className="w-[120px] h-[48px] rounded-xl text-lg"
          >
            닫기
          </Button>
        </div>
      </Modal>
    </div>
  );
}
