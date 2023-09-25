"use client";

import React from "react";
import { cardPack } from "@/common/constant";
import { StorePack } from "./components/shop-pack";
import { usePostMutation } from "@/hooks/usePostMutation";
import { API_KEYS } from "@/common/apiKeys";
import { useRouter } from "next/navigation";
import { convertPackLabel } from "@/common/function";

export default function StorePage() {
  const { trigger, isLoading } = usePostMutation(API_KEYS.store);
  const { push } = useRouter();

  const onClickPurchase = async (item: any) => {
    const requestBody = {
      ...item,
      label: convertPackLabel(item.label),
    };
    try {
      await trigger(requestBody);
    } catch (error) {
      console.error(error);
    } finally {
      push("/packs");
    }
  };

  return (
    <div className="w-full flex">
      <div className="w-full flex justify-center pt-[90px] space-x-24">
        {cardPack.map((pack) => (
          <StorePack
            key={pack.id}
            pack={pack}
            onClickPurchase={onClickPurchase}
          />
        ))}
      </div>
    </div>
  );
}
