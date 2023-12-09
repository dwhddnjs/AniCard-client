import Image from "next/image";
import esportIcon from "@/public/images/esport_icon.svg";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { selectedPlayerType } from "../page";

import { Check, RotateCcw, ChevronsDown, ChevronsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePostMutation } from "@/hooks/usePostMutation";
import { API_KEYS } from "@/common/apiKeys";
import { Modal } from "@/components/modal";
import { Input } from "@/components/ui/input";
import { useSaveRosterMutation } from "@/hooks/useSaveRosterMutation";
import { useRosterBoxStore } from "@/hooks/useRosterBoxStore";
import { PlayerTypes } from "./roster-card";
import { useToast } from "@/components/ui/use-toast";
import { useUpdateRosterMutation } from "@/hooks/useUpdateRosterMutation";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { useIsLogin } from "@/hooks/useIsLoginStore";
import { useRouter } from "next/navigation";
import { Alert } from "@/components/alert";
import { renderPositionImg } from "@/common/function";

interface RosterBoxProps {
  selectedPlayers: selectedPlayerType[];
}

export const RosterBox: React.FC<RosterBoxProps> = ({ selectedPlayers }) => {
  const { trigger, isError } = usePostMutation(API_KEYS.roster);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { mutate: saveTrigger } = useSaveRosterMutation();
  const { onResetBox, rosterId } = useRosterBoxStore();
  const { mutate: updateTrigger } = useUpdateRosterMutation();
  const { isLogin } = useIsLogin();
  const { replace } = useRouter();

  const { toast } = useToast();

  const onSaveRoster = () => {
    const removeIdPlayers = selectedPlayers.map((el) => {
      return {
        img: el.img,
        nickname: el.nickname,
        position: el.position,
      };
    });

    const requestBody = {
      title: inputValue,
      players: removeIdPlayers,
    };

    try {
      if (rosterId) {
        const requestBodyAddedId = {
          ...requestBody,
          id: rosterId,
        };
        updateTrigger(requestBodyAddedId);
      } else {
        saveTrigger(requestBody);
      }
    } catch (error) {
      console.log(error);
    } finally {
      onResetBox();
      setInputValue("");
      setOpen(false);
    }
  };

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onOpenModal = () => {
    if (!isLogin) {
      setOpenAlert(true);
      return;
    }

    selectedPlayers.forEach((el) => {
      if (el.nickname === "") {
        toast({
          title: "각 라인별 선수들을 모두 채워주세요.",
          variant: "destructive",
        });
        setOpen(false);
      } else {
        setOpen(true);
      }
    });
  };

  return (
    <div className="flex fixed w-fit bottom-0 left-1/3 -translate-x-1/3">
      <div className="w-[100px] h-[130px] border-[1px] bg-[#272727] border-[#1e1e1e] flex flex-col items-center justify-between pt-[18px] pb-[10px]">
        <div className="flex flex-col justify-center items-center space-y-1">
          <Image src={esportIcon} width={32} height={32} alt="" />
          <p className="text-[white] font-bold text-md">Roster</p>
        </div>
        <div className="space-x-2 flex">
          <Button
            className="font-bold bg-[#74A99C] rounded-[50%] text-xs"
            size={"xs"}
            onClick={onOpenModal}
          >
            <Check width={20} />
          </Button>
          <Button
            className="font-bold bg-transparent rounded-[50%]"
            size={"xs"}
          >
            <RotateCcw width={18} onClick={onResetBox} />
          </Button>
        </div>
      </div>
      {selectedPlayers?.map((player) => (
        <div
          key={player?.id}
          className="w-[100px] h-[130px] border-[1px] bg-[#1a1a1a] border-[#272727] flex flex-col relative "
        >
          <div className="p-1">
            <Image
              src={renderPositionImg(player?.position)}
              width={18}
              height={18}
              alt=""
            />
          </div>
          {player?.img && <Image src={player?.img} fill alt="" />}
          {player?.nickname && (
            <p className="absolute bottom-1 right-1 text-white font-bold text-xs drop-shadow-[1px_1px_2px_#000000]">
              {player?.nickname}
            </p>
          )}
        </div>
      ))}
      <Modal
        isOpen={open}
        onOpenChange={setOpen}
        title={
          rosterId
            ? "수정하실 로스터 이름을 입력해주세요."
            : "저장하실 로스터 이름을 입력해주세요."
        }
        onClick={() => onSaveRoster()}
      >
        <Input
          className="bg-[#1e1e1e] border-[#1a1a1a] text-white h-[48px] text-md placeholder:text-[#555555] text-sm"
          onChange={(e) => onChangeText(e)}
          placeholder="최대 12글자 작성 가능"
          value={inputValue}
          maxLength={12}
        />
      </Modal>
      <Alert
        isOpen={openAlert}
        onOpenChange={setOpenAlert}
        onClick={() => replace("/auth/login")}
        title="로그인이 필요합니다"
      >
        <div>
          로스터 저장을 하기 위해 로그인이 필요합니다. 이동 버튼을 누르시면
          로그인 페이지로 이동합니다.
        </div>
      </Alert>
    </div>
  );
};
