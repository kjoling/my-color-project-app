import React from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { css } from "@emotion/css";

export default function PaletteList(props) {
  const { palettes } = props;
  const paletteIcons = palettes.map((palette) => {
    return <MiniPalette {...palette} key={palette.id} />;
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
          <Link to="/palette/new">New Palette Form</Link>
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
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    "& a": {
      textDecoration: "none",
      color: "white",
      padding: 5,
      border: "1px solid white",
      borderRadius: "5px",
      "&:hover": {
        color: "black",
        border: "1px solid black",
      },
    },
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "5%",
  },
};
