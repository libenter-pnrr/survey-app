export const getMenu = (roles: string[]) => {
  const menu: any[] = [];
  if (roles.includes("create-survey")) {
    menu.push({
      title: "Questionari",
      path: "/survey",
    });
  }

  if (roles.includes("project")) {
    menu.push({
      title: "Progetti",
      path: "/projects",
    });
  }

  return menu;
};
