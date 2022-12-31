export const getMenu = (roles: string[]) => {
  const menu: any[] = [];
  if (roles.includes("create-survey")) {
    menu.push({
      title: "Crea",
      path: "/create-survey",
    });
  }

  return menu;
};
