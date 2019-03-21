import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';

// Material-UI Components
import Icon from '@material-ui/core/Icon';
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
    }
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
          <h3 className={classes.cardTitleWhite}>Detailed View</h3>
        </CardHeader>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <h3 className={classes.cardTitle}>{rest.dealTitle}</h3>
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
        </CardBody>
      </Card>
    )
  }
}

export default withStyles(dashboardStyle)(DetailedView);