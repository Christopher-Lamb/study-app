import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <>
      
      <Router>
        <Switch>
          <Route component={Home} exact path="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
