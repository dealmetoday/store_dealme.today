import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';

// Material-UI Components
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

// Material React Kit Components
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

// Styles, Icons, and Images
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { Add, Delete, Edit } from "@material-ui/icons";

class Detail extends React.Component {
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

Detail.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

const DetailValue = withStyles(dashboardStyle)(Detail);

class DetailedView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      dealState: "",
    }
  }

  handleDealAdd = (event) => {
    this.setState({ dealState: "" });
  }

  handleDealDelete = (event) => {
    this.setState({ dealState: "" });
  }

  handleDealDiscard = (event) => {
    this.setState({ dealState: "" });
  }

  handleDealEdit = (event) => {
    this.setState({ dealState: "" });
  }

  handleDealState = (event, state) => {
    this.setState({ dealState: state });
    console.log(this.state.dealState);
  }

  handleTagClick = (event, index, handler) => {
    this.setState({ index: index });
    return handler(event, index);
  }

  render() {
    const { classes, ...rest } = this.props
    return (
      <Card>
        <CardHeader color="warning" stats icon>
          <CardIcon color="warning">
            <Icon>content_copy</Icon>
          </CardIcon>
          <GridContainer>
            <GridItem xs={7} sm={7} md={7}>
              <GridContainer>
                <GridItem xs={8} sm={8} md={8}>
                  <h3 className={classes.cardTitleWhite}>Detailed View</h3>
                </GridItem>
                <GridItem xs={4} sm={4} md={4}>
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
              <h3 className={classes.cardTitle}>{rest.dealTitle}</h3>
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
                  <Button disabled color="info" size="sm">
                    Editing Deal
                  </Button>
                ) : (null)}
                {this.state.dealState === "" ? (
                  <Button disabled color="dark" size="sm">
                    Read Only
                  </Button>
                ) : (null)}
              </div>
            </GridItem>
          </GridContainer>
          <br/>
          <DetailValue label="Date Created" value={rest.dealCreated} />
          <DetailValue label="Expiry Date" value={rest.dealExpires} />
          <br/>
          <DetailValue label="Total Claims" value={rest.dealClaims.toString()} />
          <DetailValue label="Total Views" value={rest.dealViews.toString()} />
          <DetailValue label="Deals Remaining" value={rest.dealRemaining.toString()} />
          <br/>
          <GridContainer>
            <GridItem xs={12} sm={6} md={6}>
              <TextField
                disabled
                id="description"
                label="Description"
                multiline
                fullWidth
                rows="10"
                defaultValue={rest.dealDesc}
                className={classes.textField}
                margin="normal"
              />
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              <List component="nav">
                {rest.dealTags.map((tag, index) => {
                  return (
                    <ListItem
                      button
                      selected={this.state.index === index}
                      onClick={event => this.handleTagClick(event, index, rest.onTagClick)}
                    >
                      <ListItemText primary={tag} />
                    </ListItem>
                  )
                })}
              </List>
              <div align="right">
                <Button
                  round
                  color="warning"
                  size="sm"
                  onClick={rest.onTagAdd}
                >
                  Add Tag
                </Button>
                <Button
                  round
                  color="warning"
                  size="sm"
                  onClick={rest.onTagRemove}
                >
                  Remove Tag
                </Button>
              </div>
            </GridItem>
          </GridContainer>
          <br/>
          {this.state.dealState === "add" ? (
            <div align="right">
              <Button
                simple
                color="warning"
                size="md"
                onClick={this.handleDealDiscard}
              >
                Discard Changes
              </Button>
              <Button
                color="warning"
                size="md"
                onClick={this.handleDealAdd}
              >
                Create New Deal
              </Button>
            </div>
          ) : (null)}
          {this.state.dealState === "delete" ? (
            <div align="right">
              <Button
                simple
                color="danger"
                size="md"
                onClick={this.handleDealDiscard}
              >
                I've changed my mind
              </Button>
              <Button
                color="danger"
                size="md"
                onClick={this.handleDealDelete}
              >
                Confirm Deletion
              </Button>
            </div>
          ) : (null)}
          {this.state.dealState === "edit" ? (
            <div align="right">
            <Button
              simple
              color="warning"
              size="md"
              onClick={this.handleDealDiscard}
            >
              Discard Changes
            </Button>
            <Button
              color="warning"
              size="md"
              onClick={this.handleDealEdit}
            >
              Save Changes
            </Button>
            </div>
          ) : (null)}
        </CardBody>
      </Card>
    )
  }
}

export default withStyles(dashboardStyle)(DetailedView);