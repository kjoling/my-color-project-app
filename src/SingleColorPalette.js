import React from "react";
import { useParams } from "react-router-dom";
import seedColors from "./seedColors";
import { Navigate } from "react-router-dom";

export default function SingleColorPalette() {
  //   const { paletteId, colorId } = useParams();

  //   const findPalette = (id) => {
  //     return seedColors.find(function (palette) {
  //       return palette.id.toLowerCase() === id.toLowerCase();
  //     });
  //   };

  //   if (findPalette(paletteId) === undefined) {
  //     return <Navigate to="/" replace />;
  //   }

  //   const palette = findPalette(paletteId);
  //   console.log(palette);

  //   const findColor = (id) => {
  //     const palette = findPalette(paletteId);
  //     for (let i = 0; i < palette.colors.length; i++) {
  //       if (palette.colors[i].name.toLowerCase() === id.toLowerCase()) {
  //         return `${id} color found!`;
  //       }
  //     }
  //   };
  //   const colorPalette = findColor(colorId);
  //   console.log(colorPalette);
  //   if (findColor(colorId) === undefined) {
  //     return <Navigate to="/" replace />;
  //   }

  return <div>Single Color Palette</div>;
}
