// Use Context is used when the props are supposed to be passed to multiple children on multi-levels
// To avoid prop-drilling (props from parent component to child component)

import { createContext, useState } from "react";

export const ThemeContext: any = createContext("light");

export function ThemeProvider({ children }: any) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
}
