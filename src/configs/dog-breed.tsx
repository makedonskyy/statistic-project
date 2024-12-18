import pincher from "@/assets/breed/pincher.png";
import goldenRetriever from "@/assets/breed/golden-retriever.png";
import borderCollie from "@/assets/breed/border-collie.png";
import westie from "@/assets/breed/westie.png";
import biggle from "@/assets/breed/biggle.png";
import dachshund from "@/assets/breed/dachshund.png";
import { StaticImageData } from "next/image";

export interface DogBreed {
  id: number;
  image: StaticImageData;
  name: string;
  isWide?: boolean;
}

export const DOG_BREEDS: DogBreed[] = [
  {
    id: 0,
    image: pincher,
    name: "Пинчер",
    isWide: true,
  },
  {
    id: 1,
    image: goldenRetriever,
    name: "Золотистый ретривер",
  },
  {
    id: 2,
    image: borderCollie,
    name: "Бордер-колли",
  },
  {
    id: 3,
    image: dachshund,
    name: "Такса",
    isWide: true,
  },
  {
    id: 4,
    image: westie,
    name: "Вести",
  },
  {
    id: 5,
    image: biggle,
    name: "Бигль",
  },
];
