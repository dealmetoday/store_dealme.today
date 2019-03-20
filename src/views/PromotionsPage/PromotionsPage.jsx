import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
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
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const dashboardRoutes = [];

let counter = 0;
function createData(index) {
  const data = {
    id: counter,
    desc: "Promotion " + index,
    views: 50 + index,
    claims: 25 + index,
    remaining: 10 + index,
  };
  counter += 1;
  return data;
}

class PromotionsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableIndex: -1,
      tagIndex: -1,

      dealClaims: "10",
      dealCreated: "--",
      dealDesc: "Default promotions description",
      dealExpires: "[ No Expiry Date ]",
      dealRemaining: "50",
      dealViews: "25",

      tag0: "Womens Apparel",
      tag1: "Mens Apparel",
      tag2: "Unisex Apparel",
      tag3: "Clothing",
      tag4: "",

      dealData: [],
      dealTags: [],
    };

    for (var i = 0; i < 100; ++i) {
      this.state.dealData.push(createData(i));
    }
    for (var i = 0; i < 5; ++i) {
      this.state.dealTags.push("Tag " + i.toString());
    }
  }

  handleTagClick = (event, index) => {
    this.setState({ tagIndex: index });
  }

  handleTableClick = (event, index) => {
    const deal = this.state.dealData[index];
    this.setState({ dealClaims: deal.claims });
    // this.setState({ dealCreated: deal.created })
    this.setState({ dealDesc: deal.description });
    // this.setState({ dealExpires: deal.expires });
    this.setState({ dealRemaining: deal.remaining });
    this.setState({ dealViews: deal.views });
  };

  addTag = (event) => {
    if (!this.state.tag0) {
      this.setState({ tag0: "New Tag 0" });
    } else if (!this.state.tag1) {
      this.setState({ tag1: "New Tag 1" });
    } else if (!this.state.tag2) {
      this.setState({ tag2: "New Tag 2" });
    } else if (!this.state.tag3) {
      this.setState({ tag3: "New Tag 3" });
    } else {
      this.setState({ tag4: "New Tag 4" });
    }
    this.setState({ tagIndex: -1 })
  }

  removeTag = (event) => {
    if (this.state.tagIndex < 0 || this.state.tagIndex > 4) {
      return;
    }

    switch (this.state.tagIndex) {
      case 0:
        this.setState({ tag0: this.state.tag1 });
      case 1:
        this.setState({ tag1: this.state.tag2 });
      case 2:
        this.setState({ tag2: this.state.tag3 });
      case 3:
        this.setState({ tag3: this.state.tag4 });
      case 4:
        this.setState({ tag4: "" });
      default:
        break;
    }
    this.setState({ tagIndex: -1 });
  }

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
          <GridItem xs={11} sm={10} md={10}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={5}>
                <Card>
                  <CardHeader color="warning" stats icon>
                    <CardIcon color="warning">
                      <Icon>content_copy</Icon>
                    </CardIcon>
                    <h3 className={classes.cardTitleWhite}>Detailed View</h3>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={4} sm={4} md={4}>
                        <h4 className={classes.cardTitle}>
                          Date Created:
                        </h4>
                        <h4 className={classes.cardTitle}>
                          Expiry Date:
                        </h4>
                      </GridItem>
                      <GridItem xs={8} sm={8} md={8}>
                        <h4 className={classes.cardTitle} align="right">
                          {this.state.dealCreated}
                        </h4>
                        <h4 className={classes.cardTitle} align="right">
                          {this.state.dealExpires}
                        </h4>
                      </GridItem>
                    </GridContainer>
                    <br/>
                    <GridContainer>
                      <GridItem xs={4} sm={4} md={4}>
                        <h4 className={classes.cardTitle}>
                          Total Claims:
                        </h4>
                        <h4 className={classes.cardTitle}>
                          Total Views:
                        </h4>
                        <h4 className={classes.cardTitle}>
                          Remaining Uses:
                        </h4>
                      </GridItem>
                      <GridItem xs={8} sm={8} md={8}>
                        <h4 className={classes.cardTitle} align="right">
                          {this.state.dealClaims}
                        </h4>
                        <h4 className={classes.cardTitle} align="right">
                          {this.state.dealViews}
                        </h4>
                        <h4 className={classes.cardTitle} align="right">
                          {this.state.dealRemaining}
                        </h4>
                      </GridItem>
                    </GridContainer>
                    <br/>
                    <GridContainer>
                      <GridItem xs={12} sm={6} md={6}>
                        <TextField
                          id="description"
                          label="Description"
                          multiline
                          fullWidth
                          rows="10"
                          defaultValue={this.state.dealDesc}
                          className={classes.textField}
                          margin="normal"
                        />
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6}>
                        <List component="nav">
                          {this.state.dealTags.map((tag, index) => {
                            return (
                              <ListItem
                                button
                                selected={this.state.tagIndex === index}
                                onClick={event => this.handleTagClick(event, index)}
                              >
                                <ListItemText primary={tag} />
                              </ListItem>
                            )
                          })}
                        </List>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={7}>
                <Card>
                  <CardHeader color="warning" stats icon>
                    <CardIcon color="warning">
                      <Icon>content_copy</Icon>
                    </CardIcon>
                    <h3 className={classes.cardTitleWhite}>All Promotions</h3>
                  </CardHeader>
                  <CardBody>
                    <p>Something</p>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="warning" stats icon>
                    <CardIcon color="warning">
                      <Icon>content_copy</Icon>
                    </CardIcon>
                    <h3 className={classes.cardTitleWhite}>All Promotions</h3>
                  </CardHeader>
                  <CardBody>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Promotion</TableCell>
                          <TableCell align="right">Claims</TableCell>
                          <TableCell align="right">Views</TableCell>
                          <TableCell align="right">Remaining</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.dealData.map((row) => {
                          return (
                          <TableRow key={row.id} onClick={e => this.handleTableClick(e, row.id)}>
                            <TableCell component="th" scope="row" align="left">{row.desc}</TableCell>
                            <TableCell component="th" scope="row" align="right">{row.claims}</TableCell>
                            <TableCell component="th" scope="row" align="right">{row.views}</TableCell>
                            <TableCell component="th" scope="row" align="right">{row.remaining}</TableCell>
                          </TableRow>
                        )})}
                      </TableBody>
                    </Table>
                  </CardBody>
                  <hr width="80%" size="1" color="#999999" />
                  <CardFooter>
                    <p className={classes.cardCategory}>
                      Promotions information overview
                    </p>
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

PromotionsPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(PromotionsPage);
