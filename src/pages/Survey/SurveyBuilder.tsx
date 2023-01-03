import React from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import useSurveyContext from "../../contexts/SurveyContext";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FormElementProps } from "./types";
import { Form } from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import { Dehaze, MoreVert } from "@mui/icons-material";

const SurveyBuilder = () => {
  const { questions, title, description, dispatch } = useSurveyContext();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
          <CardContent
            sx={{
              padding: 4,
            }}
          >
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
                  {questions.map((element: FormElementProps, index: number) => {
                    return (
                      <Draggable
                        key={element.id}
                        draggableId={element.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Box
                            sx={{
                              marginBottom: 3,
                            }}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Box
                              sx={{
                                minHeight: 40,
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Dehaze />

                              <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                  <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                  >
                                    <MoreVert />
                                  </IconButton>
                                </Tooltip>
                                <Menu
                                  sx={{
                                    minWidth: 200,
                                  }}
                                  id={`menu-${element.id}-appbar`}
                                  anchorEl={anchorElUser}
                                  anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                  }}
                                  keepMounted
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                  }}
                                  open={Boolean(anchorElUser)}
                                  onClose={handleCloseUserMenu}
                                >
                                  <MenuItem
                                    onClick={() => console.log("Update modal")}
                                  >
                                    <Typography>Modifica</Typography>
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => console.log("delete modal")}
                                  >
                                    <Typography>Elimina</Typography>
                                  </MenuItem>
                                </Menu>
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
                  })}
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
  );
};

export default SurveyBuilder;
