import React from "react";
import { FormElementProps } from "@pages/Survey/data/components";
import { alpha, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

export type FormListItemProps = {
  element: FormElementProps;
};

const FormListItem = ({ element }: FormListItemProps) => {
  const Icon = element.icon || null;

  return (
    <ListItem
      sx={{
        cursor: "pointer",
        backgroundColor: (theme) => alpha(theme.palette.primary.light, 0.2),
        color: (theme) => theme.palette.primary.dark,
        borderRadius: 1,
        marginBottom: 1,
        "&:hover": {
          backgroundColor: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.primary.contrastText,
        },
      }}
    >
      <ListItemAvatar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Icon />
      </ListItemAvatar>
      <ListItemText
        sx={{
          "& span": {
            fontSize: 14,
          },
        }}
        primary={element.title}
      />
    </ListItem>
  );
};

export default FormListItem;
