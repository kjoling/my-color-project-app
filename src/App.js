import "./App.css";
import { useState } from "react";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { Routes, Route } from "react-router-dom";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";

function App() {
  const [palette, setPalette] = useState(seedColors);
  const savePalette = (newPalette) => {
    setPalette((currentPalettes) => [...currentPalettes, newPalette]);
  };
  return (
    <div>
      <Routes>
        <Route path="*" element={<PaletteList palettes={palette} />} />
        <Route path="/palette/:paletteId" element={<Palette palettes={palette} />} />
        <Route
          path="/palette/:paletteId/:colorId"
          element={<SingleColorPalette />}
        />
        <Route
          path="/palette/new"
          element={<NewPaletteForm saveNewPalette={savePalette} />}
        />
      </Routes>
    </div>
  );
}

export default App;
