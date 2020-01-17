import React, { Fragment } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 13
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    },
    padding: `0.5rem !important`
  }
}))(TableRow);

const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: `1rem !important`
    // overflowX: "auto"
  },
  table: {
    width: "100%",
    padding: "15px"
  },
  button: {
    fontSize: "0.5rem",
    color: "red"
  },
  bottomMessagge: {
    marginTop: "1rem",
    paddingLeft: "5px"
  }
});

export default function CustomizedTables({ services, deleteService }) {
  const classes = useStyles();

  return (
    <Fragment>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Service</StyledTableCell>
            <StyledTableCell align="right">Value</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map(serv => (
            <StyledTableRow key={serv._id}>
              <StyledTableCell component="th" scope="serv">
                {serv.typeOfService}
              </StyledTableCell>
              <StyledTableCell align="right">{serv.amount}</StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  className={classes.button}
                  size="small"
                  onClick={e => deleteService(e, serv._id)}
                >
                  Remove Service
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {services.length === 0 && (
        <Typography variant="h6" className={classes.bottomMessagge}>
          Add a new service
        </Typography>
      )}
    </Fragment>
  );
}
