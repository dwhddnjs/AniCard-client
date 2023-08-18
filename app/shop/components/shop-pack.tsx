"use client";

import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Pack } from "@/types/pack";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface ShopPackProps {
  pack: Pack;
}

const ShopPack: React.FC<ShopPackProps> = ({ pack }) => {
  const [open, setOpen] = useState(false);
  const { push } = useRouter();

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
        <Button
          className="w-full h-[48px] rounded-xl text-lg"
          onClick={() => setOpen(true)}
        >
          구매하기
        </Button>
      </div>
      <Modal
        title={pack.label}
        description={pack.description}
        isOpen={open}
        onOpenChange={setOpen}
      >
        <div className="flex space-x-5  ">
          <Image src={pack.img} width={300} height={400} alt="" />
          <div className="py-5 flex flex-col justify-between">
            <div className="justify-between">
              <div className="font-bold text-3xl">{pack.label}</div>
              <div className="text-gray-500 text-lg">{pack.description}</div>
              <div className="text-blue-600 font-semibold text-lg">
                {pack.price} 원
              </div>
            </div>
            <Button onClick={() => push("/packs")}>구매하기</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShopPack;
