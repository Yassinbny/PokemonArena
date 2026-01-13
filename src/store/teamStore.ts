import { create } from "zustand";
import type { Pokemon } from "@/types/pokemon";

export type TeamState = {
  id: number;
  pokemons: Pokemon[];
  isDraft: boolean;
};

interface TeamStore {
  teams: TeamState[];
  currentTeamId: number | null;
  addTeam: (team: Omit<TeamState, "id">) => void;
  addToTeam: (id: number, pokemon: Pokemon, isDraft: boolean) => void;
  setCurrentTeamId: (id: number) => void;
  removeFromTeam: (teamId: number, pokemonId: number) => void;
  reorderTeamPokemons: (teamId: number, newPokemons: Pokemon[]) => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
  teams: [],
  currentTeamId: null,
  addTeam: (team) =>
    set((state) => {
      const id = state.teams.length + 1;
      const newTeam = {
        id: id,
        pokemons: team.pokemons,
        isDraft: team.isDraft,
      };
      return { teams: [...state.teams, newTeam], currentTeamId: id };
    }),
  addToTeam: (id, pokemon, isDraft) =>
    set((state) => {
      const team = state.teams.find((t) => t.id === id);
      if (
        !team ||
        team.pokemons.some((p) => p.id === pokemon.id) ||
        team.pokemons.length >= 6
      ) {
        return state;
      }
      return {
        teams: state.teams.map((t) =>
          t.id === id
            ? { ...t, pokemons: [...t.pokemons, pokemon], isDraft }
            : t
        ),
      };
    }),
  setCurrentTeamId: (id) => set(() => ({ currentTeamId: id })),
  removeFromTeam: (teamId, pokemonId) => {
    set((state) => {
      const newTeams = state.teams.map((team) =>
        team.id === teamId
          ? {
              ...team,
              pokemons: team.pokemons.filter((p) => {
                return p.id !== pokemonId;
              }),
            }
          : team
      );
      return { teams: newTeams };
    });
  },
  reorderTeamPokemons: (teamId, newPokemons) =>
    set((state) => ({
      teams: state.teams.map((team) =>
        team.id === teamId ? { ...team, pokemons: newPokemons } : team
      ),
    })),
}));

export const useCurrentTeam = () =>
  useTeamStore((state) =>
    state.teams.find((t) => t.id === state.currentTeamId)
  );
