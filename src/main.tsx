import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "animate.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/route.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.ts";
import { ThemeProvider } from "./providers/theme.provider.tsx";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <AuthProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <Toaster richColors />
        </ThemeProvider>
      </AuthProvider>
    </ReduxProvider>
  </React.StrictMode>
);
