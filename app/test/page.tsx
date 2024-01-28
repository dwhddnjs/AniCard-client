"use client"

import React, { useState } from "react"
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core"

import { useRoster } from "@/hooks/useRoster"
import { LineTab } from "../tier/components/line-tab"
import { TierPlayer } from "../tier/components/tier-player"
import { RowContainer } from "./components/row-container"
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable"
import { Droppable } from "./components/droppable"
import { SortableItem } from "./components/sortable-item"

export default function TestPage() {
  const [items, setItems] = useState({
    root: [
      { id: "1", title: "아이잉" },
      { id: "2", title: "아이잉" },
      { id: "3", title: "아이잉" },
    ],
    s: [],
    a: [],
    b: [],
    c: [],
  })

  // const onDragEnd = (event: any) => {
  //   const { active, over } = event
  //   console.log("over: ", over)
  //   console.log("active: ", active)
  //   if (active.id !== over.id) {
  //     setItems((items) => {
  //       const activeIndex = items.indexOf(active.id)
  //       const overIndex = items.indexOf(over.id)
  //       return arrayMove(items, activeIndex, overIndex)
  //     })
  //   }
  // }

  return (
    <div className="pt-[100px] h-screen">
      <div className="px-[24px] ">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-white pl-[6px]">
              라인별 티어표
            </h1>
            <span className="text-xs font-bold text-[#c4c4c4] pl-[6px]">
              당신의 생각하는 선수들의 티어를 정해주세요
            </span>
          </div>
          {/* <LineTab
            position={position}
            onSelectPosition={(position) => setPosition(position)}
          /> */}
        </div>
      </div>
      <DndContext
        // sensors={sensors}
        collisionDetection={closestCorners}
        // onDragStart={handleDragStart}
        // onDragOver={handleDragOver}
        // onDragEnd={onDragEnd}
      >
        <RowContainer id="s" title="S" items={items.s} />
        <RowContainer id="a" title="A" items={items.a} />
        <RowContainer id="b" title="B" items={items.b} />
        <RowContainer id="c" title="C" items={items.c} />
        <RowContainer id="root" title="root" items={items.root} />
      </DndContext>
    </div>
  )
}
