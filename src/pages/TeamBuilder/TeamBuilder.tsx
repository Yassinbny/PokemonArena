import TeamHandler from "@/components/CreateTeam/TeamHandler";
import PokemonCard from "@/components/PokemonCard/PokemonCard";
import TeamBuilderHeader from "@/components/TeamBuilderHeader/TeamBuilderHeader";
import { Button } from "@/components/ui/button";

import { useTeamBuilder } from "@/hooks/useTeamBuilder";
import { useCurrentTeam } from "@/store/teamStore";

const TeamBuilder = () => {
  const {
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
  } = useTeamBuilder();

  const currentTeam = useCurrentTeam();
  const isFullTeam = currentTeam ? currentTeam.pokemons.length >= 6 : false;
  const renderContent = () => {
    if (pokemonByName) {
      return <PokemonCard name={pokemonByName.name} />;
    }
    if (pokemonsByTypes) {
      return pokemonsByTypes
        ?.slice(offSet, offSet + 9)
        .map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} />
        ));
    }
    if (isError && debouncedQueryText) {
      return <div>Pokemon not found</div>;
    }
    return allPokemons?.results
      ?.slice(offSet, offSet + 9)
      .map((pokemon) => <PokemonCard key={pokemon.name} name={pokemon.name} />);
  };

  return (
    <div className="grid grid-cols-2 gap-5 h-full">
      <div>
        <TeamBuilderHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {renderContent()}
        </div>
        <div className="flex justify-between mt-5 gap-2">
          <Button disabled={!canLoadPrevious} onClick={loadPrevious}>
            load Previous
          </Button>
          {isFullTeam && (
            <div className="text-red-500 bg-red-100 p-2 rounded-lg w-full text-center">
              Team is already full (6 Pokemons)
            </div>
          )}
          <Button disabled={!canLoadMore} onClick={loadMore}>
            Load More
          </Button>
        </div>
      </div>{" "}
      <TeamHandler />
    </div>
  );
};

export default TeamBuilder;
