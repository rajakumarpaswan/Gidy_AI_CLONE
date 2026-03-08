import { ActionIcon } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {

  const { theme, toggleTheme } = useTheme();

  return (
    <ActionIcon onClick={toggleTheme} variant="outline" size="lg">

      {theme === "light" ? (
        <IconMoon size={18} />
      ) : (
        <IconSun size={18} />
      )}

    </ActionIcon>
  );
};

export default ThemeToggle;