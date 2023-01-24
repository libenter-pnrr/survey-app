import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useAsyncDebounce } from "react-table";
import { Paper, InputBase, IconButton } from "@mui/material";

export interface IGlobalFilter {
  preGlobalFilteredRows: any;
  globalFilter: any;
  setGlobalFilter: any;
}

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: IGlobalFilter) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        marginBottom: "20px",
      }}
    >
      <InputBase
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        value={value || ""}
        sx={{ ml: 1, flex: 1 }}
        placeholder={`${count} righe...`}
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={() => {
          if (value === "") {
            return;
          }

          setValue("");
          onChange("");
        }}
      >
        {value ? <ClearIcon /> : <SearchIcon />}
      </IconButton>
    </Paper>
  );
};

export default GlobalFilter;
