import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Dashboard from "./components/Dashboard";

import "../stylesheets/App.css";

const App = () => (
  <Router>
    <Switch>
      <Route exact component={Dashboard} path="/" />
    </Switch>
  </Router>
);

export default App;
