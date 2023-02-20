import React from "react";
import MainContainer from "./application/components/MainContainer";
import ApplicationProvider from "./contexts/ApplicationProvider";
import KeycloakProvider from "./contexts/KeycloakProvider";
import Routing from "@common/Routing";
import "react-toastify/dist/ReactToastify.css";

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
