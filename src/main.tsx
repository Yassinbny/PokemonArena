import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import "@/index.css";
import ToastComponent from "./components/ToastComponent/ToastComponent";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ToastComponent />
    <RouterProvider router={router} />
  </QueryClientProvider>
);
