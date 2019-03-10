import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";

import teamStyle from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.jsx";

import team_ahong from "assets/img/team/team_ahong.png"
import team_chackwell from "assets/img/team/team_chackwell.jpg"
import team_drulofs from "assets/img/team/team_drulofs.jpg"
import team_lmarcil from "assets/img/team/team_lmarcil.jpg"
import team_mstefanovic from "assets/img/team/team_mstefanovic.png"
import team_rliu from "assets/img/team/team_rliu.jpg"

class TeamSection extends React.Component {
  render() {
    const { classes } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    return (
      <div className={classes.section}>
        <h2 className={classes.title}>Our Team</h2>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={team_drulofs} alt="Darren Rulofs - CEO" className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Darren Rulofs
                  <br />
                  <small className={classes.smallTitle}>CEO</small>
                </h4>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={team_lmarcil} alt="Liam Marcil - CFO" className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Liam Marcil
                  <br />
                  <small className={classes.smallTitle}>CFO</small>
                </h4>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={team_chackwell} alt="Catherine Hackwell - COO" className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Catherine Hackwell
                  <br />
                  <small className={classes.smallTitle}>COO</small>
                </h4>
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={team_rliu} alt="Ryan Liu - CTO" className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Ryan Liu
                  <br />
                  <small className={classes.smallTitle}>CTO</small>
                </h4>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={team_ahong} alt="Alfred Hong - CXO" className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Alfred Hong
                  <br />
                  <small className={classes.smallTitle}>CXO</small>
                </h4>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={team_mstefanovic} alt="Mihailo Stefanovic - CPO" className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Mihailo Stefanovic
                  <br />
                  <small className={classes.smallTitle}>CPO</small>
                </h4>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(teamStyle)(TeamSection);
