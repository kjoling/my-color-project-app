import React from "react";
import { css } from "@emotion/css";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
const styles = {
  root: {
    width: "25%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
  },
  boxContent: {
    position: "absolute",
    padding: "10px",
    width: "100%",
    left: "0px",
    bottom: "0px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between",
  },
  deleteIcon: {
    color: "rgba(0,0,0,.5)",
    transition: "all 0.15s ease-in-out",
    zIndex: "3",
    "&:hover": {
      color: "white",
      transform: "scale(1.3)",
    },
  },
};

function DraggableColorBox(props) {
  const { color, name, handleClick, id } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      className={css`
        ${styles.root};
        background-color: ${color};
      `}
    >
      <div
        className={css`
          ${styles.boxContent}
        `}
      >
        <span>{name}</span>
        <span
          className={css`
            ${styles.deleteIcon}
          `}
        >
          <DeleteIcon onClick={() => handleClick(name)} />
        </span>
      </div>
    </div>
  );
}

export default DraggableColorBox;
