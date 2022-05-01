import React, { useState } from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";
import Navbar from "./Navbar";

export default function Palette(props) {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");
  const { colors } = props.palette;
  const colorBoxes = colors[level].map((color) => {
    return (
      <ColorBox
        background={color[format]}
        name={color.name}
        id={color.id}
        key={color.id}
      />
    );
  });

  const changeLevel = (newLevel) => {
    setLevel(newLevel);
  };

  const changeFormat = (evt) => {
    setFormat(evt.target.value);
  };
  return (
    <div className="Palette">
      <Navbar
        changeLevel={changeLevel}
        level={level}
        changeFormat={changeFormat}
      />
      {/*Navbar goes here*/}
      <div className="Palette-colors">{colorBoxes}</div>
      {/*footer goes here*/}
    </div>
  );
}
