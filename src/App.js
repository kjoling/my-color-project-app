import "./App.css";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { Routes, Route } from "react-router-dom";
import PaletteList from "./PaletteList";

function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<PaletteList palettes={seedColors} />} />
        <Route path="/palette/:paletteId" element={<Palette />} />
        <Route
          path="/palette/:paletteId/:colorId"
          element={<h1>Individual Color Palette!</h1>}
        />
      </Routes>
      {/* <Palette palette={generatePalette(seedColors[4])} /> */}
    </div>
  );
}

export default App;
