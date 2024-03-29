import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect } from "react";
import { toast, ToastContent, TypeOptions } from "react-toastify";
const CLIENT = process.env.REACT_APP_KC_CLIENTID;

interface IApplicationProvider {
  theme?: string;
  changeTheme?: (theme: string) => void;
  roles?: string[];
  name?: string;
  username?: string;
  gloabalLoader?: boolean;
  setGlobalLoader?: React.Dispatch<React.SetStateAction<boolean>>;
  notify?: (message: string, type: NotificationTypes) => void;
}

type ApplicationProviderProps = {
  children: React.ReactNode;
};

export type NotificationTypes =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "type";

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
  const [username, setUsername] = React.useState<string>("");
  const [gloabalLoader, setGlobalLoader] = React.useState<boolean>(false);
  const notify = (content: ToastContent, type?: TypeOptions) => {
    toast(content, {
      type: type,
    });
  };

  const {
    keycloak: { tokenParsed },
  } = useKeycloak();

  useEffect(() => {
    if (tokenParsed && tokenParsed.resource_access) {
      const clientRoles = tokenParsed.resource_access[CLIENT].roles;
      setRoles(clientRoles);
      setName(tokenParsed.name);
      setUsername(tokenParsed.preferred_username);
    }
  }, [tokenParsed]);

  const value = {
    theme,
    changeTheme: (theme: string) => changeTheme(theme, setTheme),
    roles,
    name,
    username,
    gloabalLoader,
    setGlobalLoader,
    notify,
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
