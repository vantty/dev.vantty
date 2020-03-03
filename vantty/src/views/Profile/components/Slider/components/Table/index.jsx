import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles(theme => ({
  root: {
    padding: `3px !important`
  },

  table: {
    fontSize: "2px",
    padding: `3px !important`
  }
}));

export default function DenseTable({ services }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Table className={classes.table} padding="none">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map(row => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.typeOfService}
              </TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
