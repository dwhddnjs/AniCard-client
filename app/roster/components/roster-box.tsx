import Image from "next/image";
import esportIcon from "@/public/images/esport_icon.svg";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { selectedPlayerType } from "../page";
import TopIcon from "@/public/images/top_icon_p.svg";
import JglIcon from "@/public/images/jgl_icon_p.svg";
import MidIcon from "@/public/images/mid_icon_p.svg";
import AdIcon from "@/public/images/ad_icon_p.svg";
import SptIcon from "@/public/images/spt_icon_p.svg";
import { Check, RotateCcw, ChevronsDown, ChevronsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePostMutation } from "@/hooks/usePostMutation";
import { API_KEYS } from "@/common/apiKeys";
import Modal from "@/components/modal";
import { Input } from "@/components/ui/input";
import { useSaveRosterMutation } from "@/hooks/useSaveRosterMutation";
import { useRosterBoxStore } from "@/hooks/useRosterBoxStore";
import { PlayerTypes } from "./roster-card";
import { useToast } from "@/components/ui/use-toast";

interface RosterBoxProps {
  selectedPlayers: selectedPlayerType[];
  onResetBox: () => void;
}

export const renderPositionImg = (position: string) => {
  let result;
  switch (position) {
    case "top":
      result = TopIcon;
      break;
    case "jgl":
      result = JglIcon;
      break;
    case "mid":
      result = MidIcon;
      break;
    case "ad":
      result = AdIcon;
      break;
    default:
      result = SptIcon;
      break;
  }
  return result;
};

export const RosterBox: React.FC<RosterBoxProps> = ({
  selectedPlayers,
  onResetBox,
}) => {
  const { trigger, isError } = usePostMutation(API_KEYS.roster);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { mutate } = useSaveRosterMutation();
  console.log("selectedPlayers: ", selectedPlayers);
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
      mutate(requestBody);
    } catch (error) {
      console.log(error);
    } finally {
      onResetBox();
      setOpen(false);
    }
  };

  const onChangeText = (e: any) => {
    setInputValue(e.target.value);
  };

  const onOpenModal = () => {
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
      <Modal isOpen={open} onOpenChange={setOpen}>
        <h2 className="text-[#c4c4c4] font-semibold text-[16px] mb-3 ml-1">
          원하시는 로스터 이름 입력해주세요.
        </h2>
        <Input
          className="bg-[#1e1e1e] border-[#1a1a1a] text-white h-[48px] text-md"
          onChange={(e) => onChangeText(e)}
          value={inputValue}
        />
        <div className=" flex justify-end space-x-3 mt-8">
          <Button
            size={"lg"}
            className="bg-[#74A99C] text-[white] font-bold "
            onClick={onSaveRoster}
          >
            저장
          </Button>
          <Button
            size={"lg"}
            className="bg-[#1e1e1e] font-bold"
            onClick={() => setOpen(false)}
          >
            취소
          </Button>
        </div>
      </Modal>
    </div>
  );
};
