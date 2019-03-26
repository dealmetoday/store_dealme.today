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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
import Utils from "components/Utils/Utils.jsx";

// Styles, Icons, and Images
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { Add, Delete, Edit } from "@material-ui/icons";

// Import Related Parts
// import DetailedView from "./Sections/DetailedView.jsx";
import PromotionsTable from "./Sections/PromotionsTable.jsx";

const dashboardRoutes = [];
var dateutils = new DateUtils();
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

    this.renderError = (typeof global.promotions === "undefined"
      || typeof global.tags === "undefined");
    if (this.renderError) {
      return;
    }

    this.state = {
      anchorMenu: null,
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
      dealTags: [],
    };
    this.tagIdToString = {};
    this.tagStringToId = {};

    global.tags.forEach((tag) => {
      this.tagIdToString[tag._id] = tag.key;
      this.tagStringToId[tag.key] = tag._id;
    });
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

  handleDealAdd = (event) => {
    this.setState({ dealState: "" });

    var expires = new Date();
    expires.setDate(expires.getDate() + parseInt(this.state.dealExpires, 10));

    let tags = [];
    this.state.dealTags.forEach(tag => { tags.push(this.tagStringToId[tag]) });

    var promotion = {
      creationDate: dateutils.convertISOToEpoch(this.state.dealCreated),
      description: this.state.dealDesc,
      expiryDate: dateutils.convertDateToEpoch(expires),
      format: "Percent",
      isActive: true,
      mall: global.profile.mall,
      store: global.profile._id,
      tags: tags,
      usesLeft: parseInt(this.state.dealRemaining, 10),
    }

    utils.dealAdd(global.bearer, promotion, this.handleTableClick);
    this.setDefaultDetails();
  }

  handleDealDiscard = (event) => {
    if (this.state.dealState === "add") {
      this.setDefaultDetails();
    }
    this.setState({ dealState: "" });
  }

  handleDealDelete = (event) => {
    this.setState({ dealState: "" });

    const index = this.getIndexOfSelectedDeal();
    if (index > -1) {
      let promotion = {
        id: global.promotions[index]._id, // Remove this once DB is updated
        dealID: global.promotions[index]._id,
        storeID: global.profile._id,
      };
      utils.dealDelete(global.bearer, promotion, index, this.handleTableClick);
    }
    this.setDefaultDetails();
  }

  handleDealEdit = (event) => {
    this.setState({ dealState: "" });

    const index = this.getIndexOfSelectedDeal();

    let tags = [];
    this.state.dealTags.forEach(tag => { tags.push(this.tagStringToId[tag]) });

    let promotion = {
      id: global.promotions[index]._id,
      tags: tags,
    }
    if (this.state.dealDesc) {
      promotion.description = this.state.dealDesc;
    }
    if (parseInt(this.state.dealExpires, 10) === this.state.dealExpires
        && parseInt(this.state.dealExpires, 10) > 0)
    {
      var expires = new Date();
      expires.setDate(expires.getDate() + parseInt(this.state.dealExpires, 10));
      promotion.expiryDate = dateutils.convertDateToEpoch(expires);
    }
    if (this.state.dealRemaining) {
      promotion.usesLeft = parseInt(this.state.dealRemaining, 10);
    }
    utils.dealUpdate(global.bearer, promotion, index, this.handleTableClick);
  }

  handleDealState = (event, state) => {
    this.setState({ dealState: state });

    if (state === "add") {
      this.setDefaultDetails();

      const date = new Date();
      this.setState({ dealClaims: 0 });
      this.setState({ dealCreated: date.toISOString() });
      this.setState({ dealViews: 0 });
    }
  }

  handleMenuClose = (event) => {
    this.setState({ anchorMenu: null });
  }

  handleMenuOpen = (event) => {
    this.setState({ [event.target.id]: event.currentTarget })
  }

  handleTagClick = (event, index) => {
    this.setState({ tagIndex: index });
  }

  handleTableClick = (event, data) => {
    if (data) {
      var tags = [];
      data.tags.forEach((tag) => {
        tags.push(this.tagIdToString[tag]);
      })

      this.setState({ selectedDeal: data._id });
      this.setState({ dealClaims: data.claims });
      this.setState({ dealCreated: data.creationDate });
      this.setState({ dealDesc: data.description });
      this.setState({ dealExpires: data.expiryDate });
      this.setState({ dealRemaining: data.usesLeft });
      this.setState({ dealTags: tags });
      this.setState({ dealTitle: data.description });
      this.setState({ dealViews: data.views });
    } else {
      this.setDefaultDetails();
    }
  };

  handleTagAdd = (event, tag) => {
    if (this.state.dealTags.length <= 5 && !this.state.dealTags.includes(tag)) {
      let newtags = this.state.dealTags;
      newtags.push(tag);
      this.setState({ dealTags: newtags.sort() });
    }
    this.handleMenuClose();
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

  setDefaultDetails = () => {
    this.setState({ selectedDeal: 0 });
    this.setState({ dealClaims: "" });
    this.setState({ dealCreated: "" });
    this.setState({ dealDesc: "" });
    this.setState({ dealExpires: "" });
    this.setState({ dealRemaining: "" });
    this.setState({ dealTags: [] });
    this.setState({ dealTitle: "[ No Promotion Selected ]" });
    this.setState({ dealViews: "" });
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
                      value={dateutils.convertISOToFormatted(this.state.dealCreated)}
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
                        value={dateutils.convertISOToFormatted(this.state.dealExpires)}
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
                          rows="6"
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
                          <Button
                            id="anchorMenu"
                            disabled={this.state.dealState === "" || this.state.dealState === "delete"}
                            round
                            color="warning"
                            size="sm"
                            onClick={this.handleMenuOpen}
                          >
                            Add Tag
                          </Button>
                          <Menu
                            id="menu_tags"
                            anchorEl={this.state.anchorMenu}
                            open={Boolean(this.state.anchorMenu)}
                            onClose={this.handleMenuClose}
                          >
                            {global.tags.map((tag) => (
                              <MenuItem
                                key={tag._id}
                                id="tag"
                                value={tag.key}
                                onClick={event => this.handleTagAdd(event, tag.key)}
                              >
                                {tag.key}
                              </MenuItem>
                            ))}
                          </Menu>
                          <Button
                            disabled={this.state.dealState === "" || this.state.dealState === "delete"}
                            round
                            color="warning"
                            size="sm"
                            onClick={this.handleTagRemove}
                          >
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
                    <PromotionsTable onClick={this.handleTableClick} />
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
