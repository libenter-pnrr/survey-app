import React from "react";

import { useKeycloak } from "@react-keycloak/web";
import ControlledTable from "@application/components/Table/ControlledTable";
import {
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add, FilterList } from "@mui/icons-material";
import { getProjectData } from "@application/api/Project";
import {
  ISearchProjectData,
  ProjectData,
} from "@application/models/Project/ISearchProjectDataResponse";
import moment from "moment";

const Project = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Codice",
        accessor: "code",
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
  const { keycloak } = useKeycloak();

  // We'll start our table without any data
  const [data, setData] = React.useState<ProjectData[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current;

    setLoading(true);
    if (fetchId === fetchIdRef.current) {
      const startRow = pageSize * pageIndex;

      getProjectData({
        token: keycloak.token,
        customer: "",
        regions: [],
        cup: "",
        provinces: [],
        offset: startRow,
        limit: pageSize,
      })
        .then((res: ISearchProjectData) => {
          setData(res.rows);
          setPageCount(Math.ceil(res.total / pageSize));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <React.Fragment>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: [1],
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="button">Progetti</Typography>
        <div>
          <Tooltip title="Filtri">
            <IconButton onClick={() => {}}>
              <FilterList />
            </IconButton>
          </Tooltip>
          <Tooltip title="Aggiungi Questionario">
            <IconButton onClick={() => {}}>
              <Add />
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
      <Container maxWidth={false} sx={{ py: 2 }}>
        <ControlledTable
          columns={columns}
          data={data}
          fetchData={fetchData}
          loading={loading}
          pageCount={pageCount}
        />
      </Container>
    </React.Fragment>
  );
};

export default Project;
