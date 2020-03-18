import { colors } from "@material-ui/core";

const white = "#FFFFFF";
const black = "#000000";

export default {
  black,
  white,
  greenVantty: {
    contrastText: white,
    tooDark: "rgb(38, 127, 122)",
    dark: "rgb(5, 211, 195)",
    main: "rgb(19, 224, 216)",
    light: "rgb(172, 249, 238)"
  },
  purpleVantty: {
    contrastText: white,
    dark: "rgb(63, 45, 112)",
    main: "rgb(90, 56, 152)",
    light: "rgb(125, 97, 186)"
  },
  vanttyPink: {
    contrastText: white,
    dark: "rgb(205, 130, 136)",
    main: "rgb(252, 200, 199)",
    light: "rgb(255, 242, 243)"
  },
  primary: {
    contrastText: white,
    dark: colors.indigo[900],
    main: colors.indigo[600],
    light: colors.indigo[400]
  },
  secondary: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: "rgb(47, 48, 52)",
    secondary: "rgb(85, 85, 85)",
    link: colors.blue[600]
  },
  background: {
    gray: "#F9F9F9",
    white: white
  },
  whatsApp: {
    primary: "#25D366"
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200]
};
