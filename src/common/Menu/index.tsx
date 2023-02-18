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
      title: "Questionari",
      subtitle: "Gestisci crea/modifica questionari",
      icon: <CheckBox />,
      path: "/survey",
    });
  }

  if (roles.includes("project")) {
    menu.push({
      title: "Progetti",
      subtitle: "Gestisci crea/modifica progetti",
      icon: <AccountTree />,
      path: "/projects",
    });
  }

  return menu;
};
