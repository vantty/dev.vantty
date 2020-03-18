import React from "react";
import ReactPlayer from "react-player";

const Video = ({ video }) => {
  return <ReactPlayer url={video} volume={1} controls />;
};

export default Video;

// const videos = [
//   { name: "create", url: "https://youtu.be/B-cE3l9_ro0" },
//   { name: "book", url: "https://youtu.be/B-cE3l9_ro0" }
// ];
