import React from "react";
import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

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
          ${styles.delete}
        `}
      >
        <DeleteIcon
          className={css`
            ${styles.deleteIcon}
          `}
          style={{ transition: "all 0.3s ease-in-out" }}
        />{" "}
      </div>
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
    "&:hover svg": {
      opacity: "1",
    },
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
  delete: {},
  deleteIcon: {
    color: "white",
    backgroundColor: "#eb3d30",
    width: "20px",
    height: "20px",
    position: "absolute",
    right: "0",
    top: "0",
    padding: "10px",
    "z-index": "10",
    opacity: "0",
  },
};
