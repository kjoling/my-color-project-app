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
    backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexFlow: "column wrap",
    border: "1px solid white",
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "5%",
  },
};
