import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { useApplicationContext } from "@contexts/ApplicationProvider";
import { Box } from "@mui/system";
import { AutoFixHigh } from "@mui/icons-material";
import Carousel from "react-material-ui-carousel";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { name } = useApplicationContext();
  const navigate = useNavigate();
  const theme = useTheme();
  const items = [
    {
      image:
        "https://libenteritalia.eu/wp-content/uploads/2021/05/slide-1-destra.jpg",
    },
    {
      image:
        "https://libenteritalia.eu/wp-content/uploads/2021/07/slide-02-new.jpg",
    },
    {
      image:
        "https://libenteritalia.eu/wp-content/uploads/2021/05/Slide-04-def.jpg",
    },
  ];

  return (
    <Container
      maxWidth={"lg"}
      sx={{
        marginTop: 3,
        marginBottom: 3,
      }}
    >
      <Grid container gap={3}>
        <Grid item xs={12}>
          {name && (
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                marginBottom: 4,
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
        <Grid item xs={12}>
          <Carousel>
            {items.map((item, i) => (
              <Box>
                <img src={item.image} height={480} />
              </Box>
            ))}
          </Carousel>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://libenteritalia.eu/wp-content/uploads/2021/05/cannocc-scaled.jpeg"
              title="I tuoi progetti"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Cerca il progetto
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cerca il progetto a cui sei interessato ed inizia a compilare i
                tuoi report
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                color={"primary"}
                variant="outlined"
                LinkComponent={Link}
                onClick={() => navigate("/projects")}
              >
                Vai alla sezione progetti
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://libenteritalia.eu/wp-content/uploads/2021/05/Trsapparenza-per-Carta-o-Missione-scaled.jpeg"
              title="I tuoi report"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Crea i tuoi Report
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Visualizza e gestisci tutti i tuoi Report di monitoraggio
                associati ai progetti di tuo interesse
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                color={"primary"}
                variant="outlined"
                LinkComponent={Link}
                onClick={() => navigate("/survey")}
              >
                Vai alla sezione report
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
