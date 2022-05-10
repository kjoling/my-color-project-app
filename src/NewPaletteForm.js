import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/css";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

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

export default function NewPaletteForm(props) {
  //color name and submission validation:
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
      .required("Value cannot be blank"),
  });
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
    handleSubmit: handleColorNameSubmit,
    control: controlColorName,
    formState: { errors: errorsColorName },
  } = useForm(
    { resolver: yupResolver(colorNameValidationSchema) },
    defaultValues
  );
  const {
    handleSubmit: handlePaletteNameSubmit,
    control: controlPaletteName,
    formState: { errors: errorsPaletteName },
  } = useForm(
    { resolver: yupResolver(paletteNameValidationSchema) },
    defaultValues
  );
  //state and props
  const { palettes } = props;
  const [open, setOpen] = React.useState(false);
  const [currentColor, setCurrentColor] = useState([]);
  const [colors, setColors] = useState([]);
  const navigate = useNavigate();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const deleteColor = (colorName) => {
    setColors(
      colors.filter((color) => {
        return color.name.toLowerCase() !== colorName.toLowerCase();
      })
    );
  };

  const displayColors = colors.map(({ color, name }) => {
    return (
      <DraggableColorBox
        color={color}
        key={uuidv4()}
        name={name}
        handleClick={deleteColor}
        id={name}
      />
    );
  });

  const onSubmit = (data) => {
    addColor(data);
  };

  const savePalette = (data) => {
    const newPaletteName = data.saveNewPalette;
    console.log(data);

    const newPalette = {
      paletteName: newPaletteName,
      colors: colors,
      id: newPaletteName.replace(/ /g, "-"),
    };
    props.saveNewPalette(newPalette);
    navigate("/");
  };
  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setColors((colors) => {
        const oldIndex = colors.indexOf(active.id);
        const newIndex = colors.indexOf(over.id);
      });
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
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
            Persistent drawer
          </Typography>
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
                    required
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
            style={{ backgroundColor: currentColor }}
            type="submit"
          >
            Add Color
          </Button>
        </form>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={colors}>{displayColors}</SortableContext>
        </DndContext>
      </Main>
    </Box>
  );
}

const styles = {
  error: {
    color: "red",
    fontStyle: "italic",
  },
};
