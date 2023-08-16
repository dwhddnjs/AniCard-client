import { StaticImageData } from "next/image";

export type Pack = {
  id: string;
  label: string;
  img: StaticImageData;
  description: string;
  price: number;
};
