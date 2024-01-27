import React, { FC } from "react"
import { Droppable } from "./droppable"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { SortableItem } from "./sortable-item"

interface RowContainerProps {
  id: any
  title: string
  items: any[]
}

const containerStyle = {
  background: "#dadada",
  padding: 10,
  margin: 10,
  flex: 1,
}

export const RowContainer: FC<RowContainerProps> = ({ title, id, items }) => {
  const { setNodeRef } = useDroppable({
    id,
  })

  return (
    <div className="flex flex-row border-y-2 border-[#1e1e1e] bg-[#1a1a1a] transition-shadow  space-x-3 mx-[24px]">
      <div className=" min-w-[90px] bg-[#272727] flex justify-center items-center ">
        <h3 className="text-[36px] font-bold text-[#ffffff]">{title}</h3>
      </div>
      <SortableContext
        id={id}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef}>
          {items.map((item) => (
            <div key={item.id}>
              <SortableItem id={item.id}></SortableItem>
            </div>
          ))}
        </div>
      </SortableContext>
    </div>
  )
}
