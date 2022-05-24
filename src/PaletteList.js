import React, { useState } from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { css } from "@emotion/css";
import sizes from "./sizes";
import bg from "./bg.svg";
import { TransitionGroup, CSSTransition } from "react-transition-group";
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
import "./Palette.css";

export default function PaletteList(props) {
  const { palettes, deletePalette } = props;
  const [inProp, setInProp] = useState(false);
  const [miniPaletteId, setMiniPaletteId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);

  const handleClose = () => {
    setOpenDelete(false);
    setMiniPaletteId("");
    setInProp(false);
  };
  const handleOpen = (id) => {
    setOpenDelete(true);
    setMiniPaletteId(id);
  };

  const handleDelete = (id) => {
    deletePalette(id);
    setInProp(true);
    handleClose();
  };

  const paletteIcons = palettes.map((palette) => {
    return (
      <CSSTransition
        in={inProp}
        timeout={500}
        classNames="fade"
        key={palette.id}
      >
        <MiniPalette
          {...palette}
          key={palette.id}
          deletePalette={deletePalette}
          handleOpen={handleOpen}
        />
      </CSSTransition>
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
          ${styles.container}
        `}
      >
        <nav
          className={css`
            ${styles.nav}
          `}
        >
          <h1>Palette List</h1>
          <Link to="/palette/new">New Palette Form</Link>
        </nav>
        <Dialog
          open={openDelete}
          onClose={handleClose}
          disablePortal
          aria-labelledby="delete-dialog-title"
        >
          <DialogTitle id="delete-dialog-title">Delete ?</DialogTitle>
          <List>
            <DialogActions>
              <ListItem button onClick={() => handleDelete(miniPaletteId)}>
                <ListItemAvatar>
                  <Avatar
                    style={{ backgroundColor: blue[100], color: blue[600] }}
                  >
                    <CheckCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>Delete {palettes.miniPaletteId}</ListItemText>
              </ListItem>
            </DialogActions>
            <DialogActions>
              <ListItem button onClick={handleClose}>
                <ListItemAvatar>
                  <Avatar
                    style={{ backgroundColor: red[100], color: red[600] }}
                  >
                    <CloseIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>Cancel</ListItemText>
              </ListItem>
            </DialogActions>
          </List>
        </Dialog>
        <TransitionGroup
          timeout={500}
          className={css`
            ${styles.palettes}
          `}
        >
          {paletteIcons}
        </TransitionGroup>
      </div>
    </div>
  );
}

const styles = {
  root: {
    /* Background by svgbackgrounds.com */
    backgroundImage: `url(${bg})`,
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    overflow: "auto",
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexFlow: "column wrap",
    [sizes.down("lg")]: {
      width: "80%",
      alignItems: "center",
    },
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
    gridGap: "2rem",
    marginBottom: "auto",
    [sizes.down("md")]: {
      gridTemplateColumns: "repeat(2, 50%)",
    },
    [sizes.down("sm")]: {
      gridTemplateColumns: "repeat(1, 100%)",
      width: "60%",
    },
  },
};
