/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import { List, ListItem, withStyles } from "@material-ui/core";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import footerStyle from "assets/jss/material-kit-react/components/footerStyle.jsx";

function Footer({ ...props }) {
  const { classes, whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const faSize = {
    fontSize: "32px"
  };
  const links = [
    { href: "mailto:nvdbluetwo@gmail.com", fa: "fas fa-envelope"},
    { href: "https://github.com/dealmetoday", fa: "fab fa-github"}
  ].map(link => {
    link.key = `nav-link-${link.href}-${link.fa}`
    return link
  });

  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            {links.map(({ key, href, fa }) => (
              <ListItem className={classes.inlineBlock} key={key}>
                <a
                  href={href}
                  className={classes.block}
                  target="_blank"
                >
                  <div style={faSize}>
                    <i className={fa}></i>
                  </div>
                </a>
              </ListItem>
            ))}
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} DealMe
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  whiteFont: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
