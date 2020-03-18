import React from "react";
import ReactPlayer from "react-player";
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles(theme => ({}));

export default function CircularIntegration() {
  // const classes = useStyles();

  const video = "https://www.youtube.com/watch?v=B-cE3l9_ro0&feature=youtu.be";

  return <ReactPlayer url={video} volume={1} controls />;
}
