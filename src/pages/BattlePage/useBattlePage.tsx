import { useState, useMemo } from "react";
import { useTeamStore, type TeamState } from "@/store/teamStore";
import { toast } from "react-toastify";
import { useBattleStore } from "@/store/BattlesStore";

interface FightUtilParams {
  teamA: TeamState;
  teamB: TeamState;
}

export const useBattlePage = () => {
  const allTeams = useTeamStore((state) => state.teams);
  const teams = useMemo(() => allTeams.filter((t) => !t.isDraft), [allTeams]);
  const [teamA, setTeamA] = useState<number | null>(null);
  const [teamB, setTeamB] = useState<number | null>(null);
  const [battleStarted, setBattleStarted] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [remainingPokemonsA, setremainingPokemonsA] =
    useState<TeamState | null>(null);
  const [remainingPokemonsB, setremainingPokemonsB] =
    useState<TeamState | null>(null);
  const setLogsMessages = useBattleStore((state) => state.setLogs);
  const selectedTeamA = teams.find((t) => t.id === teamA);
  const selectedTeamB = teams.find((t) => t.id === teamB);

  const startBattle = () => {
    if (!selectedTeamA || !selectedTeamB) {
      toast.warning("Select both teams!");
      return;
    }

    setBattleStarted(true);
  };

  const fightUtil = ({ teamA, teamB }: FightUtilParams) => {
    if (teamA.pokemons.length === 0 || teamB.pokemons.length === 0) {
      return;
    }

    const pokemonsA = teamA.pokemons.map((p) => ({
      ...p,
      stats: { ...p.stats },
    }));
    const pokemonsB = teamB.pokemons.map((p) => ({
      ...p,
      stats: { ...p.stats },
    }));

    let indexA = 0;
    let indexB = 0;
    const logs: string[] = [];

    while (indexA < pokemonsA.length && indexB < pokemonsB.length) {
      const pokemonA = pokemonsA[indexA];
      const pokemonB = pokemonsB[indexB];
      const faster =
        pokemonA.stats.speed > pokemonB.stats.speed ? pokemonA : pokemonB;
      const slower = faster === pokemonA ? pokemonB : pokemonA;

      let loser;

      if (faster.stats.attack > slower.stats.defense) {
        loser = slower;
      } else if (slower.stats.attack > faster.stats.defense) {
        loser = faster;
      } else {
        loser = slower;
      }

      const winner = loser === pokemonA ? pokemonB : pokemonA;

      logs.push(
        `${winner.name} wins against ${loser.name} in round ${
          indexA + indexB + 1
        }!`
      );

      loser.stats.hp = 0;

      if (loser === pokemonB) {
        indexB++;
      } else {
        indexA++;
      }
    }

    const finalWinner = indexA < pokemonsA.length ? "Team A" : "Team B";

    setWinner(finalWinner);
    setLogsMessages(logs);
    setremainingPokemonsA({
      id: teamA.id,
      pokemons: pokemonsA,
      isDraft: teamA.isDraft,
    });
    setremainingPokemonsB({
      id: teamB.id,
      pokemons: pokemonsB,
      isDraft: teamB.isDraft,
    });

    return {
      winner: finalWinner,
      remainingPokemonsA: pokemonsA,
      remainingPokemonsB: pokemonsB,
    };
  };

  const handleSelectTeam = (teamId: number, teamLabel: "A" | "B") => {
    if (teamLabel === "A") {
      if (teamId === teamB) {
        toast.error("Cannot select the same team!");
        return;
      }
      setTeamA(teamId);
    } else {
      if (teamId === teamA) {
        toast.error("Cannot select the same team!");
        return;
      }
      setTeamB(teamId);
    }
  };

  const resetBattle = () => {
    setBattleStarted(false);
    setTeamA(null);
    setTeamB(null);
    setWinner(null);
    setremainingPokemonsA(null);
    setremainingPokemonsB(null);
  };

  return {
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
  };
};
