import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.4.0";
import "assets/css/material-dashboard-react.css?v=1.6.0";

// pages for this product
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import PromotionsPage from "views/PromotionsPage/PromotionsPage.jsx";
import TrafficPage from "views/TrafficPage/TrafficPage.jsx";

import LandingPage from "views/LandingPage/LandingPage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import SignupPage from "views/SignupPage/SignupPage.jsx";

import AdminPage from "views/AdminPage/AdminPage.jsx";

var hist = createBrowserHistory();

const Page404 = ({ location }) => (
  <div>
    <h2>No match found for <code>{location.pathname}</code></h2>
  </div>
);

//<Route exact={true} path="/admin/dashboard" component={DashboardPage} />

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact={true} path="/admin/dashboard" component={DashboardPage} />
      <Route exact={true} path="/admin/profile" component={ProfilePage} />
      <Route exact={true} path="/admin/promotions" component={PromotionsPage} />
      <Route exact={true} path="/admin/traffic" component={TrafficPage} />
      <Route exact={true} path="/admin/requests" component={AdminPage} />

      <Route exact={true} path="/login" component={LoginPage} />
      <Route exact={true} path="/signup" component={SignupPage} />
      <Route exact={true} path="/" component={LandingPage} />
      <Route component={Page404} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
