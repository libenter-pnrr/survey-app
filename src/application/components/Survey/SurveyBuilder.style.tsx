import { Theme } from "@mui/material";

export const MainContainer = (theme: Theme) => ({
  flex: "1 0 auto",
  padding: 2,
  backgroundColor: theme.palette.grey[100],
});

export const TextInputTitleBuilder = () => ({
  ml: 1,
  flex: 1,
  fontSize: 20,
  width: "100%",
});

export const TextInputSubTitleBuilder = () => ({
  ml: 1,
  flex: 1,
  fontSize: 14,
  width: "100%",
});

export const FormItemBuilder = (theme: Theme) => ({
  padding: 1,
  backgroundColor: theme.palette.common.white,
  borderRadius: 1,
  marginBottom: 2,
  border: `1px solid ${theme.palette.common.white}`,
  transition: "all 0.5s ease-out",
  "&:hover,&:focus": {
    border: `1px solid ${theme.palette.primary.main}`,
    "& .toolBarContent": {
      visibility: "visible",
    },
  },
  "& .toolBarContent": {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    visibility: "hidden",
  },
});

export const FormItemBuilderToolbar = (theme: Theme) => ({
  minHeight: 40,
  display: "flex",
  justifyContent: "space-between",
  "> div > svg": {
    fill: theme.palette.grey[700],
  },
});
