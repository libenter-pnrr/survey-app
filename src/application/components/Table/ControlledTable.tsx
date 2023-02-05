import React from "react";
import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  CircularProgress,
  Box,
} from "@mui/material";
import { useTable, usePagination } from "react-table";
import TablePagination from "@application/components/Table/Pagination";

const ControlledTable = ({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      pageCount: controlledPageCount,
    },
    usePagination
  );

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        overflowX: "auto",
      }}
    >
      <MUITable data-testid="table" {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody
          {...getTableBodyProps()}
          sx={{
            maxHeight: "500px",
            overflowY: "auto",
          }}
        >
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
          <TableRow>
            {loading ? (
              <TableCell colSpan={10000}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              </TableCell>
            ) : (
              <TableCell colSpan={10000}>
                {page.length} di {controlledPageCount * pageSize} risultati
              </TableCell>
            )}
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={10000}>
              <TablePagination
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                pageCount={pageCount}
                gotoPage={gotoPage}
                nextPage={nextPage}
                previousPage={previousPage}
                pageOptions={pageOptions}
                pageIndex={pageIndex}
                setPageSize={setPageSize}
                pageSize={pageSize}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </MUITable>
    </TableContainer>
  );
};

export default ControlledTable;
