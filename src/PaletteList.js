import React from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { css } from "@emotion/css";

export default function PaletteList(props) {
  const { palettes } = props;
  const paletteIcons = palettes.map((palette) => {
    return <MiniPalette key={palette.id} {...palette} />;
  });
  return (
    <div
      className={css`
        ${styles.root}
      `}
    >
      <div
        className={css`
          ${styles.container}
        `}
      >
        <nav
          className={css`
            ${styles.nav}
          `}
        >
          <h1>Palette List!</h1>
        </nav>
        <div
          className={css`
            ${styles.palettes}
          `}
        >
          {paletteIcons}
        </div>
      </div>
    </div>
  );
}

const styles = {
  root: {
    "background-color": "blue",
    height: "100%",
    display: "flex",
    "align-items": "flex-start",
    "justify-content": "center",
  },
  container: {
    width: "50%",
    display: "flex",
    "align-items": "flex-start",
    "flex-flow": "column wrap",
    border: "1px solid white",
  },
  nav: {
    display: "flex",
    width: "100%",
    "justify-content": "space-between",
    color: "white",
  },
  palettes: {
    "box-sizing": "border-box",
    width: "100%",
    display: "grid",
    "grid-template-columns": "repeat(3, 30%)",
    "grid-gap": "5%",
  },
};
