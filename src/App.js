import React from "react";
import { Home } from "./components/Home.js";
import { AccidentsByMake } from "./components/AccidentsByMake.js";
import { MakeList } from "./components/MakeList.js";
import { ModelList } from "./components/ModelList.js";
import { AccidentList } from "./components/AccidentList.js";
import { Router } from "@reach/router";

const Empty = ({ children }) => {
    return children;
};
function App() {
  return (
      <Router>
          <Home path="/" />
          <AccidentsByMake path="makes" />
          <MakeList path="makes/:letter" />
          <ModelList path="makes/:letter/:make" />
          <AccidentList path="makes/:letter/:make/:model" />
      </Router>
  );
}

export default App;
