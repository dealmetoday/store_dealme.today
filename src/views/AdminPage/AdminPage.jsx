import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";

// Material-UI Components
import Icon from '@material-ui/core/Icon';

// Material React Kit Components
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import DashboardHeader from "components/Header/DashboardHeader.jsx";
import DashboardHeaderLinks from "components/Header/DashboardHeaderLinks.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Utils from "components/Utils/Utils.jsx";

// Styles, Icons, and Images
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

// Import Related Parts
// import DetailedView from "./Sections/DetailedView.jsx";
import RequestTable from "./Sections/RequestTable.jsx";

const dashboardRoutes = [];
var utils = new Utils();

class DetailComponent extends React.Component {
  render() {
    const { classes, label, value } = this.props;
    return (
      <GridContainer>
        <GridItem xs={4} sm={4} md={4}>
          <h4 className={classes.cardTitle}>{label}:</h4>
        </GridItem>
        <GridItem xs={8} sm={8} md={8}>
          <h4 className={classes.cardTitle} align="right">{value}</h4>
        </GridItem>
      </GridContainer>
    )
  }
}
DetailComponent.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}
const Detail = withStyles(dashboardStyle)(DetailComponent);

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    if (typeof global.bearer === "undefined") {
      return;
    }
    utils.getTags(global.bearer);

    this.state = {
      selectedRequest: 0,

      requestKey: "",
      requestModel: "",
      requestRequest: "",
    };
  }

  getIndexOfSelectedRequest = () => {
    for (var i = 0; i < global.requests.length; ++i) {
      if (global.requests[i]["_id"] === this.state.selectedRequest) {
        return i;
      }
    }
    return -1;
  }

  handleAccept = async (event) => {
    const index = this.getIndexOfSelectedRequest();
    if (index > -1) {
      await utils.put('/request/approve', { id: global.requests[index]._id });
      await utils.getTags(global.bearer);
      global.requests.splice(index, 1);
      this.handleTableClick();
    }
  }

  handleDecline = async (event) => {
    const index = this.getIndexOfSelectedRequest();
    if (index > -1) {
      await utils.put('/request/reject', { id: global.requests[index]._id });
      global.requests.splice(index, 1);
      this.handleTableClick();
    }
  }

  handleTableClick = (event, data) => {
    if (data) {
      this.setState({ selectedRequest: data._id });
      this.setState({ requestModel: data.model });
      this.setState({ requestRequest: data.content.request });
      if (typeof data.content.key === "undefined") {
        this.setState({ requestKey: data.content.id });
      } else {
        this.setState({ requestKey: data.content.key });
      }
    } else {
      this.setDefaultDetails();
    }
  };

  setDefaultDetails = () => {
    this.setState({ selectedRequest: "[ No Request Selected ]" });
    this.setState({ requestKey: "" });
    this.setState({ requestModel: "" });
    this.setState({ requestRequest: "" });
  }

  render() {
    const { classes, ...rest } = this.props;
    if (typeof global.requests === "undefined" || typeof global.bearer === "undefined") {
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
              <GridItem xs={12} sm={12} md={5}>
                <Card>
                  <CardHeader color="info" stats="true" icon="true">
                    <CardIcon color="info">
                      <Icon>content_copy</Icon>
                    </CardIcon>
                    <h3 className={classes.cardTitleWhite}>Detailed View</h3>
                  </CardHeader>
                  <CardBody>
                  <Detail
                      label="Request"
                      value={this.state.requestRequest + " " + this.state.requestModel}
                    />
                    <Detail
                      label="Value"
                      value={this.state.requestKey}
                    />
                    <br/>
                    <div align="right">
                      <Button color="info" size="sm" onClick={this.handleAccept}>
                        Accept Request
                      </Button>
                      <Button color="info" size="sm" onClick={this.handleDecline}>
                        Decline Request
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={7}>
                <Card>
                  <CardHeader color="info" stats="true" icon="true">
                    <CardIcon color="info">
                      <Icon>content_copy</Icon>
                    </CardIcon>
                    <h3 className={classes.cardTitleWhite}>All Requests</h3>
                  </CardHeader>
                  <CardBody>
                    <RequestTable onClick={this.handleTableClick} />
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

AdminPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(AdminPage);
