import React from "react";
import { getSurveyData } from "@application/api/SurveyData";
import {
  ISearchSurveyData,
  SurveyData,
} from "@application/models/SurveyData/ISearchSurveyDataResponse";
import { useKeycloak } from "@react-keycloak/web";
import ControlledTable from "@application/components/Table/ControlledTable";
import {
  Button,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add, FilterList } from "@mui/icons-material";

const SurveyDataDashboard = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Codice Cup",
        accessor: "cup_code",
      },
      {
        Header: "Questionario",
        accessor: "survey_title",
      },
      {
        Header: "Descrizione",
        accessor: "survey_description",
      },
      {
        Header: "Creato il",
        accessor: "created_on",
      },
      {
        Header: "Creato da",
        accessor: "created_by",
      },
      {
        Header: "Cliente",
        accessor: "customer_name",
      },
      {
        Header: "Stato Cup",
        accessor: "cup_status",
      },
      {
        Header: "Tipologia Cup",
        accessor: "cup_type",
      },
      {
        Header: "Regione Cup",
        accessor: "region_name",
      },
      {
        Header: "Provincia Cup",
        accessor: "province_name",
      },
    ],
    []
  );
  const { keycloak } = useKeycloak();

  // We'll start our table without any data
  const [data, setData] = React.useState<SurveyData[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current;

    setLoading(true);
    if (fetchId === fetchIdRef.current) {
      const startRow = pageSize * pageIndex;
      const endRow = startRow + pageSize;

      getSurveyData({
        token: keycloak.token,
        regions: [],
        search: "",
        provinces: [],
        offset: startRow,
        limit: endRow,
      })
        .then((res: ISearchSurveyData) => {
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
        <Typography variant="button">Questionari</Typography>
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

export default SurveyDataDashboard;
