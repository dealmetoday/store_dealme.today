import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import ChartistGraph from "react-chartist";

// Material-UI Components

// Material React Kit Components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

// Styles, Icons, and Images
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const Chartist = require("chartist");

const chartAnimation = {
  draw: function(data) {
    if (data.type === "line" || data.type === "area") {
      data.element.animate({
        d: {
          begin: 600,
          dur: 700,
          from: data.path
            .clone()
            .scale(1, 0)
            .translate(0, data.chartRect.height())
            .stringify(),
          to: data.path.clone().stringify(),
          easing: Chartist.Svg.Easing.easeOutQuint
        }
      });
    } else if (data.type === "point") {
      data.element.animate({
        opacity: {
          begin: (data.index + 1) * 80,
          dur: 500,
          from: 0,
          to: 1,
          easing: "ease"
        }
      });
    }
  }
}

const chartOptions = function(maxval){
  // Round up to nearest ten
  maxval = (maxval % 10 === 0)
    ? maxval + 10
    : Math.ceil(maxval / 10) * 10;

  return {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: maxval,
    chartPadding: {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5
    }
  }
};

class MonthlyView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: 0,
      year: 0,
    };
  }

  render() {
    const { classes, data } = this.props
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <h3 className={classes.cardTitle}>Monthly Traffic</h3>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <ChartistGraph
              className="ct-chart"
              data={data[this.state.year][this.state.month]}
              type="Line"
              options={chartOptions(Math.max(data[this.state.year][this.state.month]))}
              listener={chartAnimation}
            />
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

MonthlyView.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

export default withStyles(dashboardStyle)(MonthlyView);