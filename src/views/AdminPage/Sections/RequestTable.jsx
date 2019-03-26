import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material React Kit Components

// Material-UI Components
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

// Styles, Icons, and Images
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class PromotionsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 5,
      selected: -1,
    };
  };

  handleChangePage = (event, page) => {
    this.setState({ page: page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  }

  render() {
    const { rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, global.requests.length - page * rowsPerPage);

    return (
      <div>
        <div>
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell padding="none" align="left">Action</TableCell>
                <TableCell padding="none" align="left">Model</TableCell>
                <TableCell padding="none" align="left">Request Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {global.requests
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(request => (
                  <TableRow
                    hover
                    onClick={event => this.props.onClick(event, request)}
                    tabIndex={-1}
                    key={request._id}
                  >
                    <TableCell padding="none" component="th" scope="row">{request.content.request}</TableCell>
                    <TableCell padding="none" align="left">{request.model}</TableCell>
                    <TableCell padding="none" align="left">{request.content.key}</TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell padding="none" colSpan={4} />
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={global.promotions.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
}

PromotionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(dashboardStyle)(PromotionsTable);