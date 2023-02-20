import React from "react";
import { useApplicationContext } from "../../../contexts/ApplicationProvider";
import { lightTheme } from "./themes/light";
import { darkTheme } from "./themes/dark";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import ApplicationBar from "../ApplicationBar";
import componentStyleOverrides from "./themes/compStyleOverride";
import { ToastContainer } from "react-toastify";
import toastContainerConfig from "@common/config/toastContainerConfig";

interface IMainContainer {
  children: React.ReactNode;
}

const MainContainer = ({ children }: IMainContainer) => {
  const { theme } = useApplicationContext();
  const muiTheme = createTheme(theme === "light" ? lightTheme : darkTheme);
  muiTheme.components = componentStyleOverrides(muiTheme);

  return (
    <BrowserRouter>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <ApplicationBar />

        {children}
        <ToastContainer {...toastContainerConfig} />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default MainContainer;
