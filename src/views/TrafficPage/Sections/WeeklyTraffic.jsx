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
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import DateUtils from "components/Utils/DateUtils.jsx";

// Styles, Icons, and Images
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

let dateutils = new DateUtils();

class WeeklyTraffic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getConversionRate = (traffic, claims) => {
    const conversion = Math.round((claims / traffic) * 100);
    return conversion.toString() + "%";
  }

  render() {
    const { classes, week } = this.props
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <h3 className={classes.cardTitle}>Weekly Traffic</h3>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="right">Traffic</TableCell>
                  <TableCell align="right">Claims</TableCell>
                  <TableCell align="right">Conversion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {week.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row" align="left">
                      {dateutils.getOffsetDate(6 - index)}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {row.traffic}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {row.claims}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {this.getConversionRate(row.traffic, row.claims)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

WeeklyTraffic.propTypes = {
  classes: PropTypes.object.isRequired,
  week: PropTypes.array.isRequired,
};

export default withStyles(dashboardStyle)(WeeklyTraffic);