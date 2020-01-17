import React from "react";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const BorderLinearProgress = withStyles(theme => ({
  root: {
    height: 7,
    backgroundColor: lighten("#ffffff", 0.5)
  },
  bar: {
    borderRadius: 20,
    backgroundColor: theme.palette.purpleVantty.light
  }
}))(LinearProgress);

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
    1: 12.5,
    2: 25,
    3: 37.5,
    4: 50,
    5: 62.5,
    6: 75,
    7: 87.5,
    8: 100
  };

  return (
    <div className={classes.root}>
      <BorderLinearProgress
        className={classes.margin}
        variant="determinate"
        color="secondary"
        value={progress[value]}
      />
    </div>
  );
}
