import "./App.css";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { Routes, Route } from "react-router-dom";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";

function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<PaletteList palettes={seedColors} />} />
        <Route path="/palette/:paletteId" element={<Palette />} />
        <Route
          path="/palette/:paletteId/:colorId"
          element={<SingleColorPalette />}
        />
        <Route path="/palette/new" element={<NewPaletteForm />} />
      </Routes>
    </div>
  );
}

export default App;
