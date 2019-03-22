import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';

// Material-UI Components

// Material React Kit Components
import DateUtils from "components/Utils/DateUtils.jsx";

// Styles, Icons, and Images
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

// Custom Page Parts
import MonthlyView from "./MonthlyView.jsx";
import WeeklyView from "./WeeklyView.jsx";

let dateutils = new DateUtils();

const generateFakeAllStats = function(years) {
  var stats = [];
  for (var year = 0; year < years; ++year) {
    var statYear = []
    for (var month = 0; month < 12; ++month) {
      var statMonth = []
      for (var day = 0; day < dateutils.numberToDaysInMonth[month]; ++day) {
        var data = { traffic: 0, claims: 0 };
        data.traffic = 2 * ((years - year) + month + day + 1);
        data.claims = (years - year) + month + day;
        statMonth.push(data);
      }
      statYear.push(statMonth);
    }
    stats.push(statYear);
  }
  return stats;
}

class TrafficTimeline extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allStats: [],
      weekStats: [],
    }

    var pseudoAllStats = generateFakeAllStats(2);
    var date = new Date();

    this.state.allStats = pseudoAllStats;
    this.state.weekStats = pseudoAllStats[0][date.getMonth()].slice(date.getDate(), date.getDate()+7);
  }

  render() {
    const { classes, ...rest } = this.props
    return (
      <div>
        <WeeklyView week={this.state.weekStats} />
        <br/><br/><br/>
        <MonthlyView data={this.state.allStats} />
      </div>
    )
  }
}

export default withStyles(dashboardStyle)(TrafficTimeline);