"use client"

import React, { FC } from "react"
import TopIcon from "@/public/images/top_icon_p.svg"
import JglIcon from "@/public/images/jgl_icon_p.svg"
import MidIcon from "@/public/images/mid_icon_p.svg"
import AdIcon from "@/public/images/ad_icon_p.svg"
import SptIcon from "@/public/images/spt_icon_p.svg"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface LineTabProps {
  position: string
  onSelectPosition: (position: string) => void
}

export const LineTab: FC<LineTabProps> = ({ position, onSelectPosition }) => {
  return (
    <div className="flex w-fit space-x-3 pr-1 items-center">
      <Button
        size="icon"
        className="bg-transparent hover:bg-transparent"
        onClick={() => onSelectPosition("top")}
      >
        <Image
          src={TopIcon}
          width={position === "top" ? 36 : 24}
          height={position === "top" ? 36 : 24}
          alt=""
        />
      </Button>
      <Button
        size="icon"
        className="bg-transparent hover:bg-transparent"
        onClick={() => onSelectPosition("jgl")}
      >
        <Image
          src={JglIcon}
          width={position === "jgl" ? 36 : 24}
          height={position === "jgl" ? 36 : 24}
          alt=""
        />
      </Button>
      <Button
        size="icon"
        className="bg-transparent hover:bg-transparent"
        onClick={() => onSelectPosition("mid")}
      >
        <Image
          src={MidIcon}
          width={position === "mid" ? 36 : 24}
          height={position === "mid" ? 36 : 24}
          alt=""
        />
      </Button>
      <Button
        size="icon"
        className="bg-transparent hover:bg-transparent"
        onClick={() => onSelectPosition("ad")}
      >
        <Image
          src={AdIcon}
          width={position === "ad" ? 36 : 24}
          height={position === "ad" ? 36 : 24}
          alt=""
        />
      </Button>
      <Button
        size="icon"
        className="bg-transparent hover:bg-transparent"
        onClick={() => onSelectPosition("spt")}
      >
        <Image
          src={SptIcon}
          width={position === "spt" ? 36 : 24}
          height={position === "spt" ? 36 : 24}
          alt=""
        />
      </Button>
    </div>
  )
}
