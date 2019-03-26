/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";

class DashboardHeaderLinks extends React.Component {
  constructor(props) {
    super(props);
  }

  redirectDashboard = () => {
    this.props.history.push("/admin/dashboard");
  }

  redirectProfile = () => {
    this.props.history.push("/admin/profile");
  }

  redirectPromotions = () => {
    this.props.history.push("/admin/promotions");
  }

  redirectTraffic = () => {
    this.props.history.push("/admin/traffic");
  }

  render() {
    const { classes, ...rest } = this.props;

    return (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            className={classes.navLink}
            onClick={this.redirectDashboard}
          >
            Dashboard
          </Button>
          <Button
            color="transparent"
            className={classes.navLink}
            onClick={this.redirectProfile}
          >
            Profile
          </Button>
          <Button
            color="transparent"
            className={classes.navLink}
            onClick={this.redirectPromotions}
          >
            Promotions
          </Button>
          <Button
            color="transparent"
            className={classes.navLink}
            onClick={this.redirectTraffic}
          >
            Traffic
          </Button>
        </ListItem>
      </List>
    );
  }
}

export default withStyles(headerLinksStyle)(DashboardHeaderLinks);
