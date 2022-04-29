import React from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";

export default function Palette(props) {
  console.log(props);
  const colorBoxes = props.colors.map((color) => (
    <ColorBox background={color.color} name={color.name} />
  ));
  return (
    <div className="Palette">
      {/*Navbar goes here*/}
      <div className="Palette-colors">{colorBoxes}</div>
      {/*footer goes here*/}
    </div>
  );
}
