import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface ModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  className?: string;
  disbleClose?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onOpenChange,
  children,
  className,
  disbleClose = false,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={cn("", className)}>
        {!disbleClose && (
          <DialogClose className="flex justify-end">
            <X />
          </DialogClose>
        )}
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
