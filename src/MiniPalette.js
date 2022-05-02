import React from "react";
import { css } from "@emotion/css";

export default function MiniPalette(props) {
  const { paletteName, emoji } = props;
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
      ></div>
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
    "background-color": "white",
    "border-radius": "5px",
    border: "1px solid black",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      cursor: "pointer",
    },
  },
  colors: {
    "background-color": "gray",
  },
  title: {
    display: "flex",
    "justify-content": "space-between",
    "align-items": "center",
    margin: "0",
    color: "black",
    "padding-top": "0.5rem",
    "font-size": "1rem",
    position: "relative",
  },
  emoji: {
    "margin-left": "0.5rem",
    "font-size": "1.5rem",
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
{
  /* <div
className={css`
  ${styles}
`}
>
{paletteName}
</div> */
}
