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
  Tooltip,
  Typography,
} from "@mui/material";
import useSurveyContext from "../../contexts/SurveyContext";
import DeleteSurveyDialog from "@components/Survey/DeleteSurveyDialog";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FormElementProps } from "pages/Survey/types";
import { Form } from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import { Dehaze, MoreVert } from "@mui/icons-material";
import {
  FormItemBuilder,
  FormItemBuilderToolbar,
  MainContainer,
  TextInputSubTitleBuilder,
  TextInputTitleBuilder,
} from "./SurveyBuilder.style";
import {
  SET_DESCRIPTION,
  SET_TITLE,
  SET_TO_DELETE,
  SET_TO_UPDATE,
} from "@reducers/Survey/actions";

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

  const handleOpenDelete = (id) => {
    handleCloseUserMenu();
    dispatch({ type: SET_TO_DELETE, payload: id });
  };

  const handleOpenUpdate = (id) => {
    handleCloseUserMenu();
    dispatch({ type: SET_TO_UPDATE, payload: id });
  };

  return (
    <React.Fragment>
      <DeleteSurveyDialog />

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
                                    <Box
                                      sx={{
                                        marginLeft: 2,
                                      }}
                                    >
                                      <Typography variant="body2">
                                        {element.title || "N.D."}
                                        {element.required && <span> *</span>}
                                      </Typography>
                                    </Box>
                                  </Box>
                                  <Box
                                    sx={{ flexGrow: 0 }}
                                    className="toolBarContent"
                                  >
                                    <Tooltip title="Open settings">
                                      <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                      >
                                        <MoreVert />
                                      </IconButton>
                                    </Tooltip>
                                    <Menu
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
                                        onClick={() =>
                                          handleOpenUpdate(element.id)
                                        }
                                      >
                                        <Typography>Modifica</Typography>
                                      </MenuItem>
                                      <MenuItem
                                        onClick={() =>
                                          handleOpenDelete(element.id)
                                        }
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
