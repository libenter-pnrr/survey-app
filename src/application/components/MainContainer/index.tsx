import React from "react";
import { useApplicationContext } from "../../../contexts/ApplicationProvider";
import { lightTheme } from "./themes/light";
import { darkTheme } from "./themes/dark";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import Routing from "../../../common/Routing";
import ApplicationBar from "../ApplicationBar";

interface IMainContainer {
  children: React.ReactNode;
}

const MainContainer = ({ children }: IMainContainer) => {
  const { theme } = useApplicationContext();
  const muiTheme = createTheme(theme === "light" ? lightTheme : darkTheme);

  return (
    <BrowserRouter>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <ApplicationBar />

        {children}
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default MainContainer;
