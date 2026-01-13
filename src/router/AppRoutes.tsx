import App from "@/App";
import DashBoard from "@/pages/DashBoard/DashBoard";
import TeamBuilder from "@/pages/TeamBuilder/TeamBuilder";
import type { RouteObject } from "react-router-dom";

const AppRoutes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <DashBoard /> },
      { path: "team-builder", element: <TeamBuilder /> },
    ],
  },
];

export default AppRoutes;
