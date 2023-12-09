import { PlayerTypes } from "@/app/roster/components/player-cards";
import { create } from "zustand";

export type selectedPlayerType = {
  id: number;
  position: string;
  nickname: string;
  img: string;
};

export interface useRosterBoxStoreTypes {
  selectedPlayers: selectedPlayerType[];
  rosterId: null | number;
  onSelectPlayer: (type: string, player: PlayerTypes) => void;
  onResetBox: () => void;
  onUpdatePlayers: (players: selectedPlayerType[]) => void;
  setRosterId: (rosterId: number) => void;
}

export const useRosterBoxStore = create<useRosterBoxStoreTypes>((set, get) => ({
  selectedPlayers: [
    {
      id: 1,
      position: "top",
      nickname: "",
      img: "",
    },
    {
      id: 2,
      position: "jgl",
      nickname: "",
      img: "",
    },
    {
      id: 3,
      position: "mid",
      nickname: "",
      img: "",
    },
    {
      id: 4,
      position: "ad",
      nickname: "",
      img: "",
    },
    {
      id: 5,
      position: "spt",
      nickname: "",
      img: "",
    },
  ],

  rosterId: null,

  setRosterId: (rosterId: number) => {
    set({
      rosterId,
    });
  },

  onSelectPlayer: (type: string, player: PlayerTypes) => {
    const lowerType = type.toLowerCase();
    const newArr = get().selectedPlayers;
    const findIndex = newArr.findIndex((el) => el.position === lowerType);
    if (newArr[findIndex]["nickname"] === player.nickname) {
      newArr[findIndex]["img"] = "";
      newArr[findIndex]["nickname"] = "";
    } else {
      newArr[findIndex]["img"] = player.img;
      newArr[findIndex]["nickname"] = player.nickname;
    }
    set({
      selectedPlayers: newArr,
    });
  },

  onUpdatePlayers: (players: selectedPlayerType[]) => {
    const prevArr = get().selectedPlayers;
    const result: selectedPlayerType[] = [];
    prevArr.forEach((prevEl) => {
      players.forEach((el) => {
        if (prevEl.position === el.position) {
          const newItem = {
            id: prevEl.id,
            position: el.position,
            nickname: el.nickname,
            img: el.img,
          };

          result.push(newItem);
        }
      });
    });

    set({
      selectedPlayers: result,
    });
  },

  onResetBox: () => {
    set({
      selectedPlayers: [
        {
          id: 1,
          position: "top",
          nickname: "",
          img: "",
        },
        {
          id: 2,
          position: "jgl",
          nickname: "",
          img: "",
        },
        {
          id: 3,
          position: "mid",
          nickname: "",
          img: "",
        },
        {
          id: 4,
          position: "ad",
          nickname: "",
          img: "",
        },
        {
          id: 5,
          position: "spt",
          nickname: "",
          img: "",
        },
      ],
      rosterId: null,
    });
  },
}));
