import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LensBlurIcon from "@mui/icons-material/LensBlur";
import { v4 as uuidv4 } from "uuid";
import DraggableColorBox from "./DraggableColorBox";
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
  rectSwappingStrategy,
} from "@dnd-kit/sortable";
import seedColors from "./seedColors";

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

NewPaletteForm.defaultProps = {
  maxColors: 20,
};

export default function NewPaletteForm(props) {
  //state and props
  const { palettes, maxColors } = props;
  const [open, setOpen] = React.useState(false);

  const getRandomColor = () => {
    const allColors = seedColors.map((palette) => palette.colors).flat();
    const rand = Math.floor(Math.random() * allColors.length);
    return allColors[rand];
  };

  const randColor = getRandomColor().color;
  const getRandomPalette = Math.floor(Math.random() * seedColors.length);

  const [currentColor, setCurrentColor] = useState(randColor);
  const [colors, setColors] = useState(seedColors[getRandomPalette].colors);
  const navigate = useNavigate();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const clearColors = () => {
    setColors([]);
  };

  const addRandomColor = () => {
    //pick random color from all palettes that are currently stored, no duplicate colors added
    let randomColor = getRandomColor();
    setColors((oldColors) => [...oldColors, randomColor]);
    setCurrentColor(randomColor.color);
  };

  const changeColor = (newColor) => {
    setCurrentColor(newColor.hex);
  };
  const addColor = ({ colorName }) => {
    const newColor = {
      color: currentColor,
      name: colorName,
    };
    setColors((oldColors) => [...oldColors, newColor]);
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
    console.log(data);
  };

  const savePalette = (data) => {
    const newPalette = {
      ...data,
      colors: colors,
    };
    props.saveNewPalette(newPalette);
    navigate("/");
  };

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setColors((colors) => {
        const oldIndex = colors.findIndex((color) => color.name === active.id);
        const newIndex = colors.findIndex((color) => color.name === over.id);
        return arrayMove(colors, oldIndex, newIndex);
      });
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      <PaletteFormNav
        palettes={palettes}
        maxColors={maxColors}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        savePalette={savePalette}
        colors={colors}
      />
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
        <div
          className={css`
            ${styles.container}
          `}
        >
          <Typography variant="h4" gutterBottom>
            Design your paellte!
          </Typography>
          <div
            className={css`
              ${styles.buttons}
            `}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={clearColors}
              className={css`
                ${styles.button}
              `}
            >
              Clear Palette
            </Button>
            <Button
              className={css`
                ${styles.button}
              `}
              variant="contained"
              color="primary"
              onClick={addRandomColor}
              disabled={colors.length >= maxColors}
            >
              {colors.length >= maxColors
                ? "Palette full!"
                : "Add Random Color"}{" "}
            </Button>
          </div>
          <ColorPickerForm
            colors={colors}
            currentColor={currentColor}
            defaultValues={defaultValues}
            changeColor={changeColor}
            onSubmit={onSubmit}
            maxColors={maxColors}
            addColor={addColor}
          />
          {colors.length < 20 ? (
            <LensBlurIcon
              sx={{
                color: currentColor,
                fontSize: 200,
                width: "50%",
                height: "25%",
                margin: "0 auto",
                display: "inline-block",
                position: "relative",
                marginBottom: "-3.5px",
                marginTop: "5px",
              }}
            />
          ) : undefined}
        </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(event) => handleDragEnd(event)}
        >
          <SortableContext
            items={colors.map((color) => {
              return color.name;
            })}
            strategy={rectSwappingStrategy}
          >
            {displayColors}
          </SortableContext>
        </DndContext>
      </Main>
    </Box>
  );
}

const styles = {
  buttons: { width: "100%" },
  button: { width: "50%" },
  container: {
    alignSelf: "center",
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
};
