import { useBattlePage } from "@/pages/BattlePage/useBattlePage";
import PokemonFightList from "../PokemonFightList/PokemonFightList";

const GameBoyContent = () => {
  const {
    teams,
    teamA,
    teamB,
    battleStarted,
    winner,
    remainingPokemonsA,
    remainingPokemonsB,
    selectedTeamA,
    selectedTeamB,
    startBattle,
    fightUtil,
    handleSelectTeam,
    resetBattle,
  } = useBattlePage();
  return (
    <>
      {" "}
      {!battleStarted ? (
        <div className="flex flex-col gap-6 items-center">
          <h1 className="text-2xl text-center mb-4 drop-shadow-[2px_2px_0px_#0f380f]">
            POKEMON ARENA
          </h1>

          <div className="flex flex-row justify-evenly items-center gap-4 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-xl">TEAM A:</label>
              <select
                value={teamA || ""}
                name="teamA"
                title="teamA"
                onChange={(e) => {
                  handleSelectTeam(Number(e.target.value), "A");
                }}
                className="bg-[#0f380f] text-[#9bbc0f] border-2 border-[#0f380f] p-3 font-['Press_Start_2P'] text-xs cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-[#306230]"
              >
                <option value="default">SELECT</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    TEAM {team.id} ({team.pokemons.length})
                  </option>
                ))}
              </select>
            </div>
            <span className="text-3xl">VS</span>
            <div className="flex flex-col gap-2">
              <label className="text-xl">TEAM B:</label>
              <select
                title="teamB"
                value={teamB || ""}
                onChange={(e) => {
                  handleSelectTeam(Number(e.target.value), "B");
                }}
                className="bg-[#0f380f] text-[#9bbc0f] border-2 border-[#0f380f] p-3 font-['Press_Start_2P'] text-xs cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-[#306230]"
              >
                <option value="default">SELECT</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    TEAM {team.id} ({team.pokemons.length})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={startBattle}
            className="bg-[#0f380f] text-[#9bbc0f] border-4 border-[#0f380f] px-8 py-4 font-['Press_Start_2P'] text-sm cursor-pointer rounded-lg shadow-[0_4px_0_#071c07] hover:bg-[#306230] active:translate-y-0.5 active:shadow-[0_2px_0_#071c07] mt-4 animate-pulse-slow"
          >
            START BATTLE
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-8 ">
            {!winner ? (
              <div className="flex gap-4 justify-between  ">
                {selectedTeamA && (
                  <PokemonFightList team={selectedTeamA} isWinner={false} />
                )}
                {selectedTeamB && (
                  <PokemonFightList team={selectedTeamB} isWinner={false} />
                )}
              </div>
            ) : (
              <div className="flex gap-2  ">
                {remainingPokemonsA && (
                  <PokemonFightList
                    team={remainingPokemonsA}
                    isWinner={winner === "Team A"}
                  />
                )}
                {winner && (
                  <h4 className="font-bold text-yellow-400 text-xl animate-bounce my-auto ">
                    Winner: {winner}
                  </h4>
                )}{" "}
                {remainingPokemonsB && (
                  <PokemonFightList
                    team={remainingPokemonsB}
                    isWinner={winner === "Team B"}
                  />
                )}
              </div>
            )}
          </div>

          {!winner ? (
            <button
              onClick={() =>
                fightUtil({
                  teamA: selectedTeamA!,
                  teamB: selectedTeamB!,
                })
              }
              className="bg-[#0f380f] text-[#9bbc0f] border-4 border-[#0f380f]  py-2 font-['Press_Start_2P'] text-sm cursor-pointer rounded-lg shadow-[0_4px_0_#071c07] hover:bg-[#306230] active:translate-y-0.5 active:shadow-[0_2px_0_#071c07] animate-pulse-slow"
            >
              FIGHT!
            </button>
          ) : (
            <button
              onClick={resetBattle}
              className="bg-[#0f380f] text-[#9bbc0f] border-4 border-[#0f380f] px-8 py-2 font-['Press_Start_2P'] text-sm cursor-pointer rounded-lg shadow-[0_4px_0_#071c07] hover:bg-[#306230] active:translate-y-0.5 active:shadow-[0_2px_0_#071c07]"
            >
              BACK
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default GameBoyContent;
