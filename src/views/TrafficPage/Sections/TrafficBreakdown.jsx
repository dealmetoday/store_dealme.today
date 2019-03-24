import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import ChartistGraph from "react-chartist";

// Material-UI Components

// Material React Kit Components
import CardHeader from "components/Card/CardHeader.jsx";
import DateUtils from "components/Utils/DateUtils.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

// Styles, Icons, and Images
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const Chartist = require("chartist");
var dateutils = new DateUtils();

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

const chartData = {
  labels: ["15-19", "20-24", "25-29", "30-34", "35-39", "40-49", "50-59", "60+"],
  series: [
    [], [],
    [5, 30, 25, 20, 10, 5, 5, 0],
    [0, 35, 20, 20, 15, 10, 0, 0],
  ]
}

const chartOptions = {
  lineSmooth: Chartist.Interpolation.cardinal({
    tension: 0
  }),
  low: 0,
  high: 100,
  chartPadding: {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5
  }
};

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

class TrafficBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      analytics: [[[10, 20, 15]]],
      ageLeast: "60+",
      ageMost: "20-25",
      dateLeast: "",
      dateMost: "",
      genderLeast: "Male",
      genderMost: "Female",
    };

    this.getDateLeastPopular();
    this.getDateMostPopular();
  }

  getDateLeastPopular = () => {
    const data = this.state.analytics;
    var least = {
      year: 0,
      month: 0,
      day: 0,
      value: Number.MAX_SAFE_INTEGER,
    };

    for (var year = 0; year < data.length; ++year) {
      for (var month = 0; month < data[year].length; ++month) {
        var day = data[year][month].indexOf(Math.max(data[year][month]));
        if (data[year][month][day] < least.value) {
          least.year = year;
          least.month = month;
          least.day = day;
          least.value = data[year][month][day];
        }
      }
    }

    var datestr = (least.day + 1).toString() + " ";
    datestr += dateutils.numberToMonth[least.month] + " ";
    datestr += dateutils.getOffsetYear(least.year);
    this.setState({ dateLeast: datestr });
  }

  getDateMostPopular = () => {
    const data = this.state.analytics;
    var most = {
      year: 0,
      month: 0,
      day: 0,
      value: 0,
    };

    for (var year = 0; year < data.length; ++year) {
      for (var month = 0; month < data[year].length; ++month) {
        var day = data[year][month].indexOf(Math.max(data[year][month]));
        if (data[year][month][day] > most.value) {
          most.year = year;
          most.month = month;
          most.day = day;
          most.value = data[year][month][day];
        }
      }
    }

    var datestr = (most.day + 1).toString() + " ";
    datestr += dateutils.numberToMonth[most.month] + " ";
    datestr += dateutils.getOffsetYear(most.year);
    this.setState({ dateMost: datestr });
  }

  render() {
    const { classes } = this.props
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <h3 className={classes.cardTitle}>Main Traffic Statistics</h3>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Detail
            label="Most Reached Demographic"
            value={this.state.ageMost + " " + this.state.genderMost + "s"}
          />
          <Detail label="Most Popular Day" value="Friday" />
          <Detail label="Most Popular Date" value="January 1 2019" />
          <br />
          <Detail
            label="Least Reached Demographic"
            value={this.state.ageLeast + " " + this.state.genderLeast + "s"}
          />
          <Detail label="Least Popular Day" value="Wednesday" />
          <Detail label="Least Popular Date" value="January 6 2019" />
          <br/><br/>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <CardHeader color="success">
            <br/>
            <ChartistGraph
              className="ct-chart"
              data={chartData}
              type="Bar"
              options={chartOptions}
              listener={chartAnimation}
            />
          </CardHeader>
        </GridItem>
      </GridContainer>
    )
  }
}

export default withStyles(dashboardStyle)(TrafficBreakdown);