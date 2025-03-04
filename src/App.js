import { HashRouter, Route, Routes } from "react-router-dom";

import { LogoThree, CircularSlide } from "./pages";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<CircularSlide />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
