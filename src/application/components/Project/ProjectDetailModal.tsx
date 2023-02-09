import React from "react";
import useGetProjectInfo from "@hooks/Project/useGetProjectInfo";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
  Typography,
} from "@mui/material";
import FullScreenLoader from "../FullScreenLoader";

const ProjectDetailModal = ({ open, onClose, project }) => {
  const { loading, projectInfo } = useGetProjectInfo(project);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog fullScreen={fullScreen} open={open}>
      <DialogTitle>Dettagli progetto</DialogTitle>
      <DialogContent dividers={true}>
        {loading ? <FullScreenLoader /> : null}
        {projectInfo && !loading ? (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="button">
                <strong>Codice</strong>
              </Typography>
              <Typography variant="body1">{projectInfo.code}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="button">
                <strong>Tipologia Progetto</strong>
              </Typography>
              <Typography variant="body1">{projectInfo.cupType}</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="button">
                <strong>Natura Progetto</strong>
              </Typography>
              <Typography variant="body1">
                {projectInfo.natureDescription}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="button">
                <strong>Settore</strong>
              </Typography>
              <Typography variant="body1">{projectInfo.sectorName}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="button">
                <strong>Sottosettore</strong>
              </Typography>
              <Typography variant="body1">
                {projectInfo.subsectoreName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="button">
                <strong>Cliente</strong>
              </Typography>
              <Typography variant="body1">
                {projectInfo.customerName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="button">
                <strong>Categoria Cliente</strong>
              </Typography>
              <Typography variant="body1">
                {projectInfo.customerCategory}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="button">
                <strong>Sottocategoria Cliente</strong>
              </Typography>
              <Typography variant="body1">
                {projectInfo.customerSubcategoryDescription}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="button">
                <strong>Descrizione</strong>
              </Typography>
              <Typography variant="body1">{projectInfo.description}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="button">
                <strong>Regione</strong>
              </Typography>
              <Typography variant="body1">{projectInfo.regionName}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="button">
                <strong>Cod. Regione</strong>
              </Typography>
              <Typography variant="body1">
                {projectInfo.regionAcronym}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="button">
                <strong>Provincia</strong>
              </Typography>
              <Typography variant="body1">
                {projectInfo.provinceName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="button">
                <strong>Cod. Provincia</strong>
              </Typography>
              <Typography variant="body1">
                {projectInfo.provinceAcronym}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="button">
                <strong>Comune</strong>
              </Typography>
              <Typography variant="body1">{projectInfo.town}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="button">
                <strong>C.A.P.</strong>
              </Typography>
              <Typography variant="body1">{projectInfo.zipCode}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="button">
                <strong>ISTAT</strong>
              </Typography>
              <Typography variant="body1">{projectInfo.istat}</Typography>
            </Grid>

            <Grid item xs={12} md={12}>
              <Typography variant="button">
                <strong>Nome Tematica</strong>
              </Typography>
              <Typography variant="body1">
                {projectInfo.thematicDescription}
              </Typography>
            </Grid>
          </Grid>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Chiudi</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectDetailModal;
