import React, { useState } from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";
import Navbar from "./Navbar";

export default function Palette(props) {
  const [level, setLevel] = useState(500);
  const { colors } = props.palette;
  const colorBoxes = colors[level].map((color) => (
    <ColorBox background={color.hex} name={color.name} />
  ));

  const changeLevel = (newLevel) => {
    setLevel(newLevel);
  };
  return (
    <div className="Palette">
      <Navbar changeLevel={changeLevel} level={level} />
      {/*Navbar goes here*/}
      <div className="Palette-colors">{colorBoxes}</div>
      {/*footer goes here*/}
    </div>
  );
}
