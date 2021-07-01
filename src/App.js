import React from "react";
import { Home } from "./components/Home.js";
import { AccidentsByMakeAndModel } from "./components/AccidentsByMakeAndModel.js";
import { MakeModelList } from "./components/MakeModelList.js";
import { AccidentList } from "./components/AccidentList.js";
import { Results } from "./components/Results.js";
import { Router, Link } from "@reach/router";

const Empty = ({ children }) => {
    return children;
};
function App() {
  return (
      <>
              <nav>
                  <Link to="/">Home</Link>
                  <Link to="/makeAndModel">Search Accidents by Make and Model</Link>
              </nav>
              <Router primary={false}>
                  <Home path="/" />
                  <AccidentsByMakeAndModel path="makeAndModel" />
                  <MakeModelList path="makeAndModel/:letter" />
                  <AccidentList path="makeAndModel/:letter/:make-model" />
                  <Results path="/results" />
              </Router>
      </>
  );
}

export default App;
