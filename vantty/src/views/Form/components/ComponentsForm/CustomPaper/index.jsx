import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  layout: {
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      padding: theme.spacing(3),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      boxShadow: "0 0 0.3rem #e9e9e9"
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
