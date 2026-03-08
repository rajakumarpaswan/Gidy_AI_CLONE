import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function MantineTheme({ children }: { children: React.ReactNode }) {

  const { theme } = useTheme();

  return (
    <MantineProvider
      forceColorScheme={theme}
      defaultColorScheme="light"
    >
      {children}
    </MantineProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <MantineTheme>
        <App />
      </MantineTheme>
    </ThemeProvider>
  </StrictMode>,
);
