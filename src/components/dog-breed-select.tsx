"use client";

import Image from "next/image";
import { DOG_BREEDS } from "@/configs/dog-breed";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface DogBreedSelectProps {
  onSelect: (breedId: number) => void;
  value: number;
}

export const DogBreedSelect = ({ onSelect, value }: DogBreedSelectProps) => {
  const handleSelect = (breedId: string) => {
    const id = parseInt(breedId);
    onSelect(id);
  };

  return (
    <div>
      <h3 className="mb-2">Выберите породу собаки:</h3>
      <RadioGroup
        onValueChange={handleSelect}
        value={value.toString()}
        className="grid grid-cols-2 gap-2"
      >
        {DOG_BREEDS.map((breed) => (
          <div
            key={breed.id}
            className={`relative flex max-h-[500px] flex-col items-center ${
              breed.isWide ? "col-span-2" : ""
            }`}
          >
            <RadioGroupItem
              value={breed.id.toString()}
              id={`breed-${breed.id}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0"
            />
            <Label
              htmlFor={`breed-${breed.id}`}
              className={`flex h-full cursor-pointer flex-col items-center gap-2 rounded-md p-2 ${
                value === breed.id ? "bg-primary/10" : "hover:bg-primary/5"
              }`}
            >
              <Image
                src={breed.image}
                alt={breed.name}
                height={1000}
                className="rounded-md"
              />
              <span className="mt-auto text-center text-sm font-medium">
                {breed.name}
              </span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
