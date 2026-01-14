import { describe, it, expect, beforeEach } from "vitest";
import { useTeamStore } from "./teamStore";
import type { Pokemon } from "@/types/pokemon";

describe("TeamStore - Basic Tests", () => {
  const createMockPokemon = (id: number, name: string): Pokemon => ({
    id,
    name,
    image: `https://example.com/${name}.png`,
    types: ["normal"],
    stats: { attack: 50, defense: 50, speed: 50, hp: 50 },
  });

  beforeEach(() => {
    useTeamStore.setState({ teams: [], currentTeamId: null });
  });

  it("should add a new team to the store", () => {
    const newTeam = {
      pokemons: [createMockPokemon(1, "pikachu")],
      isDraft: true,
    };

    useTeamStore.getState().addTeam(newTeam);

    const state = useTeamStore.getState();
    expect(state.teams).toHaveLength(1);
    expect(state.teams[0].id).toBe(1);
    expect(state.currentTeamId).toBe(1);
  });

  it("should add a pokemon to a team", () => {
    useTeamStore.getState().addTeam({ pokemons: [], isDraft: true });
    const pokemon = createMockPokemon(25, "pikachu");

    useTeamStore.getState().addToTeam(1, pokemon, true);

    const state = useTeamStore.getState();
    expect(state.teams[0].pokemons).toHaveLength(1);
    expect(state.teams[0].pokemons[0].name).toBe("pikachu");
  });

  it("should not add more than 6 pokemon to a team", () => {
    useTeamStore.getState().addTeam({ pokemons: [], isDraft: true });

    for (let i = 1; i <= 7; i++) {
      useTeamStore
        .getState()
        .addToTeam(1, createMockPokemon(i, `pokemon${i}`), true);
    }

    const state = useTeamStore.getState();
    expect(state.teams[0].pokemons).toHaveLength(6);
  });

  it("should remove a pokemon from a team", () => {
    useTeamStore.getState().addTeam({ pokemons: [], isDraft: true });
    const pokemon1 = createMockPokemon(1, "pikachu");
    const pokemon2 = createMockPokemon(2, "charizard");
    useTeamStore.getState().addToTeam(1, pokemon1, true);
    useTeamStore.getState().addToTeam(1, pokemon2, true);

    useTeamStore.getState().removeFromTeam(1, 1);

    const state = useTeamStore.getState();
    expect(state.teams[0].pokemons).toHaveLength(1);
    expect(state.teams[0].pokemons[0].name).toBe("charizard");
  });

  it("should save a team by changing isDraft to false", () => {
    useTeamStore.getState().addTeam({ pokemons: [], isDraft: true });

    useTeamStore.getState().saveTeam(1);

    const state = useTeamStore.getState();
    expect(state.teams[0].isDraft).toBe(false);
  });
});
