import React from "react";
import { Home } from "./components/Home.js";
import { AccidentsByMakeAndModel } from "./components/AccidentsByMakeAndModel.js";
import { MakeModelList } from "./components/MakeModelList.js";
import { AccidentList } from "./components/AccidentList.js";
import { Router } from "@reach/router";

const Empty = ({ children }) => {
    return children;
};
function App() {
  return (
      <Router>
          <Home path="/" />
          <AccidentsByMakeAndModel path="makeAndModel" />
          <MakeModelList path="makeAndModel/:letter" />
          <AccidentList path="makeAndModel/:letter/:make-model" />
      </Router>
  );
}

export default App;
