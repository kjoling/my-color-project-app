import React from "react";
import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";

export default function MiniPalette(props) {
  const { paletteName, emoji, colors, id } = props;
  const navigate = useNavigate();
  const miniColorBoxes = colors.map((color) => {
    return (
      <div
        className={css`
          ${styles.miniColor}
        `}
        style={{ backgroundColor: color.color }}
        key={color.name}
        onClick={() => navigate(`/palette/${id}`)}
      ></div>
    );
  });
  return (
    <div
      className={css`
        ${styles.root}
      `}
    >
      <div
        className={css`
          ${styles.colors}
        `}
      >
        {miniColorBoxes}
      </div>
      <h5
        className={css`
          ${styles.title}
        `}
      >
        {paletteName}
        <span
          className={css`
            ${styles.emoji}
          `}
        >
          {emoji}
        </span>
      </h5>
    </div>
  );
}

const styles = {
  root: {
    backgroundColor: "white",
    borderRadius: "5px",
    border: "1px solid black",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    height: "max-content",
  },
  colors: {
    backgroundColor: "#dae1e4",
    height: "150px",
    width: "100%",
    borderRadius: "5px",
    overflow: "hidden",
    "&:hover": {
      cursor: "pointer",
    },
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative",
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem",
  },
  miniColor: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    marginBottom: "-3.5px",
  },
};
// const root = {};
// const colors = {};
// const title = {};
// const emoji = {};

//adding styles object
// const styles = {
//   'background-color': "hotpink",
//   "&:hover": {
//     color: `${color}`,
//     cursor: "pointer",
//   },
// };

//sample how to add styles
