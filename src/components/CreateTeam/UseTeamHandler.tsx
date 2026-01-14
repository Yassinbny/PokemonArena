import { useTeamStore, useCurrentTeam } from "@/store/teamStore";
import type { StatsType } from "@/types/pokemon";
import { shuffle } from "@/utils/ShuffelUtil";
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  type DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { toast } from "react-toastify";

export const useTeamHandler = () => {
  const currentTeamId = useTeamStore((state) => state.currentTeamId);

  const team = useCurrentTeam();

  const addTeam = useTeamStore((state) => state.addTeam);

  const reorderTeamPokemons = useTeamStore(
    (state) => state.reorderTeamPokemons
  );

  const setCurrentTeamId = useTeamStore((state) => state.setCurrentTeamId);

  const removeFromTeam = useTeamStore((state) => state.removeFromTeam);

  const saveTeam = useTeamStore((state) => state.saveTeam);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handlerOrder = (key: string) => {
    if (!team || key === "null") return;
    const validStatKeys: (keyof StatsType)[] = [
      "attack",
      "defense",
      "speed",
      "hp",
    ];

    if (validStatKeys.includes(key as keyof StatsType)) {
      const sortedTeamByKey = team.pokemons.sort(
        (a, b) =>
          b.stats[key as keyof StatsType] - a.stats[key as keyof StatsType]
      );

      reorderTeamPokemons(team.id, sortedTeamByKey);
      return;
    } else if (key === "random") {
      const shuffledTeam = shuffle(team.pokemons);

      reorderTeamPokemons(team.id, shuffledTeam);
      return;
    }
  };

  function handleSaveTeam() {
    if (!currentTeamId) return;
    if (!team || team.pokemons.length === 0) {
      toast.error("Cannot save an empty team!");
      return;
    }
    saveTeam(currentTeamId);

    setCurrentTeamId(0);
    toast.success("Team saved successfully!");
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id && team) {
      const oldIndex = team.pokemons.findIndex((p) => p.id === active.id);
      const newIndex = team.pokemons.findIndex((p) => p.id === over.id);

      const newPokemons = arrayMove(team.pokemons, oldIndex, newIndex);
      reorderTeamPokemons(team.id, newPokemons);
    }
  }
  return {
    currentTeamId,
    team,
    addTeam,
    handleDragEnd,
    handleSaveTeam,
    removeFromTeam,
    sensors,
    handlerOrder,
  };
};
