import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { css } from "@emotion/css";
import EmojiPicker from "emoji-picker-react";

const defaultValues = {
  colorName: "purple",
};

export default function PaletteMetaForm(props) {
  const { palettes, savePalette, colors, toggleForm, stage, setStage } = props;

  const [paletteName, setPaletteName] = useState("");

  const handleClose = () => {
    toggleForm();
    setStage("form");
  };

  const showEmojiPicker = (data) => {
    setPaletteName(data.saveNewPalette);
    setStage("emoji");
  };

  const handleEmojiSelect = (event, emoji) => {
    const newPalette = {
      paletteName: paletteName,
      emoji: emoji.emoji,
      id: paletteName.replace(/ /g, "-"),
    };
    toggleForm();
    setStage("form");
    savePalette(newPalette);
  };
  const paletteNameValidationSchema = Yup.object().shape({
    saveNewPalette: Yup.string()
      .test("paletteNameCheck", "Name is already taken", (value) => {
        return palettes.every(
          ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
        );
      })
      .required("Value cannot be blank")
      .test("colorsCheck", "Must choose at least 1 color to save!", () => {
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
    <div>
      <Dialog open={stage === "emoji"} onClose={handleClose} disablePortal>
        <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
        <div>
          <EmojiPicker
            onEmojiClick={handleEmojiSelect}
            pickerStyle={{ width: "100%" }}
            preload={true}
          />
        </div>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={stage === "form"} onClose={handleClose}>
        <DialogTitle>Save New Palette</DialogTitle>
        <form
          onSubmit={handlePaletteNameSubmit((data) => {
            showEmojiPicker(data);
          })}
        >
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new color palette!
            </DialogContentText>
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
                    fullWidth
                    margin="normal"
                    placeholder="Palette Name"
                  />
                </div>
              )}
            />
            {Object.keys(errorsPaletteName).length !== 0 ? (
              <div
                className={css`
                  ${styles.error}
                `}
              >
                {errorsPaletteName?.saveNewPalette.message}
              </div>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="primary" type="submit">
              Save New Palette!
            </Button>
          </DialogActions>
        </form>
      </Dialog>
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
