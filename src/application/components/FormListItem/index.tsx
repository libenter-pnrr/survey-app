import React from "react";
import { alpha, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { FormElementProps } from "@application/models/Survey/types";

export interface FormListItemProps {
  element: FormElementProps;
  provided?: DraggableProvided;
  snapshot?: DraggableStateSnapshot;
}

const FormListItem = ({ element, provided, snapshot }: FormListItemProps) => {
  const Icon = element.icon || null;

  console.log(snapshot.isDragging);
  return (
    <ListItem
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
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
        primary={element?.schema?.title}
      />
    </ListItem>
  );
};

export default FormListItem;
