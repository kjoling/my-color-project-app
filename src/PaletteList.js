import React from "react";
import { Link } from "react-router-dom";
import Palette from "./Palette";
import MiniPalette from "./MiniPalette";

export default function PaletteList(props) {
  const { palettes } = props;
  const paletteIcons = palettes.map((palette) => {
    return <MiniPalette key={palette.id} {...palette}/>;
  });
  return (
    <div>
      <h1>Palette List!</h1>
      <h2>{palettes.paletteName}</h2>
      {paletteIcons}
      <MiniPalette />
    </div>
  );
}
