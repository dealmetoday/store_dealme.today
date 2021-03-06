import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
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

// Utils
import Utils from "components/Utils/Utils.jsx";

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

    this.renderError = (typeof global.profile === "undefined"
      || typeof global.storeLoc === "undefined"
      || typeof global.id === "undefined");
    if (this.renderError) {
      return;
    }

    this.state = {
      name: "",
      parent: "",
      desc: "",
      address: "",
      city: "",
      postalcode: "",

      // This is what is seen by and send to the server
      disp_name: global.profile.name,
      disp_parent: global.profile.parentCompany,
      disp_desc: global.profile.description,
      disp_location: global.storeLoc,
    };

    this.utils = new Utils();
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = async (e) => {
    if (global.profile.email === "nvdbluetwo@gmail.com") {
      this.props.history.push("/admin/requests");
      return;
    }

    let location = "";
    let updateObj = { id: global.id }

    if (this.state.name !== "") {
      updateObj.name = this.state.name;
    }

    if (this.state.desc !== "") {
      updateObj.description = this.state.desc;
    }

    if (this.state.parent !== "") {
    	updateObj.parentCompany = this.state.parent;
    }

    // if (this.state.address && this.state.city && this.state.postalcode) {
    //   location = this.state.address + ", " + this.state.city + ", " + this.state.postalcode;
    //   let latlng = await this.utils.getLatLng(location);
    //   updateObj.location = [latlng.lat, latlng.lng];
    // }

    console.log(updateObj);

    let result = await this.utils.put('/stores', updateObj);
    if (result !== null) {
      let address = "";
      // if (updateObj.location) {
      //   address = await this.utils.getAddress({ lat: updateObj.location[0], lng: updateObj.location[1] });
      // }

      let newName = updateObj.name ? this.state.name : this.state.disp_name;
      let newParent = updateObj.parentCompany ? this.state.parent : this.state.disp_parent;
      let newDesc = updateObj.description ? this.state.desc : this.state.disp_desc;
      let newLoc = updateObj.location ? address : this.state.disp_location;

      this.setState({
        disp_name: newName,
        disp_parent: newParent,
        disp_desc: newDesc,
        disp_location: newLoc,
      })
    };
  }

  render() {
    const { classes, ...rest } = this.props;
    if (this.renderError) {
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
          <GridItem xs={10} sm={10} md={5}>
            <Card>
              <CardBody>
                <h6 className={classes.cardCategory}>
                  {this.state.disp_parent}
                </h6>
                <h4 className={classes.cardTitle}>
                  {this.state.disp_name ? this.state.disp_name : "[Store Name]"}
                </h4>
                <p className={classes.desc}>
                  {this.state.disp_desc ? this.state.disp_desc : "[Store Description]"}
                </p>
                <br/><br/>
                <h6 className={classes.cardCategory}>Location</h6>
                <p className={classes.description}>
                  {this.state.disp_location ? this.state.disp_location : "[Store Location]"}
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
                      id="desc"
                      value={this.state.desc}
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
