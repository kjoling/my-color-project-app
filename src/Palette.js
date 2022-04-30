import React, { useState } from "react";
import ColorBox from "./ColorBox";
import "rc-slider/assets/index.css";
import "./Palette.css";
import Slider from "rc-slider";

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
      <div className="slider">
        <Slider
          defaultValue={level}
          min={100}
          max={900}
          step={100}
          onAfterChange={changeLevel}
          trackStyle={{ backgroundColor: "transparent" }}
          handleStyle={{
            backgroundColor: "green",
            outline: "none",
            border: "2px solid green",
            boxShadow: "none",
            width: "13px",
            height: "13px",
            marginLeft: "-7px",
            marginTop: "-3px",
          }}
          railStyle={{ height: 8 }}
        />
      </div>
      {/*Navbar goes here*/}
      <div className="Palette-colors">{colorBoxes}</div>
      {/*footer goes here*/}
    </div>
  );
}
