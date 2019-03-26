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

class HeaderLinks extends React.Component {
  constructor(props) {
    super(props);
  }

  redirectSignin = () => {
    this.props.history.push("/login");
  }

  redirectSignup = () => {
    this.props.history.push("/signup");
  }

  render() {
    const { classes, ...rest } = this.props;

    return (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            className={classes.navLink}
            onClick={this.redirectSignin}
          >
            Sign in
          </Button>
          <Button
            color="transparent"
            className={classes.navLink}
            onClick={this.redirectSignup}
          >
            Sign up
          </Button>
        </ListItem>
      </List>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
