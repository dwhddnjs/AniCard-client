import { useSortable } from "@dnd-kit/sortable"
import React from "react"
import { CSS } from "@dnd-kit/utilities"

export const SortableItem = ({ id, children }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="w-[100px] h-[100px] border-2 text-[white]">{id}</div>
    </div>
  )
}
