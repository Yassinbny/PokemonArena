import { NavLink } from "react-router-dom";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-blue-300">
      <div className="h-full flex flex-col">
        <nav className="p-2 bg-black backdrop-blur-sm shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center ">
            <div className="flex items-center gap-2">
              <img
                src="images/pokeball.svg"
                alt="Pokemon Ball"
                className="w-6 h-6"
              />
              <h1 className="text-2xl font-bold text-white ">Pokémon Arena</h1>
            </div>

            <div className="flex gap-6 ml-auto">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                      : "text-white hover:text-blue-600 hover:bg-blue-50"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/team-builder"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                      : "text-white hover:text-red-600 hover:bg-red-50"
                  }`
                }
              >
                Team Builder
              </NavLink>
              <NavLink
                to="/teams"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg"
                      : "text-white hover:text-yellow-600 hover:bg-yellow-50"
                  }`
                }
              >
                Teams
              </NavLink>
              <NavLink
                to="/battle"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                      : "text-white hover:text-green-600 hover:bg-green-50"
                  }`
                }
              >
                Battle
              </NavLink>
            </div>
          </div>
        </nav>

        <main className="flex-1 p-2 w-full">
          <div className="bg-zinc-300/60 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-2 w-full mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
