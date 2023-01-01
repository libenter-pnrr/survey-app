import React, { useState } from "react";
import {
  Box,
  Toolbar,
  Typography,
  ButtonGroup,
  Button,
  Container,
  Card,
  CardContent,
  InputBase,
  ListItem,
  ListItemAvatar,
  ListItemText,
  alpha,
} from "@mui/material";
import { FormElementProps, formElements } from "./data/components";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableLocation,
} from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

// a little function to help us with reordering the result
const reorder = (
  list: FormElementProps[],
  startIndex: number,
  endIndex: number
): FormElementProps[] => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
/**
 * Moves an item from one list to another list.
 */
const copy = (
  source: FormElementProps[],
  destination: FormElementProps[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
): FormElementProps[] => {
  console.log("==> dest", destination);

  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destClone;
};

const Survey = () => {
  const [elements, setElements] = useState<FormElementProps[]>([]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    console.log("==> result", result);

    // dropped outside the list
    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case "FORM":
        setElements(reorder(elements, source.index, destination.index));
        break;
      case "ITEMS":
        setElements(copy(formElements, elements, source, destination));
        break;
    }
  };

  return (
    <div>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: [1],
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="button">Crea Questionario</Typography>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button>Costruisci</Button>
          <Button>Anteprima</Button>
        </ButtonGroup>
        <Box />
      </Toolbar>
      <Box sx={{ display: "flex", height: "calc(100vh - 133px)" }}>
        <DragDropContext onDragEnd={(e: DropResult) => onDragEnd(e)}>
          <Box
            sx={{
              flex: "0 0 auto",
              width: "300px",
              padding: 2,
              borderRight: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="subtitle2">Tipologia di campi</Typography>
            <Typography variant="body2">
              Clicca o trascina i campi per costruire il tuo form
            </Typography>
            <Droppable droppableId="ITEMS" isDropDisabled={true}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  //isDraggingOver={snapshot.isDraggingOver}
                >
                  {formElements.map(
                    (element: FormElementProps, index: number) => (
                      <Draggable
                        key={element.id}
                        draggableId={element.id}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          const Icon = element.icon || null;
                          // TODO: snapshot.isDragging
                          return (
                            <React.Fragment>
                              <ListItem
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                sx={{
                                  cursor: "pointer",
                                  backgroundColor: (theme) =>
                                    alpha(theme.palette.primary.light, 0.2),
                                  color: (theme) => theme.palette.primary.dark,
                                  borderRadius: 1,
                                  marginBottom: 1,
                                  "&:hover": {
                                    backgroundColor: (theme) =>
                                      theme.palette.primary.main,
                                    color: (theme) =>
                                      theme.palette.primary.contrastText,
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
                              {snapshot.isDragging && (
                                <ListItem
                                  sx={{
                                    cursor: "pointer",
                                    backgroundColor: (theme) =>
                                      alpha(theme.palette.primary.light, 0.2),
                                    color: (theme) =>
                                      theme.palette.primary.dark,
                                    borderRadius: 1,
                                    marginBottom: 1,
                                    "&:hover": {
                                      backgroundColor: (theme) =>
                                        theme.palette.primary.main,
                                      color: (theme) =>
                                        theme.palette.primary.contrastText,
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
                              )}
                            </React.Fragment>
                          );
                        }}
                      </Draggable>
                    )
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Box>
          <Box
            sx={{
              flex: "1 0 auto",
              padding: 2,
              backgroundColor: (theme) => theme.palette.grey[100],
            }}
          >
            <Container maxWidth="md">
              <Card>
                <CardContent>
                  <InputBase
                    sx={{ ml: 1, flex: 1, fontSize: 20, width: "100%" }}
                    placeholder="Titolo Questionario"
                  />
                  <InputBase
                    sx={{ ml: 1, flex: 1, fontSize: 13, width: "100%" }}
                    placeholder="Sottotitolo Questionario"
                  />

                  <Droppable key={"FORM"} droppableId={"FORM"}>
                    {(provided, snapshot) => (
                      <Box
                        sx={{
                          width: "100%",
                          minHeight: "100px",
                          backgroundColor: (theme) => theme.palette.grey[100],
                        }}
                        ref={provided.innerRef}
                        // isDraggingOver={snapshot.isDraggingOver}
                      >
                        {elements.map((element: FormElementProps, index) => {
                          return <div key={element.id}>{element.title}</div>;
                        })}
                      </Box>
                    )}
                  </Droppable>
                </CardContent>
              </Card>
            </Container>
          </Box>
        </DragDropContext>
      </Box>
    </div>
  );
};

export default Survey;
