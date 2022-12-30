import React from "react";
import { useApplicationContext } from "../../contexts/ApplicationProvider";
import { lightTheme } from "./themes/light";
import { darkTheme } from "./themes/dark";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

interface IMainContainer {
  children: React.ReactNode;
}

const MainContainer = ({ children }: IMainContainer) => {
  const { theme } = useApplicationContext();
  const muiTheme = createTheme(theme === "light" ? lightTheme : darkTheme);
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />

      {children}
    </ThemeProvider>
  );
};

export default MainContainer;
