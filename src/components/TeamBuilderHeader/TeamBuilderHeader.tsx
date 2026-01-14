import { Input } from "../ui/input";
import {
  SelectItem,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
} from "../ui/select";
import { useTeamBuilderHeader } from "./useTeamBuilderHeader";

const TeamBuilderHeader = () => {
  const {
    types,
    typeToFind,
    queryText,
    handleSetTypeToFind,
    handleSetQueryText,
  } = useTeamBuilderHeader();
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
