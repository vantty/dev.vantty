import React from "react";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
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
  }
}));

export default function ProgressBarForm({ value }) {
  const classes = useStyles();

  const progress = {
    1: 20,
    2: 40,
    3: 60,
    4: 80,
    5: 95
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
