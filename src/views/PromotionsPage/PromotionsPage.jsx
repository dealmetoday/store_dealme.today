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

const cols = [
  { id: 'desc', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'views', numeric: true, disablePadding: false, label: 'Views' },
  { id: 'claims', numeric: true, disablePadding: false, label: 'Claims' },
  { id: 'remaining', numeric: true, disablePadding: false, label: 'Remaining' },
];

let counter = 0;
function createData(index) {
  counter += 1;
  return {
    id: counter,
    desc: "Promotion " + index,
    views: 50 + index,
    claims: 25 + index,
    remaining: 10 + index,
  };
}

class PromotionsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usesleft: 50,
      views: 25,
      claims: 10,
      description: "Default promotion description",
      selectedIndex: -1,

      tag0: "Womens Apparel",
      tag1: "Mens Apparel",
      tag2: "Unisex Apparel",
      tag3: "Clothing",
      tag4: "",

      data: []
    };

    for (var i = 0; i < 100; ++i) {
      this.state.data.push(createData(i));
    }
    console.log(this.state.data);
  }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  }

  handleTableClick = (event) => {
    console.log(event);
    this.setState({ usesleft: this.state.usesleft + 1 });
    this.setState({ views: this.state.views + 1 });
    this.setState({ claims: this.state.claims + 1 });
    this.setState({ description: this.state.claims + 1 });
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
    this.setState({ selectedIndex: -1 })
  }

  removeTag = (event) => {
    if (this.state.selectedIndex < 0 || this.state.selectedIndex > 4) {
      return;
    }

    switch (this.state.selectedIndex) {
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
    this.setState({ selectedIndex: -1 });
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
          <GridItem xs={8} sm={8} md={8}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="warning" stats icon>
                    <CardIcon color="warning">
                      <Icon>content_copy</Icon>
                    </CardIcon>
                    <h3 className={classes.cardTitleWhite}>Current Promotion</h3>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={6} md={8}>
                        <GridContainer>
                          <GridItem xs={2} sm={2} md={2}>
                            <h4 className={classes.caseTitle}>
                              Date Created:
                            </h4>
                            <h4 className={classes.caseTitle}>
                              Expiry Date:
                            </h4>
                          </GridItem>
                          <GridItem xs={4} sm={4} md={4}>
                            <h4 className={classes.caseTitle}>
                              Jan 01 2019
                            </h4>
                            <h4 className={classes.caseTitle}>
                              May 01 2019
                            </h4>
                          </GridItem>
                          <GridItem xs={2} sm={2} md={2}>
                            <h4 className={classes.caseTitle}>
                              Uses Left:
                            </h4>
                            <h4 className={classes.caseTitle}>
                              Views:
                            </h4>
                            <h4 className={classes.caseTitle}>
                              Claims:
                            </h4>
                          </GridItem>
                          <GridItem xs={4} sm={4} md={4}>
                            <h4 className={classes.caseTitle}>
                              {this.state.usesleft}
                            </h4>
                            <h4 className={classes.caseTitle}>
                              {this.state.views}
                            </h4>
                            <h4 className={classes.caseTitle}>
                              {this.state.claims}
                            </h4>
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <TextField
                              id="description"
                              label="Description"
                              multiline
                              fullWidth
                              rows="4"
                              defaultValue={this.state.description}
                              className={classes.textField}
                              margin="normal"
                            />
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                      <GridItem xs={12} sm={6} md={4}>
                        <List component="nav">
                          <ListItem
                            button
                            selected={this.state.selectedIndex === 0}
                            onClick={event => this.handleListItemClick(event, 0)}
                          >
                            <ListItemText primary={this.state.tag0} />
                          </ListItem>
                          <ListItem
                            button
                            selected={this.state.selectedIndex === 1}
                            onClick={event => this.handleListItemClick(event, 1)}
                          >
                            <ListItemText primary={this.state.tag1} />
                          </ListItem>
                          <ListItem
                            button
                            selected={this.state.selectedIndex === 2}
                            onClick={event => this.handleListItemClick(event, 2)}
                          >
                            <ListItemText primary={this.state.tag2} />
                          </ListItem>
                          <ListItem
                            button
                            selected={this.state.selectedIndex === 3}
                            onClick={event => this.handleListItemClick(event, 3)}
                          >
                            <ListItemText primary={this.state.tag3} />
                          </ListItem>
                          <ListItem
                            button
                            selected={this.state.selectedIndex === 4}
                            onClick={event => this.handleListItemClick(event, 4)}
                          >
                            <ListItemText primary={this.state.tag4} />
                          </ListItem>
                        </List>
                        <Button simple size="md" color="warning" onClick={this.addTag}>
                          Add New Tag
                        </Button>
                        <Button round size="md" color="warning" onClick={this.removeTag}>
                          Remove Selected Tag
                        </Button>
                      </GridItem>
                    </GridContainer>
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
                        {
                        }
                        {this.state.data.map((row) => {
                          return (
                          <TableRow key={row.id} onClick={this.handleTableClick}>
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
