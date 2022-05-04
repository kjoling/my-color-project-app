import React, { useState } from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";
import Navbar from "./Navbar";
import seedColors from "./seedColors";
import { generatePalette } from "./ColorHelper";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import PaletteFooter from "./PaletteFooter";

export default function Palette(props) {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");
  const { paletteId } = useParams();

  const findPalette = (id) => {
    return seedColors.find(function (palette) {
      return palette.id.toLowerCase() === id.toLowerCase();
    });
  };
  if (findPalette(paletteId) === undefined) {
    return <Navigate to="/" replace />;
  }

  const palette = generatePalette(findPalette(paletteId));

  const colorBoxes = palette.colors[level].map((color) => {
    return (
      <ColorBox
        background={color[format]}
        name={color.name}
        id={color.id}
        key={color.id}
        paletteId={palette}
        moreUrl={`/palette/${palette.id}/${color.id}`}
        showLink={true}
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
        showSlider={true}
      />
      <div className="Palette-colors">{colorBoxes}</div>
      <PaletteFooter palette={palette} multiColorPalette />
    </div>
  );
}
