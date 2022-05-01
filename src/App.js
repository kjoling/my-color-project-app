import "./App.css";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./ColorHelper";
import { Routes, Route } from "react-router-dom";

function App() {
  // const routes = seedColors.map((seedColor) => {
  //   return (
  //     <Route
  //       path={`/palette/${seedColor.paletteName}`}
  //       key={seedColor.paletteName}
  //       id={seedColor.paletteName}
  //       element={<Palette palette={generatePalette(seedColor)} />}
  //     >
  //       {seedColor.paletteName}
  //     </Route>
  //   );
  // });
  // console.log(routes);
  return (
    <div>
      <Routes>
        <Route path="/" element={<h1>Palette List Goes Here</h1>}>
          Home
        </Route>
        <Route path="/palette/:id" element={<h1>Individual Palette Here</h1>} />
        {/* {routes} */}
      </Routes>
      {/* <Palette palette={generatePalette(seedColors[4])} /> */}
    </div>
  );
}

export default App;
