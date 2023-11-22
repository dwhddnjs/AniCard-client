import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface ModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  className?: string;
  disbleClose?: boolean;
  onClick?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
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
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "bg-[#272727] border-[#1e1e1e] space-y-5 p-0 px-[24px] py-[18px]",
          className
        )}
      >
        <div className="space-y-2 flex flex-col">
          {!disbleClose && (
            <DialogClose className="flex justify-end ">
              <X color="#c4c4c4" />
            </DialogClose>
          )}
          <DialogHeader>
            <DialogTitle className="text-[#c4c4c4] font-semibold text-[16px] pl-[4px] ">
              {title}
            </DialogTitle>
          </DialogHeader>
          <div>{children}</div>
        </div>
        <DialogFooter>
          <DialogTrigger
            className="bg-[#74A99C] text-[white] font-bold h-10 px-4 py-2 rounded-md"
            onClick={onClick}
          >
            저장
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
