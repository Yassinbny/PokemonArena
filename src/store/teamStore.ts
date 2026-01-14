import { create } from "zustand";
import { persist } from "zustand/middleware";
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
  saveTeam: (id: number) => void;
  addToTeam: (id: number, pokemon: Pokemon, isDraft: boolean) => void;
  removeTeam: (id: number) => void;
  setCurrentTeamId: (id: number) => void;
  removeFromTeam: (teamId: number, pokemonId: number) => void;
  reorderTeamPokemons: (teamId: number, newPokemons: Pokemon[]) => void;
}

export const useTeamStore = create<TeamStore>()(
  persist(
    (set) => ({
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
      saveTeam: (id) =>
        set((state) => {
          return {
            teams: state.teams.map((t) =>
              t.id === id ? { ...t, isDraft: false } : t
            ),
          };
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
      removeTeam: (id) =>
        set((state) => ({
          teams: state.teams.filter((team) => team.id !== id),
        })),
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
    }),
    {
      name: "team-store",
      version: 1,
      partialize: (state) => ({
        teams: state.teams,
      }),
    }
  )
);

export const useCurrentTeam = () =>
  useTeamStore((state) =>
    state.teams.find((t) => t.id === state.currentTeamId)
  );
