import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import PokemonCard from "./PokemonCard";
import {
  QueryClient,
  QueryClientProvider,
  type UseQueryResult,
} from "@tanstack/react-query";
import "@testing-library/jest-dom";
import type { Pokemon } from "@/types/pokemon";

vi.mock("@/hooks/usePokemon", () => ({
  usePokemon: vi.fn(),
}));

vi.mock("@/store/teamStore", () => ({
  useTeamStore: vi.fn(),
  useCurrentTeam: vi.fn(),
}));

import { usePokemon } from "@/hooks/usePokemon";
import { useTeamStore, useCurrentTeam } from "@/store/teamStore";

const mockUsePokemon = vi.mocked(usePokemon);
const mockUseTeamStore = vi.mocked(useTeamStore);
const mockUseCurrentTeam = vi.mocked(useCurrentTeam);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("PokemonCard - Basic Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseTeamStore.mockReturnValue({
      currentTeamId: 1,
      addToTeam: vi.fn(),
    });
    mockUseCurrentTeam.mockReturnValue({
      id: 1,
      pokemons: [],
      isDraft: false,
    });
  });

  it("should display loading state", () => {
    mockUsePokemon.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as Partial<UseQueryResult<Pokemon, Error>> as UseQueryResult<Pokemon, Error>);

    const { getByTestId } = render(<PokemonCard name="pikachu" />, {
      wrapper: createWrapper(),
    });
    screen.debug();
    const loadingElement = getByTestId("loading-container");
    expect(loadingElement).toHaveClass("animate-pulse");
  });

  it("should display error message when loading fails", () => {
    mockUsePokemon.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error("Failed to fetch"),
    } as Partial<UseQueryResult<Pokemon, Error>> as UseQueryResult<Pokemon, Error>);

    render(<PokemonCard name="pikachu" />, { wrapper: createWrapper() });

    expect(screen.getByText("Error loading Pokémon")).toBeInTheDocument();
  });

  it("should display pokemon data correctly", () => {
    const mockPokemon = {
      id: 25,
      name: "pikachu",
      image: "https://example.com/pikachu.png",
      types: ["electric"],
      stats: { attack: 55, defense: 40, speed: 90, hp: 35 },
    };

    mockUsePokemon.mockReturnValue({
      data: mockPokemon,
      isLoading: false,
      isError: false,
      error: null,
    } as Partial<UseQueryResult<Pokemon, Error>> as UseQueryResult<Pokemon, Error>);

    render(<PokemonCard name="pikachu" />, { wrapper: createWrapper() });

    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.getByText("55")).toBeInTheDocument();
    expect(screen.getByText("electric")).toBeInTheDocument();
  });
});
