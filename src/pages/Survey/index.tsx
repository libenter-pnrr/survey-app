import React from "react";
import useSurvey from "@hooks/Survey/useSurvey";
import { Button, Container, Toolbar, Typography } from "@mui/material";
import FullScreenLoader from "@application/components/FullScreenLoader";
import { MenuIcon } from "@application/components/MenuIcon";
import Table from "@application/components/Table/Table";
import { useNavigate } from "react-router-dom";

const SurveyDashboard = () => {
  const { isLoading, data } = useSurvey();
  const navigate = useNavigate();
  const columns = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "actions",
        Cell: ({ row: { original } }) => (
          <MenuIcon
            options={[
              {
                label: "Configura",
                onClick: () => console.log("Configura", original),
              },
            ]}
          />
        ),
        width: 10,
        maxWidth: 50,
      },
      {
        Header: "Titolo",
        accessor: "title",
      },
      {
        Header: "Data di creazione",
        accessor: "creation_date",
      },
      {
        Header: "Descrizione",
        accessor: "description",
      },
    ],
    []
  );

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
        <Button variant="outlined" onClick={() => navigate("/survey/create")}>
          Nuovo
        </Button>
      </Toolbar>
      <Container sx={{ py: 2 }}>
        {isLoading && <FullScreenLoader />}
        {!isLoading && data && <Table columns={columns} data={data} />}
      </Container>
    </React.Fragment>
  );
};

export default SurveyDashboard;
