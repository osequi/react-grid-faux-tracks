import { createMuiTheme } from "@material-ui/core/styles";

let theme = createMuiTheme({});

theme = {
  ...theme,
  custom: {
    borderLeftSelector: "&:not(:nth-child(3n-2))",
  },
};

export default theme;
