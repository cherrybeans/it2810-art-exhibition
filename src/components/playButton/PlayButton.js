import React from "react";
import "./PlayButton.css";

const PlayButton = ({ src }) => {
  return (
    <audio
      id="Music-player"
      className="PlayButton-audio"
      controls
      autoPlay
      loop
      preload="auto"
    >
      <source src={src} />
      This text displays if the audio tag isn't supported.
    </audio>
  );
};

export default PlayButton;
