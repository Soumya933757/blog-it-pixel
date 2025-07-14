import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { QueryClientProvider } from "react-query";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Login, Signup } from "./components/Authentication";
import PrivateRoute from "./components/commons/PrivateRoute";
import Dashboard from "./components/Dashboard";
import MyBlogs from "./components/MyBlogs";
import Create from "./components/Posts/Create";
import Edit from "./components/Posts/Edit";
import Show from "./components/Posts/Show";
import queryClient from "./utils/queryClient";
import { getFromLocalStorage } from "./utils/storage";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ToastContainer />
        <Switch>
          <Route exact component={Edit} path="/posts/:slug/edit" />
          <Route exact component={Create} path="/posts/create" />
          <Route exact component={Show} path="/posts/:slug/show" />
          <Route exact component={Signup} path="/signup" />
          <Route exact component={Login} path="/login" />
          <Route exact component={MyBlogs} path="/my-blogs" />
          <PrivateRoute
            component={Dashboard}
            condition={isLoggedIn}
            path="/"
            redirectRoute="/login"
          />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
};
export default App;
