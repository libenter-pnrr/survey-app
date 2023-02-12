import React from "react";
import {
  Box,
  Button,
  Chip,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { CLOSE_FILTER, SET_FILTER } from "@reducers/Project/actions";
import { Close } from "@mui/icons-material";
import useGetRegions from "@hooks/Regions/useGetRegions";
import useGetProvinces from "@hooks/Province/useGetProvinces";
import useGetProjectType from "@hooks/Project/useGetProjectTypes";
import useSuveryDataContext from "@contexts/SurveyDataDashboardProvider";
import { ISurveyDataFilter } from "@reducers/Survey/SurveyDataReducer";

const FilterDrawer = () => {
  const { openFilter, dispatch } = useSuveryDataContext();
  const { regions } = useGetRegions();
  const { provinces } = useGetProvinces();
  const { projectTypes } = useGetProjectType();

  const [filter, setFilter] = React.useState<ISurveyDataFilter>({
    customer: "",
    cup: "",
    regions: [],
    search: "",
    provinces: [],
    projectTypes: [],
  });

  const handleChangeRegion = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setFilter({
      ...filter,
      regions: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleChangeProvinces = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setFilter({
      ...filter,
      provinces: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleChangeProjectTypes = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setFilter({
      ...filter,
      projectTypes: typeof value === "string" ? value.split(",") : value,
    });
  };

  return (
    <Drawer
      anchor="right"
      open={openFilter}
      onClose={() => dispatch({ type: CLOSE_FILTER })}
    >
      <Box sx={{ width: 400, height: "100%" }}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: [1],
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="button">Filtra</Typography>
          <IconButton onClick={() => dispatch({ type: CLOSE_FILTER })}>
            <Close />
          </IconButton>
        </Toolbar>
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "calc(100% - 64px)",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  label="Cliente"
                  variant="outlined"
                  value={filter?.customer || ""}
                  onChange={(e) =>
                    setFilter({ ...filter, customer: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  label="CUP"
                  variant="outlined"
                  value={filter?.cup || ""}
                  onChange={(e) =>
                    setFilter({ ...filter, cup: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Regioni</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={filter?.regions || []}
                  onChange={handleChangeRegion}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Regioni" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected?.map((value) => {
                        const region = regions.find((r) => r.acronym === value);
                        return <Chip key={value} label={region.name} />;
                      })}
                    </Box>
                  )}
                >
                  {regions.map(({ code, acronym, name }) => (
                    <MenuItem key={code} value={acronym}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Province</InputLabel>
                <Select
                  MenuProps={{ style: { maxHeight: 300 } }}
                  fullWidth
                  labelId="provinces-chip-label"
                  id="provinces-chip"
                  multiple={true}
                  value={filter.provinces || []}
                  onChange={handleChangeProvinces}
                  input={
                    <OutlinedInput id="province-select-chip" label="Province" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => {
                        for (const regionName in provinces) {
                          const province = provinces[regionName].find(
                            (p) => p.acronym === value
                          );
                          if (province)
                            return <Chip key={value} label={province.name} />;
                        }
                        return null;
                      })}
                    </Box>
                  )}
                >
                  {Object.keys(provinces).map((regionName) => {
                    const items = [<ListSubheader>{regionName}</ListSubheader>];
                    provinces[regionName].forEach(({ code, acronym, name }) =>
                      items.push(
                        <MenuItem key={code} value={acronym}>
                          {name}
                        </MenuItem>
                      )
                    );
                    return items;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Tipologia Progetto</InputLabel>
                <Select
                  MenuProps={{ style: { maxHeight: 300 } }}
                  fullWidth
                  labelId="project-types-chip-label"
                  id="project-types-chip"
                  multiple={true}
                  value={filter.projectTypes || []}
                  onChange={handleChangeProjectTypes}
                  input={
                    <OutlinedInput
                      id="project-types-select-chip"
                      label="Tipologia Progetto"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => {
                        const projectType = projectTypes.find(
                          (r) => r.code === value
                        );
                        return (
                          <Chip key={value} label={projectType.description} />
                        );
                      })}
                    </Box>
                  )}
                >
                  {projectTypes.map(({ code, description }) => (
                    <MenuItem key={code} value={code}>
                      {description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                onClick={() =>
                  setFilter({
                    customer: "",
                    cup: "",
                    regions: [],
                    search: "",
                    provinces: [],
                    projectTypes: [],
                  })
                }
              >
                Reset
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => {
                  dispatch({ type: SET_FILTER, payload: filter });
                  dispatch({ type: CLOSE_FILTER });
                }}
              >
                Filtra
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Drawer>
  );
};

export default FilterDrawer;
