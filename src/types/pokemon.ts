export type ResultPayload = {
  name: string;
  url: string;
};

export interface PokemonListResponse {
  count: number;
  next: string;
  results: ResultPayload[];
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  stats: {
    attack: number;
    defense: number;
    speed: number;
    hp: number;
  };
}

export interface PokemonDetailResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

export interface PokemonTypeResponse {
  pokemon: { pokemon: ResultPayload }[];
}
