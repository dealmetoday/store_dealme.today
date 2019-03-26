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
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import Visibility from "@material-ui/icons/Visibility";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import {
  trafficChart,
  viewChart,
  claimChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

// Utils
import Utils from "components/Utils/Utils.jsx";

const Chartist = require("chartist");
const dashboardRoutes = [];
const minute = 60 * 1000;

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
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      mobileOpen: false,
      lastUpdated: 0,
    };

    this.utils = new Utils();
  }

  add = (accumulator, a) => {
    return accumulator + a;
  }

  componentDidMount() {
    this.timeInterval = setInterval(() => {
      this.setState({ lastUpdated: this.state.lastUpdated + 1 });
    }, minute);

    this.updateInterval = setInterval(() => {
      this.setState({ lastUpdated: 0 });
      this.utils.getData(global.id, global.bearer);
    }, 30*minute);
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
    clearInterval(this.updateInterval);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, ...rest } = this.props;
    console.log("CUST", global.stats.customersWeek);
    console.log("VIEW", global.stats.viewsWeek);
    console.log("CLAIM", global.stats.claimsWeek);
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
                  <CardHeader color="warning" stats="true" icon="true">
                    <CardIcon color="warning">
                      <Icon>content_copy</Icon>
                    </CardIcon>
                    <h3 className={classes.cardTitleWhite}>Promotions</h3>
                  </CardHeader>
                  <CardBody>
                    <p className={classes.cardCategory}>
                      Active Promotions: {global.stats.activeDeals.length}
                    </p>
                    <p className={classes.cardCategory}>
                      Inactive Promotions: {global.stats.allDeals.length - global.stats.activeDeals.length}
                    </p>
                    <p className={classes.cardCategory}>
                      Total Promotions: {global.stats.allDeals.length}
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
                  <CardHeader color="success" stats="true" icon="true">
                    <CardIcon color="success">
                      <Accessibility />
                    </CardIcon>
                    <h3 className={classes.cardTitleWhite}>Traffic</h3>
                  </CardHeader>
                  <CardBody>
                    <p className={classes.cardCategory}>
                      Visitors Today: {global.stats.customersWeek[0]}
                    </p>
                    <p className={classes.cardCategory}>
                      Vistors This Week: {global.stats.customersWeek.reduce(this.add)}
                    </p>
                    <p className={classes.cardCategory}>
                      Visitors This Month: {global.stats.customersMonth}
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
                  <CardHeader color="danger" stats="true" icon="true">
                    <CardIcon color="danger">
                      <Visibility />
                    </CardIcon>
                    <h3 className={classes.cardTitleWhite}>Views</h3>
                  </CardHeader>
                  <CardBody>
                    <p className={classes.cardCategory}>
                      Promotions Viewed Today: {global.stats.viewsWeek[0]}
                    </p>
                    <p className={classes.cardCategory}>
                      Promotions Viewed This Week: {global.stats.viewsWeek.reduce(this.add)}
                    </p>
                    <p className={classes.cardCategory}>
                      Promotions Viewed This Month: {global.stats.viewsMonth}
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
                  <CardHeader color="info" stats="true" icon="true">
                    <CardIcon color="info">
                      <Icon>info_outline</Icon>
                    </CardIcon>
                    <h3 className={classes.cardTitleWhite}>Claims</h3>
                  </CardHeader>
                  <CardBody>
                    <p className={classes.cardCategory}>
                      Promotions Claimed Today: {global.stats.claimsWeek[0]}
                    </p>
                    <p className={classes.cardCategory}>
                      Promotions Claimed This Week: {global.stats.claimsWeek.reduce(this.add)}
                    </p>
                    <p className={classes.cardCategory}>
                      Promotions Claimed This Month: {global.stats.claimsMonth}
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
                    <CardIcon color="warning">
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
                        {global.promotions
                          .sort((a, b) => (a.claims < b.claims) ? 1 : -1)
                          .map((promotion, index) => (
                            <TableRow key={index}>
                              <TableCell component="th" scope="row" align="right">
                                {index + 1}
                              </TableCell>
                              <TableCell component="th" scope="row" align="left">
                                {promotion.description}
                              </TableCell>
                              <TableCell component="th" scope="row" align="right">
                                {promotion.views}
                              </TableCell>
                              <TableCell component="th" scope="row" align="right">
                                {promotion.claims}
                              </TableCell>
                              <TableCell component="th" scope="row" align="right">
                                {promotion.isActive ? "Active" : "Inactive"}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                      {/* <TableBody>
                        {tablerows.map(row => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row" align="right">{row.id}</TableCell>
                            <TableCell component="th" scope="row" align="left">{row.name}</TableCell>
                            <TableCell component="th" scope="row" align="right">{row.views}</TableCell>
                            <TableCell component="th" scope="row" align="right">{row.claims}</TableCell>
                            <TableCell component="th" scope="row" align="right">{row.active}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody> */}
                    </Table>
                  </CardBody>
                </Card>
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <Card >
                  <CardHeader color="success">
                    <ChartistGraph
                      className="ct-chart"
                      data={{
                        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                        series: [global.stats.customersWeek.reverse()],
                      }}
                      type="Line"
                      options={{
                        lineSmooth: Chartist.Interpolation.cardinal({ tension: 0 }),
                        low: 0,
                        high: Math.max(global.stats.customersWeek) * 1.1,
                        chartPadding: { top: 5, right: 5, bottom: 5, left: 5 }
                      }}
                      listener={trafficChart.animation}
                    />
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Weekly Store Traffic</h4>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <Card>
                  <CardHeader color="danger">
                    <ChartistGraph
                      className="ct-chart"
                      data={{
                        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                        series: [global.stats.viewsWeek.reverse()]
                      }}
                      type="Line"
                      options={{
                        lineSmooth: Chartist.Interpolation.cardinal({ tension: 0 }),
                        low: 0,
                        high: Math.max(global.stats.viewsWeek) * 1.1,
                        chartPadding: { top: 5, right: 5, bottom: 5, left: 5 }
                      }}
                      listener={viewChart.animation}
                    />
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Weekly Promotion Views</h4>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <Card>
                  <CardHeader color="info">
                    <ChartistGraph
                      className="ct-chart"
                      data={{
                        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                        series: [global.stats.claimsWeek.reverse()],
                      }}
                      type="Line"
                      options={{
                        lineSmooth: Chartist.Interpolation.cardinal({ tension: 0 }),
                        low: 0,
                        high: Math.max(global.stats.claimsWeek) * 1.1,
                        chartPadding: { top: 5, right: 5, bottom: 5, left: 5 }
                      }}
                      listener={claimChart.animation}
                    />
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Weekly Promotion Claims</h4>
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

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(DashboardPage);
