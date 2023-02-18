import React from "react";
import useGetProjectInfo from "@hooks/Project/useGetProjectInfo";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const ProjectInfo = ({ id }: { id: string | null }) => {
  const { loading, projectInfo } = useGetProjectInfo(id);
  const [expanded, setExpanded] = React.useState<boolean>(false);

  return (
    <Card
      sx={{
        marginTop: 3,
      }}
    >
      {loading && <CircularProgress />}
      {!loading && projectInfo && (
        <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              <strong>Codice Progetto</strong>: {projectInfo.code}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              <strong>Stato</strong>: {projectInfo.status}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="button">Descrizione</Typography>
                <Typography>{projectInfo.description}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="button">Tipo Progetto</Typography>
                <Typography>{projectInfo.cupType}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="button">Natura Progetto</Typography>
                <Typography>{projectInfo.natureDescription}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="button">Cliente</Typography>
                <Typography>{projectInfo.customerName}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="button">Categoria Cliente</Typography>
                <Typography>{projectInfo.customerCategory}</Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}
    </Card>
  );
};

export default ProjectInfo;
