export const getMenu = (roles: string[]) => {
  const menu: any[] = [];
  if (roles.includes("create-survey")) {
    menu.push({
      title: "Questionari",
      path: "/survey",
    });
  }

  return menu;
};
