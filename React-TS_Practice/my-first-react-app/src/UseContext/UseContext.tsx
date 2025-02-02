import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export function UseContext() {
  const { theme, toggleTheme } = useContext(ThemeContext) as any;

  return (
    <>
      <h1
        style={
          theme === "light" ? { color: "lightgreen" } : { color: "darkgreen" }
        }
      >
        This is an example of UseContext
      </h1>
      <h2
        style={
          theme === "light" ? { color: "lightgreen" } : { color: "darkgreen" }
        }
      >
        here the theme change as we change
      </h2>
      <button
        style={
          theme === "light" ? { color: "lightgreen" } : { color: "darkgreen" }
        }
        onClick={toggleTheme}
      >
        {" "}
        Change Theme
      </button>
    </>
  );
}
