import { useTeamStore, type TeamState } from "@/store/teamStore";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Pencil, Trash } from "lucide-react";
interface TeamCardProps {
  team: TeamState;
}
const TeamCard = ({ team }: TeamCardProps) => {
  const navigate = useNavigate();
  const setCurrentTeamId = useTeamStore((state) => state.setCurrentTeamId);
  const deleteTeam = useTeamStore((state) => state.removeTeam);
  const handleEditTeam = () => {
    setCurrentTeamId(team.id);
    navigate("/team-builder");
  };
  const handleDeleteTeam = () => {
    deleteTeam(team.id);
  };
  return (
    <div
      key={team.id}
      className={`border grid grid-cols-2 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200 ${
        team.isDraft
          ? "border-blue-300 bg-blue-100"
          : "border-green-300 bg-green-100"
      }`}
    >
      <div className="flex flex-col">
        {" "}
        <h3
          className={`text-lg font-medium ${
            team.isDraft ? "text-blue-800" : "text-green-800"
          } mb-2`}
        >
          Team {team.id}
        </h3>
        <p className="text-gray-700">{team.pokemons.length} Pokémon</p>
      </div>

      <div className="flex flex-col justify-center items-end gap-2">
        {" "}
        <Button
          className={` cursor-pointer ${
            team.isDraft
              ? "bg-blue-500 hover:bg-blue-300"
              : "bg-green-500 hover:bg-green-300"
          }`}
          onClick={handleEditTeam}
        >
          <Pencil size={16} />{" "}
        </Button>
        <Button
          className="ml-2 bg-red-500 hover:bg-red-300 cursor-pointer"
          onClick={handleDeleteTeam}
        >
          <Trash size={16} />
        </Button>
      </div>
    </div>
  );
};

export default TeamCard;
