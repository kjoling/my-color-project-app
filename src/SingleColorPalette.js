import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import seedColors from "./seedColors";
import { Navigate } from "react-router-dom";
import { generatePalette } from "./ColorHelper";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
// import { css } from "@emotion/css";
import PaletteFooter from "./PaletteFooter";

export default function SingleColorPalette() {
  const { paletteId, colorId } = useParams();
  const [format, setFormat] = useState("hex");

  const findPalette = (id) => {
    return seedColors.find(function (palette) {
      return palette.id.toLowerCase() === id.toLowerCase();
    });
  };

  if (findPalette(paletteId) === undefined) {
    return <Navigate to="/" replace />;
  }
  const findColors = (colorId) => {
    //checks if colorId param is valid
    const palette = findPalette(paletteId);
    for (let i = 0; i < palette.colors.length; i++) {
      if (palette.colors[i].name.toLowerCase() === colorId.toLowerCase()) {
        return "Color found!";
      }
    }
  };
  if (findColors(colorId) === undefined) {
    return <Navigate to="/" replace />;
  }
  const starterPalette = generatePalette(findPalette(paletteId));

  const getShades = (palette, colorToFilterBy) => {
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => {
          return color.id === colorToFilterBy;
        })
      );
    }
    return shades.slice(1);
  };

  const changeFormat = (evt) => {
    setFormat(evt.target.value);
  };
  const colorPalette = getShades(starterPalette, colorId);

  const colorBoxes = colorPalette.map((color) => {
    return (
      <ColorBox
        background={color[format]}
        name={color.name}
        id={color.id}
        key={color.name}
        moreUrl={`/palette/${paletteId}`}
        showLink={false}
      />
    );
  });

  return (
    <div className="SingleColorPalette Palette">
      <Navbar changeFormat={changeFormat} />
      <div className="Palette-colors">
        {colorBoxes}
        <div className="go-back ColorBox">
          <Link className="back-button" to={`/palette/${paletteId}`}>
            Go Back
          </Link>
        </div>
      </div>

      <PaletteFooter
        palette={colorPalette}
        colorId={colorId}
        singleColorPalette={true}
        emoji={starterPalette.emoji}
      />
    </div>
  );
}

// const styles = {
//   footer: {
//     textTransform: "capitalize",
//   },
// };
