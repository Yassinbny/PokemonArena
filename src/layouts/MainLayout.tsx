import { NavLink } from "react-router-dom";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-gray-100">
      <div className="h-full flex flex-col">
        <nav className="p-2 border-b-2 border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center ">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                Pokémon Arena
              </h1>
            </div>

            <div className="flex gap-6 ml-auto">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
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
                      : "text-gray-700 hover:text-red-600 hover:bg-red-50"
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
                      : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                  }`
                }
              >
                Battle
              </NavLink>
            </div>
          </div>
        </nav>

        <main className="flex-1 p-2 w-full">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-2 max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
