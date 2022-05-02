import "./App.css";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./ColorHelper";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  // const routes = seedColors.map((seedColor) => {
  //   return (
  //     <Route
  //       path={`/palette/:paletteId`}
  //       key={seedColor.paletteName}
  //       id={seedColor.paletteName}
  //       element={<Palette  />}
  //     >
  //       {seedColor.paletteName}
  //     </Route>
  //   );
  // });
  // console.log(routes);

  return (
    <div>
      <Routes>
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        <Route path="/palette/:paletteId" element={<Palette />} />
      </Routes>
      {/* <Palette palette={generatePalette(seedColors[4])} /> */}
    </div>
  );
}

export default App;
