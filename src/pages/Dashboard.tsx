import React from "react";
import { Container, Grid, Paper, Typography, useTheme } from "@mui/material";
import { useApplicationContext } from "@contexts/ApplicationProvider";
import { Box } from "@mui/system";
import { AutoFixHigh } from "@mui/icons-material";

const Dashboard = () => {
  const { name } = useApplicationContext();
  const theme = useTheme();

  return (
    <Container
      maxWidth={"lg"}
      sx={{
        marginTop: 3,
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          {name && (
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
              }}
            >
              Ciao,{" "}
              <span
                style={{
                  color: theme.palette.secondary.dark,
                }}
              >
                {name}
              </span>
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
