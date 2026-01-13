import { fetchPokemonTypes } from "@/api/pokemon";
import { useQuery } from "@tanstack/react-query";
import { Input } from "../ui/input";
import {
  SelectItem,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
} from "../ui/select";
import { useSearchStore } from "@/store/SearchStore";

const TeamBuilderHeader = () => {
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
  return (
    <div className="flex flex-row gap-3 mb-5">
      {" "}
      <Input
        type="text"
        value={queryText}
        placeholder="Search Pokemons..."
        onChange={(e) => handleSetQueryText(e.target.value)}
      />
      <Select
        onValueChange={(value) => handleSetTypeToFind(value)}
        value={typeToFind}
      >
        <SelectTrigger className="w-45 bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200">
          <SelectValue placeholder="Select a type" />
        </SelectTrigger>{" "}
        <SelectContent>
          <SelectGroup>
            <SelectItem value="null">All Types</SelectItem>
            {types?.map((t) => (
              <SelectItem value={t} key={t}>
                {t}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TeamBuilderHeader;
