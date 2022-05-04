import React from "react";
import { css } from "@emotion/css";

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
};

function DraggableColorBox(props) {
  const { color } = props;

  return (
    <div
      className={css`
        ${styles.root};
        background-color: ${color};
    
        }
      `}
    >
      {color}
    </div>
  );
}

export default DraggableColorBox;
