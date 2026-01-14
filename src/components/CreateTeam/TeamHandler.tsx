import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "../ui/button";
import { PokemonListed } from "../PokemonListed/PokemonListed";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Shuffle } from "lucide-react";
import { useTeamHandler } from "./UseTeamHandler";

const TeamHandler = () => {
  const {
    currentTeamId,
    team,
    addTeam,
    handleDragEnd,
    handleSaveTeam,
    removeFromTeam,
    sensors,
    handlerOrder,
  } = useTeamHandler();

  return (
    <div>
      <div className="flex flex-row justify-center">
        <div className="flex gap-2 mr-auto">
          {" "}
          <Button
            className=" cursor-pointer"
            onClick={() => addTeam({ pokemons: [], isDraft: true })}
          >
            Add new team
          </Button>
          <Button
            disabled={!currentTeamId}
            onClick={handleSaveTeam}
            className="cursor-pointer"
          >
            Save team
          </Button>
          <Select
            disabled={!currentTeamId}
            onValueChange={(value) => handlerOrder(value)}
          >
            <SelectTrigger className="w-45 bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>{" "}
            <SelectContent>
              <SelectGroup>
                <SelectItem value="null">Order by</SelectItem>
                <SelectItem value="attack">Attack</SelectItem>
                <SelectItem value="speed">Speed</SelectItem>
                <SelectItem value="defense">Defense</SelectItem>
                <SelectItem value="hp">HP</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            className="cursor-pointer"
            onClick={() => handlerOrder("random")}
          >
            <Shuffle size={16} />
          </Button>
        </div>

        <h1 className="text-3xl mr-auto font-bold">
          {team && `Team ${team.id}`}
        </h1>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={team?.pokemons.map((p) => p.id) || []}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col  items-center gap-5 mt-4">
            {team ? (
              team.pokemons.map((pokemon) => (
                <PokemonListed
                  key={pokemon.id}
                  pokemon={pokemon}
                  onRemove={() => {
                    if (currentTeamId) {
                      removeFromTeam(currentTeamId, pokemon.id);
                    } else {
                      console.log("No currentTeamId");
                    }
                  }}
                />
              ))
            ) : (
              <div className="flex rounded-md p-4 bg-white font-bold w-fit border-2 justify-center items-center">
                No team selected{" "}
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TeamHandler;
