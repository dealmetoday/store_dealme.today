import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import DashboardHeader from "components/Header/DashboardHeader.jsx";
import DashboardHeaderLinks from "components/Header/DashboardHeaderLinks.jsx";

import avatar from "assets/img/reactlogo.png";
import { Input } from "@material-ui/core";

const dashboardRoutes = [];

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      parent: "",
      description: "",
      address: "",
      city: "",
      postalcode: "",

      disp_name: "Your Store",
      disp_parent: "Your Parent Store",
      disp_description: "Describe your store here!",
      disp_address: "123 Fake Street",
      disp_city: "Vancouver",
      disp_postalcode: "A1B 2C3",
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.name) {
      this.setState({ disp_name: this.state.name });
    }
    if (this.state.parent) {
      this.setState({ disp_parent: this.state.parent });
    }
    if (this.state.description) {
      this.setState({ disp_description: this.state.description });
    }
    if (this.state.address) {
      this.setState({ disp_address: this.state.address });
    }
    if (this.state.city) {
      this.setState({ disp_city: this.state.city });
    }
    if (this.state.postalcode) {
      this.setState({ disp_postalcode: this.state.postalcode });
    }
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
          <GridItem xs={10} sm={10} md={5}>
            <Card profile>
              <CardAvatar>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>{this.state.disp_parent}</h6>
                <h4 className={classes.cardTitle}>{this.state.disp_name}</h4>
                <p className={classes.description}>{this.state.disp_description}</p>
                <br/><br/>
                <h6 className={classes.cardCategory}>Location</h6>
                <p className={classes.description}>
                  {this.state.disp_address}, {this.state.disp_city}, {this.state.disp_postalcode}
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={10} sm={10} md={5}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>Complete your profile</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <h4 className={classes.cardTitle}>General Store Information</h4>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Store Name"
                      id="name"
                      value={this.state.name}
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={this.handleChange}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Parent Store"
                      id="parent"
                      value={this.state.parent}
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={this.handleChange}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Describe your store here"
                      id="description"
                      value={this.state.description}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5
                      }}
                      onChange={this.handleChange}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <h4 className={classes.cardTitle}>Store Location</h4>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Address"
                      id="address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={this.handleChange}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={8} sm={8} md={8}>
                    <CustomInput
                      labelText="City"
                      id="city"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={this.handleChange}
                    />
                  </GridItem>
                  <GridItem xs={4} sm={4} md={4}>
                    <CustomInput
                      labelText="Postal Code"
                      id="postalcode"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={this.handleChange}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.handleSubmit}>Update Profile</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfilePage);
