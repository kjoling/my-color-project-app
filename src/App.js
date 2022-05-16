import "./App.css";
import { useState, useEffect } from "react";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { Routes, Route } from "react-router-dom";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [palette, setPalette] = useState(savedPalettes || seedColors);
  const savePalette = (newPalette) => {
    setPalette((currentPalettes) => [...currentPalettes, newPalette]);
  };

  useEffect(() => {
    window.localStorage.setItem("palettes", JSON.stringify(palette));
  }, [palette]);

  const deletePalette = (id) => {
    const newPalettes = palette.filter((p) => p.id !== id);
    setPalette(newPalettes);
  };

  return (
    <div>
      <Routes>
        <Route
          path="*"
          element={
            <PaletteList palettes={palette} deletePalette={deletePalette} />
          }
        />
        <Route
          path="/palette/:paletteId"
          element={<Palette palettes={palette} />}
        />
        <Route
          path="/palette/:paletteId/:colorId"
          element={<SingleColorPalette />}
        />
        <Route
          path="/palette/new"
          element={
            <NewPaletteForm saveNewPalette={savePalette} palettes={palette} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
