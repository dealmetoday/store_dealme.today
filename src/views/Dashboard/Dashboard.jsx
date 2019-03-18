import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import DashboardHeader from "components/Header/DashboardHeader.jsx";
import DashboardHeaderLinks from "components/Header/DashboardHeaderLinks.jsx";
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import Visibility from "@material-ui/icons/Visibility";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import routes from "routes.js";
import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";

import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const dashboardRoutes = [];

function createData(id, name, views, claims, active) {
  return { id, name, views, claims, active };
}

const tablerows = [
  createData(1, '$10 off Mens Footwear', 159, 100, "Active"),
  createData(2, '10% off Headwear', 140, 98, "Active"),
  createData(3, '25% off Womens Shirts', 130, 95, "Inactive"),
  createData(4, '$20 off Mens Shirts', 127, 80, "Inactive"),
  createData(5, '$5 off Kids Shirts', 119, 78, "Active"),
];

class DashboardPage extends React.Component {
  state = {
    value: 0,
    mobileOpen: false
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes, ...rest } = this.props;
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
          <GridItem xs={10} sm={10} md={10}>
            <GridContainer>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="warning" stats icon>
                    <CardIcon color="warning">
                      <Icon>content_copy</Icon>
                    </CardIcon>
                    <h3 className={classes.cardTitleWhite}>Promotions</h3>
                  </CardHeader>
                  <CardBody>
                    <p className={classes.cardCategory}>
                      Active Promotions: 15
                    </p>
                    <p className={classes.cardCategory}>
                      Inactive Promotions: 10
                    </p>
                    <p className={classes.cardCategory}>
                      Total Promotions: 25
                    </p>
                  </CardBody>
                  <hr width="80%" size="1" color="#999999" />
                  <CardFooter>
                    <p className={classes.cardCategory}>
                      Promotions information overview
                    </p>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="success" stats icon>
                    <CardIcon color="success">
                      <Accessibility />
                    </CardIcon>
                    <h3 className={classes.cardTitleWhite}>Traffic</h3>
                  </CardHeader>
                  <CardBody>
                    <p className={classes.cardCategory}>
                      Visitors Today: 112
                    </p>
                    <p className={classes.cardCategory}>
                      Vistors This Week: 806
                    </p>
                    <p className={classes.cardCategory}>
                      Visitors This Month: 3511
                    </p>
                  </CardBody>
                  <hr width="80%" size="1" color="#999999" />
                  <CardFooter>
                    <p className={classes.cardCategory}>
                      Overview of store visitor information
                    </p>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="danger" stats icon>
                    <CardIcon color="danger">
                      <Visibility />
                    </CardIcon>
                    <h3 className={classes.cardTitleWhite}>Views</h3>
                  </CardHeader>
                  <CardBody>
                    <p className={classes.cardCategory}>
                      Promotions Viewed Today: 60
                    </p>
                    <p className={classes.cardCategory}>
                      Promotions Viewed This Week: 401
                    </p>
                    <p className={classes.cardCategory}>
                      Promotions Viewed This Month: 2255
                    </p>
                  </CardBody>
                  <hr width="80%" size="1" color="#999999" />
                  <CardFooter>
                    <p className={classes.cardCategory}>
                      Overview of promotion views information
                    </p>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="info" stats icon>
                    <CardIcon color="info">
                      <Icon>info_outline</Icon>
                    </CardIcon>
                    <h3 className={classes.cardTitleWhite}>Claims</h3>
                  </CardHeader>
                  <CardBody>
                    <p className={classes.cardCategory}>
                      Promotions Claimed Today: 29
                    </p>
                    <p className={classes.cardCategory}>
                      Promotions Claimed This Week: 199
                    </p>
                    <p className={classes.cardCategory}>
                      Promotions Claimed This Month: 1102
                    </p>
                  </CardBody>
                  <hr width="80%" size="1" color="#999999" />
                  <CardFooter>
                    <p className={classes.cardCategory}>
                      Overview of promotion claims information
                    </p>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <Card>
                  <CardHeader color="warning">
                    <CardIcon>
                      <Icon>content_copy</Icon>
                    </CardIcon>
                    <h3 className={classes.cardTitleWhite}>Top Performing Promotions</h3>
                  </CardHeader>
                  <CardBody justify="center">
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell align="left">Promotion</TableCell>
                          <TableCell align="right">Views</TableCell>
                          <TableCell align="right">Claims</TableCell>
                          <TableCell align="right">Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tablerows.map(row => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row" align="right">{row.id}</TableCell>
                            <TableCell component="th" scope="row" align="left">{row.name}</TableCell>
                            <TableCell component="th" scope="row" align="right">{row.views}</TableCell>
                            <TableCell component="th" scope="row" align="right">{row.claims}</TableCell>
                            <TableCell component="th" scope="row" align="right">{row.active}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardBody>
                </Card>
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <Card chart>
                  <CardHeader color="success">
                    <ChartistGraph
                      className="ct-chart"
                      data={dailySalesChart.data}
                      type="Line"
                      options={dailySalesChart.options}
                      listener={dailySalesChart.animation}
                    />
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Weekly Store Traffic</h4>
                    <p className={classes.cardCategory}>
                      <span className={classes.successText}>
                        <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                      </span>{" "}
                      increase in today sales.
                    </p>
                  </CardBody>
                  <CardFooter chart>
                    <div className={classes.stats}>
                      <AccessTime /> updated 4 minutes ago
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <Card chart>
                  <CardHeader color="danger">
                    <ChartistGraph
                      className="ct-chart"
                      data={dailySalesChart.data}
                      type="Line"
                      options={dailySalesChart.options}
                      listener={dailySalesChart.animation}
                    />
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Weekly Promotion Views</h4>
                    <p className={classes.cardCategory}>
                      <span className={classes.successText}>
                        <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                      </span>{" "}
                      increase in today sales.
                    </p>
                  </CardBody>
                  <CardFooter chart>
                    <div className={classes.stats}>
                      <AccessTime /> updated 4 minutes ago
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <Card chart>
                  <CardHeader color="info">
                    <ChartistGraph
                      className="ct-chart"
                      data={dailySalesChart.data}
                      type="Line"
                      options={dailySalesChart.options}
                      listener={dailySalesChart.animation}
                    />
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Weekly Promotion Claims</h4>
                    <p className={classes.cardCategory}>
                      <span className={classes.successText}>
                        <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                      </span>{" "}
                      increase in today sales.
                    </p>
                  </CardBody>
                  <CardFooter chart>
                    <div className={classes.stats}>
                      <AccessTime /> updated 4 minutes ago
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(DashboardPage);
