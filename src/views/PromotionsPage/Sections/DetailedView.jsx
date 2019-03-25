import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';

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
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

// Styles, Icons, and Images
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { Add, Delete, Edit } from "@material-ui/icons";

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

class DetailedView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      dealState: "",
    }
  }

  handleDealAdd = (event, rest) => {
    this.setState({ dealState: "" });
    return rest.onDealAdd(event);
  }

  handleDealDelete = (event, handler) => {
    this.setState({ dealState: "" });
    return handler(event);
  }

  handleDealDiscard = (event) => {
    this.setState({ dealState: "" });
  }

  handleDealEdit = (event, handler) => {
    this.setState({ dealState: "" });
    return handler(event);
  }

  handleDealState = (event, state, handler) => {
    this.setState({ dealState: state });
    return handler(event, state);
  }

  handleTagClick = (event, index, handler) => {
    this.setState({ index: index });
    return handler(event, index);
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <Card>
        <CardHeader color="warning" stats="true" icon="true">
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
                onClick={event => this.handleDealState(event, "add", rest.onStateChange)}
              >
                <Add />
              </IconButton>
              <IconButton
                color="inherit"
                onClick={event => this.handleDealState(event, "edit", rest.onStateChange)}
              >
                <Edit />
              </IconButton>
              <IconButton
                color="inherit"
                onClick={event => this.handleDealState(event, "delete", rest.onStateChange)}
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
                  <Button disabled color="github" size="sm">
                    Read Only
                  </Button>
                ) : (null)}
              </div>
            </GridItem>
          </GridContainer>
          <br/>
          <Detail label="Date Created" value={rest.dealCreated} />
          {(this.state.dealState === "add" || this.state.dealState === "edit") ? (
            <DetailEdit
              id="dealExpires"
              value={rest.dealExpires}
              label="Expiry Date"
              onChange={(event) => {rest[event.target.id] = event.target.value}}
            />
          ) : (
            <Detail label="Expirty Date" value={rest.dealExpires} />
          )}
          <br/>
          <Detail label="Total Claims" value={rest.dealClaims.toString()} />
          <Detail label="Total Views" value={rest.dealViews.toString()} />
          {(this.state.dealState === "add" || this.state.dealState === "edit") ? (
            <DetailEdit
              id="dealRemaining"
              value={rest.dealRemaining >= 0 ? rest.dealRemaining.toString() : "Unlimited"}
              label="Deals Remaining"
              onChange={(event) => {rest[event.target.id] = event.target.value}}
            />
          ) : (
            <Detail
              label="Deals Remaining"
              value={rest.dealRemaining >= 0 ? rest.dealRemaining.toString() : "Unlimited"}
            />
          )}
          <br/>
          <GridContainer>
            <GridItem xs={12} sm={6} md={6}>
              <TextField
                disabled={!(this.state.dealState === "add" || this.state.dealState === "edit")}
                id="description"
                label="Description"
                multiline
                fullWidth
                rows="11"
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
                      key={index}
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
                size="lg"
                onClick={this.handleDealDiscard}
              >
                Discard Changes
              </Button>
              <Button
                color="warning"
                size="lg"
                onClick={event=> this.handleDealAdd(event, rest)}
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
                size="lg"
                onClick={this.handleDealDiscard}
              >
                I've changed my mind
              </Button>
              <Button
                color="danger"
                size="lg"
                onClick={event=> this.handleDealDelete(event, rest.onDealDelete)}
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
              size="lg"
              onClick={this.handleDealDiscard}
            >
              Discard Changes
            </Button>
            <Button
              color="warning"
              size="lg"
              onClick={event=> this.handleDealEdit(event, rest.onDealEdit)}
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