import React from "react";
import ReactPlayer from "react-player";

const Video = ({ video }) => {
  return (
    <ReactPlayer url={video} volume={0.3} controls width='100%' height='100%' />
  );
};

export default Video;
