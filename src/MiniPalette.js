import React, { useState } from "react";
import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import { blue, red } from "@mui/material/colors";

export default function MiniPalette(props) {
  const { paletteName, emoji, colors, id, deletePalette } = props;
  const [openDelete, setOpenDelete] = useState(false);
  const navigate = useNavigate();
  console.log("test");
  const handleClose = () => {
    setOpenDelete(false);
  };
  const handleOpen = () => {
    setOpenDelete(true);
  };

  const handleDelete = (id) => {
    deletePalette(id);
  };
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
      <Dialog
        open={openDelete}
        onClose={handleClose}
        disablePortal
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          Delete {paletteName} {emoji}?
        </DialogTitle>
        <List>
          <DialogActions>
            <ListItem button onClick={() => handleDelete(id)}>
              <ListItemAvatar>
                <Avatar
                  style={{ backgroundColor: blue[100], color: blue[600] }}
                >
                  <CheckCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Delete</ListItemText>
            </ListItem>
          </DialogActions>
          <DialogActions>
            <ListItem button onClick={handleClose}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Cancel</ListItemText>
            </ListItem>
          </DialogActions>
        </List>
      </Dialog>
      <DeleteIcon
        className={css`
          ${styles.deleteIcon}
        `}
        style={{ transition: "all 0.3s ease-in-out" }}
        onClick={handleOpen}
      />
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
