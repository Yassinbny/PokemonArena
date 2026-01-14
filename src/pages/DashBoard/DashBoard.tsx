import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DashBoard = () => {
  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-zinc-750 mb-4 drop-shadow-lg">
            Welcome to Pokémon Arena!
          </h1>
          <p className="text-xl text-zinc-750/90">
            Build your team, battle other trainers, and conquer the Pokémon
            world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
          <div className=" backdrop-blur-md rounded-xl p-6 shadow-xl border border-zinc-750/30 hover:scale-105 transition-transform duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h2 className="text-2xl font-bold text-zinc-750 mb-2">
                Team Builder
              </h2>
              <p className="text-zinc-750/80 mb-4">
                Create and customize your Pokémon team for battles.
              </p>
              <Button
                asChild
                className="bg-red-500 hover:bg-red-600 text-zinc-750"
              >
                <Link to="/team-builder">Go to Builder</Link>
              </Button>
            </div>
          </div>
          <div className=" backdrop-blur-md rounded-xl p-6 shadow-xl border border-zinc-750/30 hover:scale-105 transition-transform duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <h2 className="text-2xl font-bold text-zinc-750 mb-2">
                My Teams
              </h2>
              <p className="text-zinc-750/80 mb-4">
                View and manage your created Pokémon teams.
              </p>
              <Button
                asChild
                className="bg-purple-500 hover:bg-purple-600 text-zinc-750"
              >
                <Link to="/teams">View Teams</Link>
              </Button>
            </div>
          </div>
          <div className=" backdrop-blur-md rounded-xl p-6 shadow-xl border border-zinc-750/30 hover:scale-105 transition-transform duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">⚔️</span>
              </div>
              <h2 className="text-2xl font-bold text-zinc-750 mb-2">
                Epic Battles
              </h2>
              <p className="text-zinc-750/80 mb-4">
                Face other trainers in intense battles.
              </p>
              <Button
                asChild
                className="bg-blue-500 hover:bg-blue-600 text-zinc-750"
              >
                <Link to="/battle">Start Battle</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-zinc-750/10 backdrop-blur-md rounded-xl p-8 shadow-xl border border-zinc-750/20">
            <h3 className="text-3xl font-bold text-zinc-750 mb-4">
              Capture the Victory!
            </h3>
            <p className="text-zinc-750/90 text-lg">
              Explore the Pokémon world, train your creatures, and become the
              best trainer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
