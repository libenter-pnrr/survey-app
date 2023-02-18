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
} from "@mui/material";

import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";

import type { Column } from "react-table";
import GlobalFilter from "./GlobalFilter";
import TablePagination from "./Pagination";

export interface ITable<T extends object> {
  data: Array<T>;
  columns: readonly Column<T>[];
}

const Table = <T extends object>(props: ITable<T>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    preGlobalFilteredRows,
    state,
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
      columns: props.columns,
      data: props.data,
      defaultColumn: {
        width: "auto",
      },
      initialState: {
        pageIndex: 0,
      },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  return (
    <React.Fragment>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <TableContainer component={Paper}>
        <MUITable size="small" data-testid="table" {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <TableCell
                      {...column.getHeaderProps({
                        style: {
                          // minWidth: column.minWidth,
                          maxWidth: column.maxWidth,
                          width: `${column.width}px`,
                        },
                      })}
                    >
                      {column.render("Header")}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
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
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
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
    </React.Fragment>
  );
};

export default Table;
