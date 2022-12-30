import React from "react";

interface IApplicationProvider {
  theme?: string;
  changeTheme?: (theme: string) => void;
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

  const value = {
    theme,
    changeTheme: (theme: string) => changeTheme(theme, setTheme),
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
