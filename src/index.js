import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.4.0";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import SignupPage from "views/SignupPage/SignupPage.jsx";

var hist = createBrowserHistory();

const Page404 = ({ location }) => (
   <div>
    <h2>No match found for <code>{location.pathname}</code></h2>
   </div>
);

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact={true} path="/login" component={LoginPage} />
      <Route exact={true} path="/profile" component={ProfilePage} />
      <Route path="/signup" component={SignupPage} />
      <Route exact={true} path="/" component={LandingPage} />
      <Route component={Page404} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
