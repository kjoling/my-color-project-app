import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import PaletteMetaForm from "./PaletteMetaForm";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";
import { css } from "@emotion/css";
import sizes from "./sizes";

const drawerWidth = 400;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  flexDirection: "row",
  justifyContent: "space-between",
  height: "64px",
  alignItems: "center",
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function PaletteFormNav(props) {
  const { palettes, open, handleDrawerOpen, savePalette, colors } = props;
  const [formShowing, setFormShowing] = useState(false);
  const [stage, setStage] = useState("form");

  const toggleForm = () => {
    setFormShowing(!formShowing);
  };

  return (
    <div
      className={css`
        ${styles.root}
      `}
    >
      <CssBaseline />
      <AppBar position="fixed" open={open} color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Create a Color Palette:
          </Typography>
        </Toolbar>
        <div
          className={css`
            ${styles.navBtns}
          `}
        >
          <Button variant="contained" onClick={toggleForm} sx={styles.button}>
            Save
          </Button>

          <Link
            to="/"
            className={css`
              ${styles.link}
            `}
          >
            <Button variant="contained" color="secondary" sx={styles.button}>
              Go back!
            </Button>
          </Link>
        </div>
      </AppBar>
      {formShowing && (
        <PaletteMetaForm
          palettes={palettes}
          savePalette={savePalette}
          colors={colors}
          toggleForm={toggleForm}
          stage={stage}
          setStage={setStage}
        />
      )}
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    marginBottom: "auto",
  },
  error: {
    color: "red",
    fontStyle: "italic",
  },
  link: {
    textDecoration: "none",
  },
  navBtns: {
    marginRight: "1rem",
  },
  button: {
    margin: "auto 0.5rem",
    [sizes.down("sm")]: {
      margin: "0.05rem .1rem",
      padding: "0.05rem",
    },
  },
};
