import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Login, Signup } from "./components/Authentication";
import PrivateRoute from "./components/commons/PrivateRoute";
import Dashboard from "./components/Dashboard";
import Create from "./components/Posts/Create";
import Show from "./components/Posts/Show";
import { getFromLocalStorage } from "./utils/storage";

import "../stylesheets/App.css";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact component={Create} path="/posts/create" />
        <Route exact component={Show} path="/posts/:slug/show" />
        <Route exact component={Signup} path="/signup" />
        <Route exact component={Login} path="/login" />
        <PrivateRoute
          component={Dashboard}
          condition={isLoggedIn}
          path="/"
          redirectRoute="/login"
        />
      </Switch>
    </Router>
  );
};
export default App;
