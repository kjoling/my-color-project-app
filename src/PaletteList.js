import React from "react";
import { Link } from "react-router-dom";
import Palette from "./Palette";
import "./PaletteList.css";

export default function PaletteList(props) {
  const { palettes } = props;
  const paletteIcons = palettes.map((palette) => {
    return (
      <Link
        to={`/palette/${palette.id}`}
        key={palette.paletteName}
        id={palette.paletteName}
        element={<Palette />}
      >
        <div className="PaletteList-icon">{palette.paletteName}</div>
      </Link>
    );
  });
  return (
    <div>
      <h1>Palette List!</h1>
      <h2>{palettes.paletteName}</h2>
      {paletteIcons}
    </div>
  );
}
