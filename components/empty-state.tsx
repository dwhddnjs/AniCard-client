"use client"

import Image from "next/image"
import React from "react"
import EmptyEsportIcon from "@/public/images/empty_esport_icon.svg"

export const EmptyState = () => {
  return (
    <>
      <Image src={EmptyEsportIcon} width={48} height={48} alt="" />
      <p className="text-[#c4c4c4] font-bold text-center leading-5 tracking-tight">
        저장된 로스터가 <br />
        없습니다
      </p>
    </>
  )
}
