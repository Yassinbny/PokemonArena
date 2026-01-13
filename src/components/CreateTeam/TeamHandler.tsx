import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useCurrentTeam, useTeamStore } from "@/store/teamStore";
import { Button } from "../ui/button";
import { PokemonListed } from "../PokemonListed/PokemonListed";

const TeamHandler = () => {
  const currentTeamId = useTeamStore((state) => state.currentTeamId);
  const team = useCurrentTeam();
  const addTeam = useTeamStore((state) => state.addTeam);
  const reorderTeamPokemons = useTeamStore(
    (state) => state.reorderTeamPokemons
  );
  const removeFromTeam = useTeamStore((state) => state.removeFromTeam);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id && team) {
      const oldIndex = team.pokemons.findIndex((p) => p.id === active.id);
      const newIndex = team.pokemons.findIndex((p) => p.id === over.id);

      const newPokemons = arrayMove(team.pokemons, oldIndex, newIndex);
      reorderTeamPokemons(team.id, newPokemons);
    }
  }

  return (
    <div>
      <div className="flex flex-row justify-center">
        <Button
          className="mr-auto"
          onClick={() => addTeam({ pokemons: [], isDraft: true })}
        >
          Add New Team
        </Button>
        <h1 className="text-3xl mr-auto font-bold">
          Team {team ? team.id : "None"}
        </h1>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={team?.pokemons.map((p) => p.id) || []}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-5 mt-4">
            {team ? (
              team.pokemons.map((pokemon) => (
                <PokemonListed
                  key={pokemon.id}
                  pokemon={pokemon}
                  onRemove={() => {
                    if (currentTeamId) {
                      removeFromTeam(currentTeamId, pokemon.id);
                    } else {
                      console.log("No currentTeamId");
                    }
                  }}
                />
              ))
            ) : (
              <div>No team selected</div>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TeamHandler;
