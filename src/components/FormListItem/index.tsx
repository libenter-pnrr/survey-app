import React from "react";
import { FormElementProps } from "@pages/Survey/data/components";
import { alpha, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { DraggableProps } from "react-beautiful-dnd";

export interface FormListItemProps extends Omit<DraggableProps, "children"> {
  element: FormElementProps;
}

const FormListItem = ({ element, ...props }: FormListItemProps) => {};

export default FormListItem;
