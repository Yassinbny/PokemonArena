import { useMemo } from "react";
import { useTeamStore } from "@/store/teamStore";
import TeamCard from "@/components/TeamCard/TeamCard";

const Teams = () => {
  const teams = useTeamStore((state) => state.teams);
  const teamsInDraft = useMemo(
    () => teams.filter((team) => team.isDraft),
    [teams]
  );
  const savedTeams = useMemo(
    () => teams.filter((team) => !team.isDraft),
    [teams]
  );

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto  bg-opacity-90 rounded-lg shadow-2xl p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Pokémon Teams
        </h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Draft Teams
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto max-h-30">
            {teamsInDraft.length > 0 ? (
              teamsInDraft.map((team) => <TeamCard key={team.id} team={team} />)
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No draft teams.
              </p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            Saved Teams
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto max-h-90">
            {savedTeams.length > 0 ? (
              savedTeams.map((team) => <TeamCard key={team.id} team={team} />)
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No saved teams.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
