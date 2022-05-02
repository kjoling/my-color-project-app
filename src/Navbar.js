import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";
import Select from "@mui/material/Select";
import { MenuItem, IconButton } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const { level, changeLevel, changeFormat } = props;
  const [format, setFormat] = useState("hex");
  const [open, setOpen] = useState(false);

  const handleFormatChange = (evt) => {
    setFormat(evt.target.value);
    changeFormat(evt);
    setOpen(true);
  };
  const closeSnackbar = () => {
    setOpen(false);
  };
  return (
    <nav className="Navbar">
      <div className="logo">
        <Link to="/">React Color Picker</Link>
      </div>
      <div className="slider-container">
        <span>Level: {level} </span>
        <div className="slider">
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onAfterChange={changeLevel}
            trackStyle={{ backgroundColor: "transparent" }}
            handleStyle={{
              backgroundColor: "green",
              outline: "none",
              border: "2px solid green",
              boxShadow: "none",
              width: "13px",
              height: "13px",
              marginLeft: "-7px",
              marginTop: "-3px",
            }}
            railStyle={{ height: 8 }}
          />
        </div>
      </div>
      <div className="select-container">
        <Select value={format} onChange={handleFormatChange}>
          <MenuItem value="hex">HEX - #ffffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255, 255, 255) </MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
        </Select>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        onClose={closeSnackbar}
        message={<span>Format changed to {format.toUpperCase()}</span>}
        autoHideDuration={3000}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        action={[
          <IconButton
            onClick={closeSnackbar}
            color="inherit"
            key="close"
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </nav>
  );
}
