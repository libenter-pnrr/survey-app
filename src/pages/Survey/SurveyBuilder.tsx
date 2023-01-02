import React from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  InputBase,
  Theme,
} from "@mui/material";
import useSurveyContext from "../../contexts/SurveyContext";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FormElementProps } from "./types";
import { Form } from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";

const SurveyBuilder = () => {
  const { questions, title, description, dispatch } = useSurveyContext();

  return (
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
              value={title}
              onChange={(e) =>
                dispatch({ type: "SET_TITLE", payload: e.target.value })
              }
              sx={{ ml: 1, flex: 1, fontSize: 20, width: "100%" }}
              placeholder="Titolo Questionario"
            />
            <InputBase
              value={description}
              onChange={(e) =>
                dispatch({
                  type: "SET_DESCRIPTION",
                  payload: e.target.value,
                })
              }
              sx={{ ml: 1, flex: 1, fontSize: 13, width: "100%" }}
              placeholder="Sottotitolo Questionario"
            />

            <Droppable key={"FORM"} droppableId={"FORM"}>
              {(provided, snapshot) => (
                <Box
                  sx={{
                    width: "100%",
                    minHeight: "100px",
                    backgroundColor: (theme: Theme) =>
                      questions.length !== 0
                        ? theme.palette.common.white
                        : theme.palette.grey[100],
                  }}
                  ref={provided.innerRef}
                  // isDraggingOver={snapshot.isDraggingOver}
                >
                  {questions.map((element: FormElementProps, index: number) => {
                    return (
                      <Draggable
                        key={element.id}
                        draggableId={element.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Form
                              validator={validator}
                              schema={element.schema}
                              uiSchema={element.uiSchema}
                              children={true}
                              disabled={snapshot.isDragging}
                            />
                          </Box>
                        )}
                      </Draggable>
                    );
                  })}
                </Box>
              )}
            </Droppable>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default SurveyBuilder;
