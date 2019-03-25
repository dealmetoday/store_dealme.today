import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";

// Material-UI Components
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

// Material React Kit Components
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import DashboardHeader from "components/Header/DashboardHeader.jsx";
import DashboardHeaderLinks from "components/Header/DashboardHeaderLinks.jsx";
import DateUtils from "components/Utils/DateUtils.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

// Styles, Icons, and Images
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { Add, Delete, Edit } from "@material-ui/icons";

// Import Related Parts
// import DetailedView from "./Sections/DetailedView.jsx";
import PromotionsTable from "./Sections/PromotionsTable.jsx";

const dashboardRoutes = [];
var dateutils = new DateUtils();

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

class DetailEditComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: props.value,
    }
  }

  handleChange = (event, handler) => {
    this.setState({ input: event.target.value });
    return handler(event);
  };

  render() {
    const { classes, label, id, onChange } = this.props;
    return (
      <GridContainer>
        <GridItem xs={4} sm={4} md={4}>
          <h4 className={classes.cardTitle}>{label}:</h4>
        </GridItem>
        <GridItem xs={8} sm={8} md={8}>
          <Input
            fullWidth
            id={id}
            value={this.state.input}
            onChange={event => {this.handleChange(event, onChange)}}
            inputProps={{
              style: { textAlign: "right" }
            }}
          />
        </GridItem>
      </GridContainer>
    )
  }
}
DetailEditComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}
const DetailEdit = withStyles(dashboardStyle)(DetailEditComponent);

class PromotionsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderError: false,
      dealState: "",

      selectedDeal: 0,
      tagIndex: 0,

      dealTitle: "[ No Promotion Selected ]",
      dealClaims: "",
      dealCreated: "",
      dealDesc: "",
      dealExpires: "",
      dealRemaining: "",
      dealViews: "",

      // dealData: global.promotions,
      dealTags: [],
    };

    for (var i = 0; i < 5; ++i) {
      this.state.dealTags.push("Tag " + i.toString());
    }
  }

  componentDidCatch(error, info) {
    console.log("PromotionsPage caught error");
    console.log(error);
    console.log(info);
    this.setState({ renderError: true });
  }

  getIndexOfSelectedDeal = () => {
    for (var i = 0; i < global.promotions.length; ++i) {
      if (global.promotions[i]["_id"] === this.state.selectedDeal) {
        return i;
      }
    }
    return -1;
  }

  formatDate = (isodate) => {
    const date = new Date(Date.parse(isodate));

    var formatted = date.getDate().toString();
    formatted += " " + dateutils.numberToMonth[date.getMonth()];
    formatted += " " + date.getFullYear();
    return formatted;
  }

  handleDealAdd = (event) => {
    this.handleDealState("");

    var expires = new Date();
    expires.setDate(expires.getDate() + parseInt(this.state.dealExpires, 10));

    var promotion = {
      _id: "",
      claims: 0,
      creationDate: this.state.dealCreated,
      description: this.state.dealDesc,
      expiryDate: expires.toISOString(),
      format: "Percent",
      isActive: true,
      mall: "",
      store: "",
      tags: ["", ""],
      usesLeft: parseInt(this.state.dealRemaining, 10),
      views: 0,
    }
    global.promotions.push(promotion);
  }

  handleDealDiscard = (event) => {
    this.handleDealState("");
  }

  handleDealDelete = (event) => {
    this.handleDealState("");

    const index = this.getIndexOfSelectedDeal();
    if (index > -1) {
      global.promomtions = global.promotions.splice(index, 1);

      this.handleStateChange("");
      this.handleTableClick();
    }
  }

  handleDealEdit = (event) => {
    this.handleDealState("");

    const index = this.getIndexOfSelectedDeal();
    console.log(this.state);

    let promotion = global.promotions[index];
    if (this.state.dealDesc) {
      promotion.description = this.state.dealDesc;
    }
    if (parseInt(this.state.dealExpires, 10) === this.state.dealExpires
        && parseInt(this.state.dealExpires, 10) > 0)
    {
      var expires = new Date();
      expires.setDate(expires.getDate() + parseInt(this.state.dealExpires, 10));
      promotion.expiryDate = expires.toISOString();
    }
    if (this.state.dealRemaining) {
      promotion.usesLeft = parseInt(this.state.dealRemaining, 10);
    }
  }

  handleDealState = (event, state) => {
    this.setState({ dealState: state });

    if (state === "add") {
      const date = new Date();
      this.setState({ dealClaims: 0 });
      this.setState({ dealCreated: date.toISOString() });
      this.setState({ dealDesc: "" });
      this.setState({ dealExpires: "" });
      this.setState({ dealRemaining: "" });
      this.setState({ dealTitle: "" });
      this.setState({ dealViews: 0 });
    }
  }

  handleTagClick = (event, index) => {
    this.setState({ tagIndex: index });
  }

  handleTableClick = (event, data) => {
    if (data) {
      this.setState({ selectedDeal: data._id });
      this.setState({ dealClaims: data.claims });
      this.setState({ dealCreated: dateutils.formatISODate(data.creationDate) });
      this.setState({ dealDesc: data.description });
      this.setState({ dealExpires: dateutils.formatISODate(data.expiryDate) });
      this.setState({ dealRemaining: data.usesLeft });
      this.setState({ dealTitle: data.description });
      this.setState({ dealViews: data.views });
    } else {
      this.setState({ selectedDeal: 0 });
      this.setState({ dealClaims: "" });
      this.setState({ dealCreated: "" });
      this.setState({ dealDesc: "" });
      this.setState({ dealExpires: "" });
      this.setState({ dealRemaining: "" });
      this.setState({ dealTitle: "[ No Promotion Selected ]" });
      this.setState({ dealViews: "" });
    }
  };

  handleTagAdd = (event) => {
    if (this.state.dealTags.length >= 5) {
      return; // Maximum 5 tags per promotion
    }

    let newtags = this.state.dealTags;
    if (!newtags.includes("Tag 0")) {
      newtags.push("Tag 0");
    } else if (!newtags.includes("Tag 1")) {
      newtags.push("Tag 1");
    } else if (!newtags.includes("Tag 2")) {
      newtags.push("Tag 2");
    } else if (!newtags.includes("Tag 3")) {
      newtags.push("Tag 3");
    } else if (!newtags.includes("Tag 4")) {
      newtags.push("Tag 4");
    }

    this.setState({ dealTags: newtags.sort() });
  }

  handleTagRemove = (event) => {
    const index = this.state.tagIndex;
    let newtags = this.state.dealTags;
    if (index < 0 || index >= this.state.dealTags.length) {
      return; // Index somehow out of range - ignore
    }

    newtags.splice(index, 1);
    this.setState({ dealTags: newtags });
  }

  render() {
    const { classes, ...rest } = this.props;
    if (this.state.renderError) {
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
                  <CardHeader color="warning" stats="true" icon="true">
                    <CardIcon color="warning">
                      <Icon>content_copy</Icon>
                    </CardIcon>
                    <GridContainer>
                      <GridItem xs={7} sm={7} md={7}>
                        <GridContainer>
                          <GridItem xs={8} sm={8} md={8}>
                            <h3 className={classes.cardTitleWhite}>
                              Detailed View
                            </h3>
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                      <GridItem xs={5} sm={5} md={5} align="right">
                        <IconButton
                          color="inherit"
                          onClick={event => this.handleDealState(event, "add")}
                        >
                          <Add />
                        </IconButton>
                        <IconButton
                          color="inherit"
                          onClick={event => this.handleDealState(event, "edit")}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="inherit"
                          onClick={event => this.handleDealState(event, "delete")}
                        >
                          <Delete />
                        </IconButton>
                      </GridItem>
                    </GridContainer>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={8} sm={8} md={8}>
                        <h3 className={classes.cardTitle}>{this.state.dealDesc}</h3>
                      </GridItem>
                      <GridItem xs={4} sm={4} md={4}>
                        <div align="right">
                          {this.state.dealState === "add" ? (
                            <Button disabled color="success" size="sm">
                              New Deal
                            </Button>
                          ) : (null)}
                          {this.state.dealState === "delete" ? (
                            <Button disabled color="danger" size="sm">
                              Deleting Deal
                            </Button>
                          ) : (null)}
                          {this.state.dealState === "edit" ? (
                            <Button disabled color="warning" size="sm">
                              Editing Deal
                            </Button>
                          ) : (null)}
                          {this.state.dealState === "" ? (
                            <Button disabled color="github" size="sm">
                              Read Only
                            </Button>
                          ) : (null)}
                        </div>
                      </GridItem>
                    </GridContainer>
                    <br/>
                    <Detail
                      label="Date Created"
                      value={dateutils.formatISODate(this.state.dealCreated)}
                    />
                    {(this.state.dealState === "add" || this.state.dealState === "edit") ? (
                      <DetailEdit
                        id="dealExpires"
                        value=""
                        label={
                          this.state.dealState === "add"
                            ? "Deal Duration (days)"
                            : "Expiry Date (days from today)"
                        }
                        onChange={(event) => {
                          this.setState({ [event.target.id]: event.target.value });
                        }}
                      />
                    ) : (
                      <Detail
                        label="ExpiryDate"
                        value={dateutils.formatISODate(this.state.dealExpires)}
                      />
                    )}
                    <br/>
                    <Detail
                      label="Total Claims"
                      value={this.state.dealClaims.toString()}
                    />
                    <Detail
                      label="Total Views"
                      value={this.state.dealViews.toString()}
                    />
                    {(this.state.dealState === "add" || this.state.dealState === "edit") ? (
                      <DetailEdit
                        id="dealRemaining"
                        value={this.state.dealRemaining.toString()}
                        label="Deals Remaining"
                        onChange={(event) => {
                          this.setState({ [event.target.id]: event.target.value });
                        }}
                      />
                    ) : (
                      <Detail
                        label="Deals Remaining"
                        value={this.state.dealRemaining >= 0
                          ? this.state.dealRemaining.toString()
                          : "Unlimited"
                        }
                      />
                    )}
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          disabled={!(this.state.dealState === "add" || this.state.dealState === "edit")}
                          id="dealDesc"
                          label="Description"
                          multiline
                          fullWidth
                          rows="11"
                          defaultValue={this.state.dealDesc}
                          className={classes.textField}
                          margin="normal"
                          onChange={event => {
                            this.setState({ [event.target.id]: event.target.value });
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <List component="nav">
                          {this.state.dealTags.map((tag, index) => {
                            return (
                              <ListItem
                                key={index}
                                button
                                selected={this.state.tagIndex === index}
                                onClick={event => this.handleTagClick(event, index)}
                              >
                                <ListItemText primary={tag} />
                              </ListItem>
                            )
                          })}
                        </List>
                        <div align="right">
                          <Button round color="warning" size="sm" onClick={this.onTagAdd}>
                            Add Tag
                          </Button>
                          <Button round color="warning" size="sm" onClick={this.onTagRemove}>
                            Remove Tag
                          </Button>
                        </div>
                      </GridItem>
                    </GridContainer>
                    <br/>
                    {this.state.dealState === "add" ? (
                      <div align="right">
                        <Button simple color="warning" size="lg" onClick={this.handleDealDiscard}>
                          Discard Changes
                        </Button>
                        <Button color="warning" size="lg" onClick={this.handleDealAdd}>
                          Create New Deal
                        </Button>
                      </div>
                    ) : (null)}
                    {this.state.dealState === "delete" ? (
                      <div align="right">
                        <Button simple color="danger" size="lg" onClick={this.handleDealDiscard}>
                          I've changed my mind
                        </Button>
                        <Button color="danger" size="lg" onClick={this.handleDealDelete} >
                          Confirm Deletion
                        </Button>
                      </div>
                    ) : (null)}
                    {this.state.dealState === "edit" ? (
                      <div align="right">
                      <Button simple color="warning" size="lg" onClick={this.handleDealDiscard} >
                        Discard Changes
                      </Button>
                      <Button color="warning" size="lg" onClick={this.handleDealEdit} >
                        Save Changes
                      </Button>
                      </div>
                    ) : (null)}
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={7}>
                <Card>
                  <CardHeader color="warning" stats="true" icon="true">
                    <CardIcon color="warning">
                      <Icon>content_copy</Icon>
                    </CardIcon>
                    <h3 className={classes.cardTitleWhite}>All Promotions</h3>
                  </CardHeader>
                  <CardBody>
                    <PromotionsTable
                      onClick={this.handleTableClick}
                    />
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

PromotionsPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(PromotionsPage);
