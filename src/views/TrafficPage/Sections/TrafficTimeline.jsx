import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';

// Material-UI Components
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Material React Kit Components

// Styles, Icons, and Images
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

// Custom Page Parts
import WeeklyView from "./WeeklyView";

class TrafficTimeline extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weekStats: [],
    }

    this.state.weekStats.push({traffic: 10, claims: 5});
    this.state.weekStats.push({traffic: 20, claims: 10});
    this.state.weekStats.push({traffic: 30, claims: 15});
    this.state.weekStats.push({traffic: 40, claims: 20});
    this.state.weekStats.push({traffic: 50, claims: 25});
    this.state.weekStats.push({traffic: 60, claims: 30});
    this.state.weekStats.push({traffic: 70, claims: 35});
  }

  render() {
    const { classes, ...rest } = this.props
    return (
      <div>
        <WeeklyView week={this.state.weekStats} />
      </div>
    )
  }
}

export default withStyles(dashboardStyle)(TrafficTimeline);