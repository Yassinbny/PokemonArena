import { fetchPokemonsByType, GetAllPokemons } from "@/api/pokemon";
import useDebouncedValue from "@/hooks/useDebouncedValues";
import { usePokemon } from "@/hooks/usePokemon";
import { useSearchStore } from "@/store/SearchStore";
import type { PokemonListResponse, ResultPayload } from "@/types/pokemon";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export const useTeamBuilder = () => {
  const queryText = useSearchStore((state) => state.queryText);
  const typeToFind = useSearchStore((state) => state.typeToFind);
  const debouncedQueryText = useDebouncedValue(queryText, 500);
  const [offSet, setOffSet] = useState(0);

  const { data: allPokemons } = useQuery<PokemonListResponse>({
    queryKey: ["pokemon-list"],
    queryFn: () => GetAllPokemons("limit=100000&offset=0"),
    staleTime: 1000 * 60 * 5,
  });

  const { data: pokemonByName, isError } = usePokemon(
    debouncedQueryText,
    !!debouncedQueryText
  );

  const { data: pokemonsByTypes } = useQuery<ResultPayload[]>({
    queryKey: ["pokemon-types", typeToFind],
    queryFn: () => fetchPokemonsByType(typeToFind, "limit=10000&offset=0"),
    staleTime: 1000 * 60 * 60,
    enabled: !!typeToFind && typeToFind !== "All Types",
  });

  const canLoadPrevious = offSet > 0;
  const canLoadMore = useMemo(() => {
    if (typeToFind && pokemonsByTypes) {
      return offSet + 9 < pokemonsByTypes.length;
    }
    return offSet + 9 < 10000 && !pokemonByName;
  }, [typeToFind, pokemonsByTypes, offSet, pokemonByName]);

  const loadPrevious = () => setOffSet((prev) => Math.max(prev - 9, 0));
  const loadMore = () => setOffSet((prev) => prev + 9);

  return {
    allPokemons,
    pokemonByName,
    isError,
    pokemonsByTypes,
    offSet,
    debouncedQueryText,
    canLoadPrevious,
    canLoadMore,
    loadPrevious,
    loadMore,
  };
};
