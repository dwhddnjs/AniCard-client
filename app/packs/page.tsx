"use client";

import CardBack from "@/components/card-back";
import React from "react";

export default function PacksPage() {
  return (
    <div className="flex h-screen">
      <div className="flex-3 border ">
        <div>팩</div>
        <div>팩</div>
      </div>
      <div className="flex flex-1 border h-full items-center justify-center">
        <CardBack />
      </div>
    </div>
  );
}
