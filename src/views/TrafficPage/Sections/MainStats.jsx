import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';

// Material-UI Components

// Material React Kit Components
import DateUtils from "components/Utils/DateUtils.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

// Styles, Icons, and Images
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

var dateutils = new DateUtils();

class DetailComponent extends React.Component {
  render() {
    const { classes, label, value } = this.props;
    return (
      <GridContainer>
        <GridItem xs={5} sm={5} md={5}>
          <h4 className={classes.cardTitle}>{label}:</h4>
        </GridItem>
        <GridItem xs={7} sm={7} md={7}>
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

class MainStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <h3 className={classes.cardTitle}>Main Traffic Statistics</h3>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Detail label="Number of Deals" value={global.stats.allDeals.length.toString()} />
          <Detail label="Active Deals" value={global.stats.activeDeals.length.toString()} />
          <br/>
          <Detail label="Views Today" value={global.stats.viewsWeek[0].toString()} />
          <Detail label="Customers Today" value={global.stats.customersWeek[0].toString()} />
          <Detail label="Claims Today" value={global.stats.claimsWeek[0].toString()} />
          <br/>
          <Detail label="Views This Month" value={global.stats.viewsMonth.toString()} />
          <Detail label="Customers This Month" value={global.stats.customersMonth.toString()} />
          <Detail label="Claims This Month" value={global.stats.claimsMonth.toString()} />
          <br/>
          <Detail label="Total Views" value={global.stats.viewsTotal.toString()} />
          <Detail label="Total Customers" value={global.stats.customersTotal.toString()} />
          <Detail label="Total Claims" value={global.stats.claimsTotal.toString()} />
          <br/>
        </GridItem>
      </GridContainer>
    )
  }
}

export default withStyles(dashboardStyle)(MainStats);