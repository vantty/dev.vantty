import React from "react";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const BorderLinearProgress = withStyles({
  root: {
    height: 7,
    backgroundColor: lighten("#ffffff", 0.5)
  },
  bar: {
    borderRadius: 20,
    backgroundColor: "#f5f5"
  }
})(LinearProgress);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  margin: {
    margin: "-0.99rem"
  }
}));

export default function ProgressBarForm({ value }) {
  const classes = useStyles();

  const progress = {
    1: 14.2,
    2: 28.4,
    3: 42.6,
    4: 55.8,
    5: 70,
    6: 84.2,
    7: 98.6
  };

  return (
    <div className={classes.root}>
      <BorderLinearProgress
        className={classes.margin}
        variant='determinate'
        color='secondary'
        value={progress[value]}
      />
    </div>
  );
}
