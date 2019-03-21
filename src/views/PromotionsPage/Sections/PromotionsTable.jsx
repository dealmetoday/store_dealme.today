import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material-UI Components
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

// Styles, Icons, and Images
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

// Helper functions
let index = 0;
function createData(title, claims, views, remaining) {
  const data = {
    id: index,
    title: title,
    desc: "Description for promotion " + index,
    created: "--",
    expires: "--",
    claims: claims,
    views: views,
    remaining: remaining
  }

  index += 1;
  return data;
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilized = array.map((el, index) => [el, index]);
  stabilized.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilized.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
      ? (a, b) => desc(a, b, orderBy)
      : (a, b) => -desc(a, b, orderBy);
}

const headerColumns = [
  { id: "title", numeric: false, label: "Promotion Title" },
  { id: "claims", numeric: true, label: "Claims" },
  { id: "views", numeric: true, label: "Views" },
  { id: "remaining", numeric: true, label: "Remaining" },
];

class PromotionsTableHeader extends React.Component {
  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;
    return (
      <TableHead>
        <TableRow>
          {headerColumns.map((row) => (
            <TableCell
              key={row.id}
              align={row.numeric ? "right" : "left"}
              sortDirection={orderBy === row.id ? order : false}
            >
              <Tooltip
                title="Sort"
                placement={row.numeric ? "bottom-end" : "bottom-start"}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === row.id}
                  direction={order}
                  onClick={this.createSortHandler(row.id)}
                >
                  {row.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }
}

PromotionsTableHeader.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
}

class PromotionsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: "asc",
      orderBy: "title",
      page: 0,
      rowsPerPage: 10,
      selected: -1,
      data: []
    };

    // Replace this with actual data!!!
    for (var i = 0; i < 100; ++i) {
      this.state.data.push(createData("Promotion " + i, 10 + i, 25 + i, 50 + i));
    }
  };

  handleChangePage = (event, page) => {
    this.setState({ page: page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  }

  handleRequestSort = (event, property) => {
    let order = "desc";
    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order: order });
    this.setState({ orderBy: property });
  }

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div>
        <div>
          <Table aria-lebelledby="tableTitle">
            <PromotionsTableHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((promotion, index) => {
                  const selected = (this.state.selected === index);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.props.onClick(event, promotion)}
                      aria-checked={selected}
                      tabIndex={-1}
                      key={promotion.id}
                      selected={selected}
                    >
                      <TableCell componend="th" scope="row">{promotion.title}</TableCell>
                      <TableCell align="right">{promotion.claims}</TableCell>
                      <TableCell align="right">{promotion.views}</TableCell>
                      <TableCell align="right">{promotion.remaining}</TableCell>
                    </TableRow>
                  )
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={4} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={this.state.data.length}
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