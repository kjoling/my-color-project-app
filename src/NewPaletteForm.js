import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { v4 as uuidv4 } from "uuid";
import { ChromePicker } from "react-color";
import DraggableColorBox from "./DraggableColorBox";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const drawerWidth = 400;
const defaultValues = {
  colorName: "purple",
};

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    height: "calc(100vh - 215px)",
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function NewPaletteForm() {
  const validationSchema = Yup.object().shape({
    colorName: Yup.string()
      .test("colorNameCheck", "colorNameCheck", (value) => {
        return colors.every(
          ({ name }) => name.toLowerCase() !== value.toLowerCase()
        );
      })
      .test("colorCheck", "colorCheck", () => {
        return colors.every(({ color }) => color !== currentColor);
      })
      .required("Value cannot be blank"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) }, defaultValues);
  const [data, setData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [currentColor, setCurrentColor] = useState([]);
  const [colors, setColors] = useState([]);

  let message;
  if (
    Object.keys(errors).length &&
    errors.colorName.message === "colorNameCheck"
  ) {
    message = "Invalid color name - already in use.";
    // setIsValidSubmit(false);
  }
  if (Object.keys(errors).length && errors.colorName.message === "colorCheck") {
    message = "Invalid color - color already in use.";
    // setIsValidSubmit(false);
  }

  const changeColor = (newColor) => {
    setCurrentColor(newColor.hex);
  };
  const addColor = ({ colorName }) => {
    const newColor = {
      color: currentColor,
      name: colorName,
    };
    setColors((oldColors) => [...oldColors, newColor]);
    setCurrentColor("");
    setData("");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const displayColors = colors.map(({ color, name }) => {
    return <DraggableColorBox color={color} key={uuidv4()} name={name} />;
  });

  const onSubmit = (data) => {
    // setData(data);
    addColor(data);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
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
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography variant="h4">Design your paellte!</Typography>
        <div>
          <Button variant="contained" color="secondary">
            Clear Palette
          </Button>
          <Button variant="contained" color="primary">
            Random Color
          </Button>
        </div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={(newColor) => changeColor(newColor)}
          onChange={changeColor}
          disableAlpha
        />
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <Controller
            control={control}
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
          {Object.keys(errors) ? <div >{message}</div> : null}
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: currentColor }}
            type="submit"
          >
            Add Color
          </Button>
        </form>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {displayColors}
      </Main>
    </Box>
  );
}
