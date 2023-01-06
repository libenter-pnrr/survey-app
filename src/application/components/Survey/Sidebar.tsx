import React from "react";
import { Box, Typography } from "@mui/material";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FormElementProps } from "../../models/Survey/types";
import FormListItem from "@application/components/FormListItem";
import { formElements } from "../../../pages/Survey/data/components";

const Sidebar = () => {
  return (
    <Box
      sx={{
        flex: "0 0 auto",
        width: "300px",
        padding: 2,
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        sx={{
          marginBottom: 3,
        }}
      >
        <Typography variant="subtitle2">Tipologia di campi</Typography>
        <Typography variant="body2">
          Clicca o trascina i campi per costruire il tuo form
        </Typography>
      </Box>
      <Droppable droppableId="ITEMS" isDropDisabled={true}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            //isDraggingOver={snapshot.isDraggingOver}
          >
            {formElements.map((element: FormElementProps, index: number) => (
              <Draggable
                key={element.id}
                draggableId={element.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <FormListItem
                    element={element}
                    provided={provided}
                    snapshot={snapshot}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Box>
  );
};

export default Sidebar;
