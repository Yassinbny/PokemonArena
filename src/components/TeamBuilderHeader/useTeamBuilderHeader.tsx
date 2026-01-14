import { fetchPokemonTypes } from "@/api/pokemon";
import { useSearchStore } from "@/store/SearchStore";
import { useQuery } from "@tanstack/react-query";

export const useTeamBuilderHeader = () => {
  const typeToFind = useSearchStore((state) => state.typeToFind);
  const setTypeToFind = useSearchStore((state) => state.setTypeToFind);
  const queryText = useSearchStore((state) => state.queryText);
  const setQueryText = useSearchStore((state) => state.setQueryText);
  const { data: types } = useQuery<string[]>({
    queryKey: ["pokemon-types"],
    queryFn: () => fetchPokemonTypes(),
    staleTime: 1000 * 60 * 60,
  });
  const handleSetTypeToFind = (type: string) => {
    setTypeToFind(type);
    setQueryText("");
  };
  const handleSetQueryText = (text: string) => {
    setQueryText(text);
    setTypeToFind("");
  };
  return {
    types,
    typeToFind,
    queryText,
    handleSetTypeToFind,
    handleSetQueryText,
  };
};
