import React from "react";
import { Button } from "@mui/material";
import MainContainer from "./components/main/MainContainer";
import ApplicationProvider from "./contexts/ApplicationProvider";
import KeycloakProvider from "./contexts/KeycloakProvider";

export default function App() {
  return (
    <KeycloakProvider>
      <ApplicationProvider>
        <MainContainer>
          <Button>Hello</Button>
        </MainContainer>
      </ApplicationProvider>
    </KeycloakProvider>
  );
}
