import { HashRouter, Route, Routes } from "react-router-dom";

import { LogoThree } from "./pages";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<LogoThree />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
