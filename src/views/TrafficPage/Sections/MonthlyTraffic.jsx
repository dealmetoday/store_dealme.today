import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import ChartistGraph from "react-chartist";

// Material-UI Components
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// Material React Kit Components
import Button from "components/CustomButtons/Button.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import DateUtils from "components/Utils/DateUtils.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

// Styles, Icons, and Images
import { chartAnimation, chartOptions } from "variables/charts.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

var dateutils = new DateUtils();

class MonthlyTraffic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorMenuMonth: null,
      anchorMenuYear: null,
      month: 0,
      year: 0,
    };
  }

  getMonthlyData = (data) => {
    data = data[this.state.year][this.state.month];

    var chartData = {
      labels: [],
      series: [[],[]],
    }

    for (var i = 0; i < data.length; ++i) {
      chartData.labels.push(i);
      chartData.series[0].push(data[i].traffic);
      chartData.series[1].push(data[i].claims);
    }
    return chartData;
  }

  handleMenuClose = (event) => {
    this.setState({ anchorMenuMonth: null });
    this.setState({ anchorMenuYear: null });
  }

  handleMenuOpen = (event) => {
    console.log(event.target.id, event.currentTarget);
    this.setState({ [event.target.id]: event.currentTarget })
  }

  handleMenuItemClick = (event) => {
    this.setState({ [event.target.id]: event.target.value });
    this.handleMenuClose();
  }

  render() {
    const { classes, data } = this.props
    return (
      <div>
        <CardHeader color="success">
          <GridContainer>
            <GridItem xs={4} sm={4} md={4}>
              <h3 className={classes.cardTitleWhite}>Monthly Traffic</h3>
            </GridItem>
            <GridItem xs={8} sm={8} md={8}>
              <div align="right">
                <div>
                  <Button
                    id="anchorMenuMonth"
                    color="success"
                    size="sm"
                    onClick={this.handleMenuOpen}
                  >
                    {dateutils.numberToMonth[this.state.month]}
                  </Button>
                  <Menu
                    id="menu_month"
                    anchorEl={this.state.anchorMenuMonth}
                    open={Boolean(this.state.anchorMenuMonth)}
                    onClose={this.handleMenuClose}
                  >
                    {data[this.state.year].map((_, month) => (
                      <MenuItem
                        key={month}
                        id="month"
                        value={month}
                        onClick={this.handleMenuItemClick}
                      >
                        {dateutils.numberToMonth[month]}
                      </MenuItem>
                    ))}
                  </Menu>
                  <Button
                    id="anchorMenuYear"
                    color="success"
                    size="sm"
                    onClick={this.handleMenuOpen}
                  >
                    {dateutils.getOffsetYear(this.state.year)}
                  </Button>
                  <Menu
                    id="menu_year"
                    anchorEl={this.state.anchorMenuYear}
                    open={Boolean(this.state.anchorMenuYear)}
                    onClose={this.handleMenuClose}
                  >
                    {data.map((_, year) => (
                      <MenuItem
                        key={year}
                        id="year"
                        value={year}
                        onClick={this.handleMenuItemClick}
                      >
                        {dateutils.getOffsetYear(year)}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </div>
            </GridItem>
          </GridContainer>
          <br/>
          <ChartistGraph
            className="ct-chart"
            data={this.getMonthlyData(data)}
            type="Line"
            options={chartOptions(Math.max(data[this.state.year][this.state.month]))}
            listener={chartAnimation}
          />
        </CardHeader>
      </div>
    )
  }
}

MonthlyTraffic.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

export default withStyles(dashboardStyle)(MonthlyTraffic);