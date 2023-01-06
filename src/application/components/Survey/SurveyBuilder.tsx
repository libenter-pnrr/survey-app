import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Container,
  InputBase,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import useSurveyContext from "../../../contexts/SurveyContext";
import DeleteSurveyDialog from "@application/components/Survey/DeleteSurveyDialog";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Form } from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import { ContentCopy, Dehaze, Delete, Edit } from "@mui/icons-material";
import { v4 as uuid } from "uuid";
import {
  FormItemBuilder,
  FormItemBuilderToolbar,
  MainContainer,
  TextInputSubTitleBuilder,
  TextInputTitleBuilder,
} from "./SurveyBuilder.style";
import {
  DUPLICATE,
  SET_DESCRIPTION,
  SET_TITLE,
  SET_TO_DELETE,
  SET_TO_UPDATE,
} from "@reducers/Survey/actions";
import UpdateSurveyItemDialog from "./UpdateSurveyItemDialog";
import { FormElementProps } from "@application/models/Survey/FormElementProps";

const SurveyBuilder = () => {
  const { questions, title, description, dispatch } = useSurveyContext();

  const handleOpenDelete = (id) => {
    dispatch({ type: SET_TO_DELETE, payload: id });
  };

  const handleOpenUpdate = (id) => {
    dispatch({ type: SET_TO_UPDATE, payload: id });
  };

  return (
    <React.Fragment>
      <DeleteSurveyDialog />
      <UpdateSurveyItemDialog />

      <Box sx={MainContainer}>
        <Container maxWidth="md">
          <Card
            sx={{
              minHeight: "calc(100vh - 163px)",
            }}
          >
            <CardContent
              sx={{
                padding: 4,
              }}
            >
              <InputBase
                value={title}
                onChange={(e) =>
                  dispatch({ type: SET_TITLE, payload: e.target.value })
                }
                sx={TextInputTitleBuilder}
                placeholder="Titolo Questionario"
              />
              <InputBase
                value={description}
                onChange={(e) =>
                  dispatch({
                    type: SET_DESCRIPTION,
                    payload: e.target.value,
                  })
                }
                sx={TextInputSubTitleBuilder}
                placeholder="Sottotitolo Questionario"
              />

              <Droppable key={"FORM"} droppableId={"FORM"}>
                {(provided, snapshot) => (
                  <Box
                    sx={{
                      marginTop: 2,
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
                    {questions.map(
                      (element: FormElementProps, index: number) => {
                        return (
                          <Draggable
                            key={element.id}
                            draggableId={element.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <Box
                                sx={FormItemBuilder}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Box sx={FormItemBuilderToolbar}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      alignContent: "center",
                                      flexGrow: 1,
                                    }}
                                  >
                                    <Box className="toolBarContent">
                                      <Dehaze />
                                    </Box>
                                  </Box>
                                  <Box
                                    sx={{ flexGrow: 0 }}
                                    className="toolBarContent"
                                  >
                                    <ButtonGroup size="small" color="secondary">
                                      <Tooltip title="Modifica">
                                        <Button
                                          onClick={() =>
                                            handleOpenUpdate(element.id)
                                          }
                                        >
                                          <Edit fontSize="small" />
                                        </Button>
                                      </Tooltip>
                                      <Tooltip title="Duplica">
                                        <Button
                                          onClick={() =>
                                            dispatch({
                                              type: DUPLICATE,
                                              payload: Object.assign(
                                                { ...element },
                                                {
                                                  id: uuid(),
                                                }
                                              ),
                                            })
                                          }
                                        >
                                          <ContentCopy fontSize="small" />
                                        </Button>
                                      </Tooltip>
                                      <Tooltip title="Elimina">
                                        <Button
                                          onClick={() =>
                                            handleOpenDelete(element.id)
                                          }
                                        >
                                          <Delete fontSize="small" />
                                        </Button>
                                      </Tooltip>
                                    </ButtonGroup>
                                  </Box>
                                </Box>
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
                      }
                    )}
                    {questions.length === 0 && (
                      <Box sx={{ textAlign: "center", padding: 2 }}>
                        <Typography variant="body2">
                          Trascina elementi qui
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}
              </Droppable>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default SurveyBuilder;
