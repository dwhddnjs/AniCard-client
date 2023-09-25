"use client";

import React, { useState } from "react";

import { StaticImageData } from "next/image";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Modal from "@/components/modal";
import ReactFlipCard from "reactjs-flip-card";
import Card from "@/components/card";
import { cardData, cardPack } from "@/common/constant";
import { usePacks } from "@/hooks/usePacks";
import { PackImage } from "./components/pack-image";

export default function PacksPage() {
  const [selectedPack, setSelectedPack] = useState<StaticImageData | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const { data, isLoading } = usePacks();

  const onSelectPack = (img: any) => {
    if (selectedPack && selectedPack?.src === img.src) {
      setSelectedPack(null);
    } else {
      setSelectedPack(img);
    }
  };

  if (!data) {
    return null;
  }

  return (
    <div className="flex h-screen">
      <div className="flex-3 border space-y-5 p-5">
        {data.packs?.map((pack: any) => (
          <PackImage key={pack.id} pack={pack} onSelectPack={onSelectPack} />
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
