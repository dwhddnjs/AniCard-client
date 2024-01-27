import React, { FC } from "react"
import { useDroppable } from "@dnd-kit/core"

interface DroppableProps {
  children: React.ReactNode
}

export const Droppable: FC<DroppableProps> = ({ children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  })

  return (
    <div
      ref={setNodeRef}
      className="border-2 fixed bottom-0 w-full flex flex-row bg-transparent  transition-shadow  space-x-3 min-h-[180px] "
    >
      {children}
    </div>
  )
}
