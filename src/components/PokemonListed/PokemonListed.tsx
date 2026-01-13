import type { Pokemon } from "@/types/pokemon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../ui/button";
import { X, GripVertical } from "lucide-react";

interface PokemonListedProps {
  pokemon: Pokemon;
  onRemove: () => void;
  isLoading?: boolean;
}

export const PokemonListed = ({
  pokemon,
  onRemove,
  isLoading = false,
}: PokemonListedProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: pokemon.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isLoading) {
    return (
      <div className="flex flex-row items-center gap-5 p-5 border rounded-lg bg-white shadow-sm animate-pulse">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <div className="w-14 h-14 bg-gray-300 rounded-full border"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-20"></div>

        <div className="flex gap-5 text-sm">
          <div className="h-4 bg-gray-300 rounded w-12"></div>
          <div className="h-4 bg-gray-300 rounded w-12"></div>
          <div className="h-4 bg-gray-300 rounded w-12"></div>
          <div className="h-4 bg-gray-300 rounded w-10"></div>
        </div>

        <div className="flex gap-1">
          <div className="h-5 bg-gray-300 rounded-full w-12"></div>
          <div className="h-5 bg-gray-300 rounded-full w-10"></div>
        </div>

        <div className="ml-auto w-8 h-8 bg-gray-300 rounded"></div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex flex-row items-center gap-5 p-5 border rounded-lg bg-white shadow-sm"
    >
      <div
        {...listeners}
        className="flex items-center gap-2  cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-4 h-4 text-gray-400" />
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-14 h-14 rounded-full border"
        />
      </div>
      <span className="font-semibold capitalize text-base">{pokemon.name}</span>

      <div className="flex gap-5 text-sm">
        <span>Atk: {pokemon.stats.attack}</span>
        <span>Def: {pokemon.stats.defense}</span>
        <span>Spd: {pokemon.stats.speed}</span>
        <span>HP: {pokemon.stats.hp}</span>
      </div>

      <div className="flex gap-1">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium capitalize"
          >
            {type}
          </span>
        ))}
      </div>

      <Button
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="ml-auto text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 relative z-50"
      >
        <X className="w-4.5 h-4.5" />
      </Button>
    </div>
  );
};
