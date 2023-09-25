import Image from "next/image";
import React from "react";
import epicPack from "@/public/images/epic.png";
import normalPack from "@/public/images/normal.png";
import uniquePack from "@/public/images/unique.png";

interface PackImage {
  pack: any;
  onSelectPack: (img: any) => void;
}

export const PackImage: React.FC<PackImage> = ({ pack, onSelectPack }) => {
  const getPackImage = (label: string) => {
    let result;
    switch (label) {
      case "unique":
        result = uniquePack;
        break;
      case "epic":
        result = epicPack;
        break;
      default:
        result = normalPack;
        break;
    }
    return result;
  };

  return (
    <div onClick={() => onSelectPack(getPackImage(pack.label))}>
      <Image src={getPackImage(pack.label)} width={150} height={200} alt="" />
    </div>
  );
};
