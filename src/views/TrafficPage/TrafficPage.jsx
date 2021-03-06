import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Redirect } from "react-router-dom";

// Material React Kit Components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import DashboardHeader from "components/Header/DashboardHeader.jsx";
import DashboardHeaderLinks from "components/Header/DashboardHeaderLinks.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

// Styles, Icons, and Images
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Accessibility from "@material-ui/icons/Accessibility";

// Custom Page Sections
import Demographics from "./Sections/Demographics.jsx";
import MainStats from "./Sections/MainStats.jsx";
import TrafficTimeline from "./Sections/TrafficTimeline.jsx";

const dashboardRoutes = [];

class TrafficPage extends React.Component {
  componentDidCatch(error, info) {
    console.log("PromotionsPage caught error");
    console.log(error);
    console.log(info);
    this.setState({ renderError: true });
  }

  render() {
    const { classes, ...rest } = this.props;
    if (typeof global.stats === "undefined") {
      return <Redirect to="/login" />
    }
    return (
      <div>
        <DashboardHeader
          color="dark"
          routes={dashboardRoutes}
          brand="DealMe"
          rightLinks={<DashboardHeaderLinks history={this.props.history}/>}
          fixed
          {...rest}
        />
        <br/><br/><br/><br/><br/>
        <GridContainer justify="center">
          <GridItem xs={11} sm={10} md={10}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <Card>
                  <CardHeader color="success" stats="true" icon="true">
                    <CardIcon color="success">
                      <Accessibility />
                    </CardIcon>
                    <h3 className={classes.cardTitleWhite}>Traffic Breakdown</h3>
                  </CardHeader>
                  <CardBody>
                    <MainStats />
                    <Demographics />
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
              <Card>
                  <CardHeader color="success" stats="true" icon="true">
                    <CardIcon color="success">
                      <Accessibility />
                    </CardIcon>
                    <h3 className={classes.cardTitleWhite}>Traffic Timeline</h3>
                  </CardHeader>
                  <CardBody>
                    <TrafficTimeline />
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

TrafficPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(TrafficPage);
