import "./App.css";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./ColorHelper";
import { Routes, Route, Navigate } from "react-router-dom";
import PaletteList from "./PaletteList";

function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<PaletteList palettes={seedColors} />} />
        <Route path="/palette/:paletteId" element={<Palette />} />
      </Routes>
      {/* <Palette palette={generatePalette(seedColors[4])} /> */}
    </div>
  );
}

export default App;
