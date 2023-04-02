import React from "react";
import { AccountTree, AutoAwesome, CheckBox } from "@mui/icons-material";

export const getMenu = (roles: string[]) => {
  const menu: any[] = [];
  if (roles.includes("create-survey")) {
    menu.push({
      title: "Wizard",
      subtitle: "Crea un nuovo questionario",
      icon: <AutoAwesome />,
      path: "/wizard",
    });
  }

  if (roles.includes("survey")) {
    menu.push({
      title: "Report di monitoraggio",
      subtitle: "Gestisci crea/modifica report",
      icon: <CheckBox />,
      path: "/survey",
    });
  }

  if (roles.includes("project")) {
    menu.push({
      title: "Cerca il progetto",
      subtitle: "Ricerca i tuoi progetti",
      icon: <AccountTree />,
      path: "/projects",
    });
  }

  return menu;
};
