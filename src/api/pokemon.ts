import type {
  Pokemon,
  PokemonListResponse,
  PokemonDetailResponse,
  PokemonTypeResponse,
} from "@/types/pokemon";
import { callApi } from "./client";

const apiUrl = import.meta.env.VITE_POKEMON_API_URL;
export const GetAllPokemons = (params: string) => {
  const data = callApi<PokemonListResponse>(`${apiUrl}/pokemon?${params}`);
  return data;
};

export const GetPokemonByName = async (name: string): Promise<Pokemon> => {
  const data = await callApi<PokemonDetailResponse>(
    `${apiUrl}/pokemon/${name}`
  );

  const pokemon: Pokemon = {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
    types: data.types.map((typeInfo) => typeInfo.type.name),
    stats: {
      attack: data.stats.find((statInfo) => statInfo.stat.name === "attack")!
        .base_stat,
      defense: data.stats.find((statInfo) => statInfo.stat.name === "defense")!
        .base_stat,
      speed: data.stats.find((statInfo) => statInfo.stat.name === "speed")!
        .base_stat,
      hp: data.stats.find((statInfo) => statInfo.stat.name === "hp")!.base_stat,
    },
  };

  return pokemon;
};

export async function fetchPokemonTypes() {
  const data = await callApi<PokemonListResponse>(`${apiUrl}/type`);

  return data.results
    .map((t: { name: string }) => t.name)
    .filter((name: string) => name !== "shadow" && name !== "unknown");
}

export async function fetchPokemonsByType(type: string, params: string) {
  const data = await callApi<PokemonTypeResponse>(
    `${apiUrl}/type/${type}?${params}`
  );

  return data.pokemon.map((p) => ({
    name: p.pokemon.name,
    url: p.pokemon.url,
  }));
}
