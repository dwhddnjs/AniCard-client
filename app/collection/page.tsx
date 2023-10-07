"use client";

import Card from "@/components/card";
import { useCard } from "@/hooks/useCard";
import { CardTypes } from "@/types/card";
import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function CollectionPage() {
  const [page, setPage] = useState(1);
  const { data } = useCard(page);

  const onClickPagination = (type: string) => {
    switch (type) {
      case "right":
        setPage((prev) => prev + 1);
        break;
      default:
        setPage((prev) => prev - 1);
        break;
    }
  };

  return (
    <div className="flex justify-center items-center ">
      {page !== 1 && (
        <ChevronLeft size={48} onClick={() => onClickPagination("left")} />
      )}
      <div className="grid grid-flow-col grid-rows-2 gap-10">
        {data?.map((card: CardTypes) => (
          <Card.back key={card.id} card={card} />
        ))}
      </div>
      <ChevronRight size={48} onClick={() => onClickPagination("right")} />
    </div>
  );
}
