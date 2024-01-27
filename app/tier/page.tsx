"use client"

import { useRoster } from "@/hooks/useRoster"
import { cn } from "@/lib/utils"
import React, { useState } from "react"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd"
import { LineTab } from "./components/line-tab"
import { TierPlayer, TierPlayerTypes } from "./components/tier-player"

export default function TierPage() {
  const { data, isLoading } = useRoster()
  // 라이브러리 갈아 엎을거임

  const [position, setPosition] = useState("top")
  const [items, setItems] = useState<any>({
    s: [],
    a: [],
    b: [],
    c: [],
    d: [],

    players:
      data &&
      [...data[position]].map((data, i) => ({
        id: `${i + 1}`,
        ...data,
      })),
  })

  const onSelectPosition = (position: string) => {
    setPosition(position)
    setItems({
      s: [],
      a: [],
      b: [],
      c: [],
      d: [],
      players: [...data[position]].map((data, i) => ({
        id: `${i + 1}`,
        ...data,
      })),
    })
  }

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return

    const scourceKey = source.droppableId as any

    const destinationKey = destination.droppableId as any

    const _items = JSON.parse(JSON.stringify(items)) as typeof items
    const [targetItem] = _items[scourceKey].splice(source.index, 1)
    _items[destinationKey].splice(destination.index, 0, targetItem)
    setItems(_items)
  }

  if (data) {
    return (
      <div className="pt-[100px]  space-y-3 h-screen relative">
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
            <LineTab position={position} onSelectPosition={onSelectPosition} />
          </div>
        </div>
        <div className="mt-4 flex relative h-full">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex flex-col w-full h-full relative">
              {Object.keys(items).map((key) =>
                key === "players" ? (
                  <Droppable key={key} droppableId={key} direction="horizontal">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={cn(
                          "fixed bottom-0 w-full flex flex-row bg-transparent  transition-shadow  space-x-3 min-h-[180px] ",
                          snapshot.isDraggingOver ? "shadow-lg" : "shadow"
                        )}
                      >
                        <div className="flex space-x-3 flex-nowrap overflow-x-scroll min-w-[100%] pl-[24px] w-full mb-[12px]">
                          {items[key]?.map(
                            (item: TierPlayerTypes, index: number) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <TierPlayer player={item} />
                                  </div>
                                )}
                              </Draggable>
                            )
                          )}
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ) : (
                  <Droppable key={key} droppableId={key} direction="horizontal">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={cn(
                          "flex flex-row border-y-2 border-[#1e1e1e] bg-[#1a1a1a] transition-shadow  space-x-3 mx-[24px] ",
                          snapshot.isDraggingOver ? "shadow-lg" : "shadow"
                        )}
                      >
                        <div className=" min-w-[90px] bg-[#272727] flex justify-center items-center ">
                          <h3 className="text-[36px] font-bold text-[#ffffff]">
                            {key.toLocaleUpperCase()}
                          </h3>
                        </div>
                        <div className="flex space-x-2 overflow-x-scroll min-h-[90px] min-w-[93%]">
                          {items[key].map((item: any, index: any) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <TierPlayer player={item} />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                )
              )}
            </div>
          </DragDropContext>
        </div>
        <div className="h-[500px]" />
      </div>
    )
  }
}
