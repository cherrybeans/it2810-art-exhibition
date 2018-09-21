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
      The sound we put here could not be played since your browser does not
      support the audio tag.
    </audio>
  );
};

export default PlayButton;
