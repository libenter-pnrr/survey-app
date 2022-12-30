import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import Keycloak, { KeycloakInitOptions } from "keycloak-js";

const URL: string = process.env.REACT_APP_KC_URL;
const REALM: string = process.env.REACT_APP_KC_REALM;
const CLIENT_ID: string = process.env.REACT_APP_KC_CLIENTID;

type KeycloakProviderProps = {
  children: React.ReactNode;
};

const keycloak = new Keycloak({
  url: URL,
  realm: REALM,
  clientId: CLIENT_ID,
});

const keycloakConfig: KeycloakInitOptions = {
  onLoad: "login-required",
  checkLoginIframe: false,
};

const KeycloakProvider = ({ children }: KeycloakProviderProps) => {
  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={keycloakConfig}>
      {children}
    </ReactKeycloakProvider>
  );
};

export default KeycloakProvider;
