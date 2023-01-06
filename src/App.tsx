import React from "react";
import MainContainer from "./application/components/MainContainer";
import ApplicationProvider from "./contexts/ApplicationProvider";
import KeycloakProvider from "./contexts/KeycloakProvider";
import Routing from "@common/Routing";

export default function App() {
  return (
    <KeycloakProvider>
      <ApplicationProvider>
        <MainContainer>
          <Routing />
        </MainContainer>
      </ApplicationProvider>
    </KeycloakProvider>
  );
}
