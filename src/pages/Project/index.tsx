import React from "react";

import { useKeycloak } from "@react-keycloak/web";
import ControlledTable from "@application/components/Table/ControlledTable";
import {
  Chip,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add, FilterList } from "@mui/icons-material";
import { getProjectData } from "@application/api/Project";
import { ISearchProjectData } from "@application/models/Project/ISearchProjectDataResponse";
import moment from "moment";
import useProjectContext from "@contexts/ProjectContext";
import {
  OPEN_FILTER,
  SET_LOADING,
  SET_RESULTS,
} from "@reducers/Project/actions";
import FilterDrawer from "./FilterDrawer";
import { MenuIcon } from "@application/components/MenuIcon";
import ProjectDetailModal from "@application/components/Project/ProjectDetailModal";
import { useNavigate } from "react-router-dom";
import { useApplicationContext } from "@contexts/ApplicationProvider";

const Project = () => {
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();
  const { notify } = useApplicationContext();
  const { loading, rows, pageCount, filter, dispatch } = useProjectContext();
  const [openDetails, setOpenDetails] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState(null);

  const columns = React.useMemo(
    () => [
      {
        Header: " ",
        accessor: "id",
        width: 50,
        Cell: ({ value }) => (
          <MenuIcon
            options={[
              {
                label: "Dettagli",
                onClick: () => {
                  setSelectedProject(value);
                  setOpenDetails(true);
                },
              },
              {
                label: "Aggiungi report di monitoraggio",
                onClick: () => navigate(`/survey/${value}`),
              },
            ]}
          />
        ),
      },
      {
        Header: "Codice",
        accessor: "code",
        Cell: ({ value }) => <strong>{value}</strong>,
      },
      {
        Header: "",
        accessor: "survey_count",
        Cell: ({ value }) => <Chip label={value} color="primary" />,
      },
      {
        Header: "Tipologia",
        accessor: "type_description",
      },
      {
        Header: "Cliente",
        accessor: "customer_name",
      },
      {
        Header: "Stato",
        accessor: "cup_status",
      },
      {
        Header: "Regione",
        accessor: "region_name",
      },
      {
        Header: "Provincia",
        accessor: "province_name",
      },
      {
        Header: "Data",
        accessor: "generation_date",
        Cell: ({ value }) => moment(value).format("DD/MM/YYYY"),
      },
    ],
    []
  );

  const fetchIdRef = React.useRef(0);

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex }) => {
      const fetchId = ++fetchIdRef.current;

      dispatch({ type: SET_LOADING, payload: true });
      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex;

        getProjectData({
          token: keycloak.token,
          ...filter,
          offset: startRow,
          limit: pageSize,
        })
          .then((res: ISearchProjectData) => {
            dispatch({
              type: SET_RESULTS,
              payload: {
                rows: res.rows,
                pageCount: Math.ceil(res.total / pageSize),
              },
            });
          })
          .catch((err) => {
            notify("Errore durante il caricamento dei dati", "error");
            console.log(err);
          })
          .finally(() => {
            dispatch({ type: SET_LOADING, payload: false });
          });
      }
    },
    [filter]
  );

  return (
    <React.Fragment>
      <ProjectDetailModal
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        project={selectedProject}
      />
      <FilterDrawer />
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: (theme) => theme.spacing(1, 2),
          backgroundColor: (theme) => theme.palette.background.paper,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="button">Cerca il progetto</Typography>
        <div>
          <Tooltip title="Filtri">
            <IconButton onClick={() => dispatch({ type: OPEN_FILTER })}>
              <FilterList />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title="Aggiungi Progetto">
            <IconButton onClick={() => {}}>
              <Add />
            </IconButton>
          </Tooltip> */}
        </div>
      </Toolbar>
      <Container maxWidth={false} sx={{ py: 2 }}>
        <ControlledTable
          columns={columns}
          data={rows}
          fetchData={fetchData}
          loading={loading}
          pageCount={pageCount}
        />
      </Container>
    </React.Fragment>
  );
};

export default Project;
