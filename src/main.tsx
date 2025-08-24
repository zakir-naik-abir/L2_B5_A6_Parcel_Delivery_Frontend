import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "animate.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/route.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.ts";
// import { ThemeProvider } from "./providers/theme.provider.tsx";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <Toaster richColors />
        </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>
);
