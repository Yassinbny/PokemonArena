import { Check, PlusIcon } from "lucide-react";
import { usePokemon } from "@/hooks/usePokemon";
import { Button } from "../ui/button";
import { useCurrentTeam, useTeamStore } from "@/store/teamStore";

const PokemonCard = ({ name }: { name: string }) => {
  const currentTeamId = useTeamStore((state) => state.currentTeamId);
  const addToTeam = useTeamStore((state) => state.addToTeam);
  const currentTeam = useCurrentTeam();
  const { data, isLoading, error } = usePokemon(name);
  const isOnCurrentTeam = currentTeam?.pokemons.some(
    (pokemon) => pokemon.name === name
  );
  if (isLoading) {
    return (
      <div
        data-testid="loading-container"
        className="bg-white rounded-lg shadow-lg py-4 px-2 w-full mx-auto flex flex-row gap-2 animate-pulse"
      >
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-300 rounded-full border-2 border-gray-200 mb-1"></div>
          <div className="h-3 bg-gray-300 rounded w-12"></div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="grid grid-cols-2 gap-1 mb-1">
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
          </div>
          <div className="flex gap-1 mb-1">
            <div className="h-4 bg-gray-300 rounded px-1.5 py-0.5 w-10"></div>
            <div className="h-4 bg-gray-300 rounded px-1.5 py-0.5 w-8"></div>
          </div>
          <div className="h-6 bg-gray-300 rounded w-full mt-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-600">Error loading Pokémon</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div
      className={`${
        isOnCurrentTeam && "border-2 border-green-500"
      }  rounded-lg backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow duration-300 py-4 px-2 w-full mx-auto`}
    >
      <div className="flex flex-row justify-between items-center">
        {" "}
        <img
          data-testid="pokemon-image"
          src={data.image}
          alt={data.name}
          className="size-20  border-gray-200"
        />
        {isOnCurrentTeam ? (
          <div className="flex items-center justify-center h-10 w-10 rounded-full py-1 bg-green-100">
            <Check className="text-green-600  size-7" />
          </div>
        ) : (
          <Button
            disabled={!currentTeamId}
            onClick={() => addToTeam(currentTeamId!, data, true)}
            className="cursor-pointer h-10 w-10 rounded-full"
          >
            <PlusIcon className="size-7 " />{" "}
          </Button>
        )}
      </div>

      <div className="flex p-2 flex-col justify-between">
        <div className="grid grid-cols-2">
          {" "}
          <div className="grid grid-cols-2 gap-1 mb-1">
            <div className="text-center">
              <p className="text-xs text-gray-600">Attack</p>
              <p className="font-semibold text-gray-800 text-sm">
                {data.stats.attack}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600">Defense</p>
              <p className="font-semibold text-gray-800 text-sm">
                {data.stats.defense}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600">Speed</p>
              <p className="font-semibold text-gray-800 text-sm">
                {data.stats.speed}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600">HP</p>
              <p className="font-semibold text-gray-800 text-sm">
                {data.stats.hp}
              </p>
            </div>
          </div>
          <div className="grid text-center items-center justify-center mb-1">
            <h3 className="text-sm font-bold capitalize text-gray-800 text-center">
              {data.name}
            </h3>
            {data.types.map((type) => (
              <span
                key={type}
                className="px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium capitalize"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
