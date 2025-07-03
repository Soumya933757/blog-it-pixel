import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dashboard from "./components/Dashboard";
import Create from "./components/Posts/Create";
import Show from "./components/Posts/Show";

import "../stylesheets/App.css";

const App = () => (
  <Router>
    <ToastContainer />
    <Switch>
      <Route exact component={Dashboard} path="/" />
      <Route exact component={Create} path="/posts/create" />
      <Route exact component={Show} path="/posts/:slug/show" />
    </Switch>
  </Router>
);

export default App;
