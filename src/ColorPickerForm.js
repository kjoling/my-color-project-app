import React, { useState } from "react";
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
    <div>
      <ChromePicker
        color={currentColor}
        onChangeComplete={(newColor) => changeColor(newColor)}
        onChange={changeColor}
        disableAlpha
      />
      <form onSubmit={handleColorNameSubmit((data) => onSubmit(data))}>
        <Controller
          control={controlColorName}
          name="colorName"
          render={({ field: { onChange, onBlur, value = "" } }) => (
            <div>
              <TextField
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                required
              />
            </div>
          )}
        />
        {Object.keys(errorsColorName).length !== 0 ? (
          <div
            className={css`
              ${styles.error}
            `}
          >
            {errorsColorName?.colorName.message}
          </div>
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
        >
          {btnText}
        </Button>
      </form>
    </div>
  );
}

const styles = {
  error: {
    color: "red",
    fontStyle: "italic",
  },
  link: {
    textDecoration: "none",
  },
};
