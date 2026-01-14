import App from "@/App";
import BattlePage from "@/pages/BattlePage/BattlePage";
import DashBoard from "@/pages/DashBoard/DashBoard";
import TeamBuilder from "@/pages/TeamBuilder/TeamBuilder";
import Teams from "@/pages/Teams/Teams";
import type { RouteObject } from "react-router-dom";

const AppRoutes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <DashBoard /> },
      { path: "team-builder", element: <TeamBuilder /> },
      { path: "battle", element: <BattlePage /> },
      { path: "teams", element: <Teams /> },
    ],
  },
];

export default AppRoutes;
