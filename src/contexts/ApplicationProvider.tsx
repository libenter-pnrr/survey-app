import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect } from "react";
const CLIENT = process.env.REACT_APP_KC_CLIENTID;

interface IApplicationProvider {
  theme?: string;
  changeTheme?: (theme: string) => void;
  roles?: string[];
  name?: string;
  gloabalLoader?: boolean;
  setGlobalLoader?: React.Dispatch<React.SetStateAction<boolean>>;
}

type ApplicationProviderProps = {
  children: React.ReactNode;
};

const ApplicationContext = React.createContext<IApplicationProvider>({});

const changeTheme = (
  theme: string,
  setTheme: React.Dispatch<React.SetStateAction<string>>
) => {
  localStorage.setItem("theme", theme);
  setTheme(theme);
};

const ApplicationProvider = ({ children }: ApplicationProviderProps) => {
  const [theme, setTheme] = React.useState<string>(
    localStorage.getItem("theme") || "light"
  );
  const [roles, setRoles] = React.useState<string[]>([]);
  const [name, setName] = React.useState<string>("");
  const [gloabalLoader, setGlobalLoader] = React.useState<boolean>(false);

  const {
    keycloak: { tokenParsed },
  } = useKeycloak();

  useEffect(() => {
    if (tokenParsed && tokenParsed.resource_access) {
      const clientRoles = tokenParsed.resource_access[CLIENT].roles;
      setRoles(clientRoles);
      setName(tokenParsed.name);
    }
  }, [tokenParsed]);

  const value = {
    theme,
    changeTheme: (theme: string) => changeTheme(theme, setTheme),
    roles,
    name,
    gloabalLoader,
    setGlobalLoader,
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

export function useApplicationContext() {
  return React.useContext(ApplicationContext);
}

export default ApplicationProvider;
