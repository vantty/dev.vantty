import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "1rem"
  },
  margin: {
    height: theme.spacing(3)
  }
}));

const marks = [
  {
    value: 0,
    label: "1 h"
  },
  //   {
  //     value: 15,
  //     label: "20°C"
  //   },
  //   {
  //     value: 17,
  //     label: "17°C"
  //   },
  {
    value: 24,
    label: "24 h"
  }
];

function valuetext(value) {
  return `${value}°C`;
}

export default function TrackInvertedSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Typography id='track-inverted-slider' gutterBottom>
        Hours Range
      </Typography> */}
      <Slider
        max={24}
        track='inverted'
        aria-labelledby='track-inverted-range-slider'
        valueLabelDisplay='auto'
        getAriaValueText={valuetext}
        defaultValue={[17, 21]}
        marks={marks}
      />
      {/* <div className={classes.margin} />
      <Typography id='track-inverted-range-slider' gutterBottom>
        Hours Range
      </Typography>
      <Slider
        max={24}
        track='inverted'
        aria-labelledby='track-inverted-range-slider'
        valueLabelDisplay='auto'
        getAriaValueText={valuetext}
        defaultValue={[17, 21]}
        marks={marks}
      /> */}
    </div>
  );
}
