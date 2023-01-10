import React from "react";
import MainContainer from "./application/components/MainContainer";
import ApplicationProvider from "./contexts/ApplicationProvider";
import KeycloakProvider from "./contexts/KeycloakProvider";
import Routing from "@common/Routing";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@common/config/queryClient";
import { ToastContainer } from "react-toastify";
import toastContainerConfig from "@common/config/toastContainerConfig";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <KeycloakProvider>
      <QueryClientProvider client={queryClient}>
        <ApplicationProvider>
          <MainContainer>
            <Routing />
          </MainContainer>
          <ToastContainer {...toastContainerConfig} />
        </ApplicationProvider>
      </QueryClientProvider>
    </KeycloakProvider>
  );
}
