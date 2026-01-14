import type { TeamState } from "@/store/teamStore";
interface PokemonFightListProps {
  team: TeamState;
  isWinner: boolean;
}

const PokemonFightList = ({ team, isWinner }: PokemonFightListProps) => {
  return (
    <div
      className={`w-full flex h-full flex-col justify-end items-center ${
        isWinner &&
        "animate-pulse-slow bg-yellow-200 border-yellow-400 border-2 rounded-lg p-2 bg-yellow-180"
      }`}
    >
      <p className="font-bold">Team {team.id}</p>
      {team.pokemons.map((pokemon) => (
        <div className="flex flex-row items-center w-full">
          <img
            key={pokemon.id}
            src={pokemon.image}
            alt={pokemon.name}
            className="w-18 h-18 contrast-125 sepia saturate-75 hue-rotate-60 animate-bounce-slow"
          />
          <div
            className={`border h-1 w-full border-green-800 ${
              pokemon.stats.hp && "bg-green-400"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default PokemonFightList;
