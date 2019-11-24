import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {},

  layout: {
    width: "auto",
    padding: theme.spacing(),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      padding: theme.spacing(3),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      borderStyle: "solid",
      borderWidth: "0.1px",
      borderColor: "grey"
    }
  }
}));
const CustomPaper = ({ Children }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.layout}>{Children}</div>
    </div>
  );
};

export default CustomPaper;
