import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shadows: ["none"],
  palette: {
    primary: {
      main: "#6c23ba",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});
