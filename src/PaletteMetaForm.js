import * as React from "react";
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

const defaultValues = {
  colorName: "purple",
};

export default function PaletteMetaForm(props) {
  const [open, setOpen] = React.useState(true);
  const { palettes, savePalette, colors, showForm } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    showForm(false);
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
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save New Palette</DialogTitle>
        <form onSubmit={handlePaletteNameSubmit((data) => savePalette(data))}>
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
