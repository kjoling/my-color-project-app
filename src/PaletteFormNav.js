import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { css } from "@emotion/css";

const drawerWidth = 400;
const defaultValues = {
  colorName: "purple",
};

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

  const paletteNameValidationSchema = Yup.object().shape({
    saveNewPalette: Yup.string()
      .test("paletteNameCheck", "Name is already taken", (value) => {
        return palettes.every(
          ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
        );
      })
      .required("Value cannot be blank")
      .test("colorsCheck", "Must choose at least 1 color to save!", () => {
        console.log(colors);
        return colors.length !== 0;
      }),
  });

  const {
    handleSubmit: handlePaletteNameSubmit,
    control: controlPaletteName,
    formState: { errors: errorsPaletteName },
  } = useForm(
    { resolver: yupResolver(paletteNameValidationSchema) },
    defaultValues
  );

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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Create Your Own Color Palette:
          </Typography>
        </Toolbar>
        <div
          className={css`
            ${styles.navBtns}
          `}
        >
          <form onSubmit={handlePaletteNameSubmit((data) => savePalette(data))}>
            <Controller
              control={controlPaletteName}
              name="saveNewPalette"
              render={({ field: { onChange, onBlur, value = "" } }) => (
                <div>
                  <TextField
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    variant="filled"
                    required
                    placeholder="Palette Name"
                  />
                </div>
              )}
            />
            <Button variant="contained" color="primary" type="submit">
              Save New Palette!
            </Button>
          </form>
          {Object.keys(errorsPaletteName).length !== 0 ? (
            <div
              className={css`
                ${styles.error}
              `}
            >
              {errorsPaletteName?.saveNewPalette.message}
            </div>
          ) : null}
          <div>
            <Link
              to="/"
              className={css`
                ${styles.link}
              `}
            >
              <Button variant="contained" color="secondary">
                Go back!
              </Button>
            </Link>
          </div>
        </div>
      </AppBar>
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
  },
  error: {
    color: "red",
    fontStyle: "italic",
  },
  link: {
    textDecoration: "none",
  },
  navBtns: {},
};
