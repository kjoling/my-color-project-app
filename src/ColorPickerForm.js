import React from "react";
import { Button } from "@mui/material";
import { ChromePicker } from "react-color";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { css } from "@emotion/css";

export default function ColorPickerForm(props) {
  const {
    colors,
    currentColor,
    defaultValues,
    changeColor,
    onSubmit,
    maxColors,
  } = props;

  const colorNameValidationSchema = Yup.object().shape({
    colorName: Yup.string()
      .test("colorNameCheck", "Name is already taken", (value) => {
        return colors.every(
          ({ name }) => name.toLowerCase() !== value.toLowerCase()
        );
      })
      .test("colorCheck", "Color is already taken", () => {
        return colors.every(({ color }) => color !== currentColor);
      })
      .test("colorSelectedCheck", "Please select a color", () => {
        return currentColor.length !== 0;
      })
      .required("Value cannot be blank"),
  });

  const {
    handleSubmit: handleColorNameSubmit,
    control: controlColorName,
    formState: { errors: errorsColorName },
  } = useForm(
    { resolver: yupResolver(colorNameValidationSchema) },
    defaultValues
  );

  const disabled = colors.length >= maxColors;

  const btnText = <div>{disabled ? "Palette full!" : "Add Color"}</div>;

  return (
    <div
      className={css`
        ${styles.root}
      `}
    >
      <ChromePicker
        color={currentColor}
        onChangeComplete={(newColor) => changeColor(newColor)}
        onChange={changeColor}
        disableAlpha
        className={css`
          ${styles.picker}
        `}
      />
      <form onSubmit={handleColorNameSubmit((data) => onSubmit(data))}>
        <Controller
          control={controlColorName}
          name="colorName"
          render={({ field: { onChange, onBlur, value = "" } }) => (
            <TextField
              placeholder="Color Name"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              variant="filled"
              required
              className={css`
                ${styles.colorName}
              `}
            />
          )}
        />
        {Object.keys(errorsColorName).length !== 0 ? (
          <span
            className={css`
              ${styles.error}
            `}
          >
            {errorsColorName?.colorName.message}
          </span>
        ) : null}
        <Button
          variant="contained"
          color="primary"
          style={
            !disabled
              ? { backgroundColor: currentColor }
              : { backgroundColor: undefined }
          }
          type="submit"
          disabled={disabled}
          className={css`
            ${styles.addColor}
          `}
        >
          {btnText}
        </Button>
      </form>
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    fontStyle: "italic",
  },
  link: {
    textDecoration: "none",
  },
  picker: {
    width: "100% !important",
    marginTop: "2rem",
    marginBottom: "1rem",
  },
  addColor: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "1rem !important",
    marginTop: "1rem !important",
  },
  colorName: {
    width: "100% !important",
    height: "70px",
  },
};
