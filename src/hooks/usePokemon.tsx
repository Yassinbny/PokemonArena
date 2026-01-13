import { GetPokemonByName } from "@/api/pokemon";
import type { Pokemon } from "@/types/pokemon";
import { useQuery } from "@tanstack/react-query";

export const usePokemon = (name: string, enabled: boolean = true) => {
  return useQuery<Pokemon>({
    queryKey: ["pokemon", name],
    queryFn: () => GetPokemonByName(name),
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: enabled && !!name,
  });
};
