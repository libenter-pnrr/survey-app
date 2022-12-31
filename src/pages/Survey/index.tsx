import React from "react";
import {
  List,
  Box,
  Toolbar,
  Typography,
  ButtonGroup,
  Button,
  Container,
  Card,
  CardContent,
  InputBase,
} from "@mui/material";
import { FormElementProps, formElements } from "./data/components";
import FormListItem from "@components/FormListItem";

const Survey = () => {
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
          <List
            sx={{ width: "100%", bgcolor: "background.paper", marginTop: 2 }}
          >
            {formElements.map((element: FormElementProps) => (
              <FormListItem element={element} />
            ))}
          </List>
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
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Box>
    </div>
  );
};

export default Survey;
