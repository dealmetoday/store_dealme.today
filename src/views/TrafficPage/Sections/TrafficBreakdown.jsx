import React from "react";
import { withStyles } from '@material-ui/core/styles';

// Material-UI Components

// Material React Kit Components

// Styles, Icons, and Images
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class TrafficBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      dealState: "",
    };
  }

  render() {
    return (
      <div>
        <p>RIGHT</p>
      </div>
    )
  }
}

export default withStyles(dashboardStyle)(TrafficBreakdown);