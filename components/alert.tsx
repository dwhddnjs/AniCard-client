"use client"

import React from "react"
import { X } from "lucide-react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogContent,
} from "@/components/ui/alert-dialog"

interface ModalProps {
  title?: string
  description?: string
  isOpen: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
  className?: string
  disbleClose?: boolean
  onClick?: () => void
}

export const Alert: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onOpenChange,
  children,
  className,
  disbleClose = false,
  onClick,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-[#272727] border-[#1e1e1e]  p-0 pb-[18px] ">
        <div className=" flex justify-end ">
          <AlertDialogCancel className="flex justify-end w-fit bg-transparent border-0 p-2 hover:bg-transparent">
            <X color="#c4c4c4" />
          </AlertDialogCancel>
        </div>
        <div className=" space-y-5 px-[24px] ">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[white] font-semibold text-[16px]">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#c4c4c4]">
              {children}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={onClick}
              className="bg-[#74A99C] text-[white] font-bold border-0"
            >
              이동
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
