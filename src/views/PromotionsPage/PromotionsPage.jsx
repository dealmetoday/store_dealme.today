import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import DashboardHeader from "components/Header/DashboardHeader.jsx";
import DashboardHeaderLinks from "components/Header/DashboardHeaderLinks.jsx";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

// Import Related Parts
import DetailedView from "./Sections/DetailedView.jsx";
import PromotionsTable from "./Sections/PromotionsTable.jsx";

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
      tagIndex: 0,

      dealTitle: "Some Title",
      dealClaims: "10",
      dealCreated: "--",
      dealDesc: "Default promotions description",
      dealExpires: "[ No Expiry Date ]",
      dealRemaining: "50",
      dealViews: "25",

      dealData: [],
      dealTags: [],
    };

    for (var i = 0; i < 100; ++i) {
      this.state.dealData.push(createData(i));
    }
    for (i = 0; i < 5; ++i) {
      this.state.dealTags.push("Tag " + i.toString());
    }
  }

  handleTagClick = (event, index) => {
    this.setState({ tagIndex: index });
  }

  handleTableClick = (event, data) => {
    this.setState({ dealClaims: data.claims });
    this.setState({ dealCreated: data.created })
    this.setState({ dealDesc: data.title });
    this.setState({ dealExpires: data.expires });
    this.setState({ dealRemaining: data.remaining });
    this.setState({ dealTitle: data.title });
    this.setState({ dealViews: data.views });
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
                <DetailedView
                  dealClaims={this.state.dealClaims}
                  dealCreated={this.state.dealCreated}
                  dealDesc={this.state.dealDesc}
                  dealExpires={this.state.dealExpires}
                  dealRemaining={this.state.dealRemaining}
                  dealTags={this.state.dealTags}
                  dealTitle={this.state.dealTitle}
                  dealViews={this.state.dealViews}
                  onTagClick={this.handleTagClick}
                  onTagAdd={this.handleTagAdd}
                  onTagRemove={this.handleTagRemove}
                />
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
