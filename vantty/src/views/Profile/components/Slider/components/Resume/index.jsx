import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    marginTop: theme.spacing(3),
    width: "100%",
    // overflowX: "auto",
    marginBottom: theme.spacing(2)
  },
  table: {
    // minWidth: 650
  }
}));

function createData(name, calories) {
  return { name, calories };
}

const rows = [
  createData("Service", 159),
  createData("Taxes", 237),
  createData("Eclair", 262)
];

export default function DenseTable() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Paper className={classes.paper}> */}
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* </Paper> */}
    </div>
  );
}
