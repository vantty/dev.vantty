// import React from "react";
// import PropTypes from "prop-types";
// import clsx from "clsx";
// import { lighten, makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TablePagination from "@material-ui/core/TablePagination";
// import TableRow from "@material-ui/core/TableRow";
// import TableSortLabel from "@material-ui/core/TableSortLabel";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import Paper from "@material-ui/core/Paper";
// import Checkbox from "@material-ui/core/Checkbox";
// import IconButton from "@material-ui/core/IconButton";
// import Tooltip from "@material-ui/core/Tooltip";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Switch from "@material-ui/core/Switch";
// import DeleteIcon from "@material-ui/icons/Delete";
// import FilterListIcon from "@material-ui/icons/FilterList";

// function createData(name, calories) {
//   return { name, calories };
// }

// const rows = [
//   createData("Cupcake", 305, 3.7),
//   createData("Donut", 452, 25.0),
//   createData("Eclair", 262, 16.0),
//   createData("Frozen yoghurt", 159, 6.0),
//   createData("Gingerbread", 356, 16.0)
// ];

// // function desc(a, b, orderBy) {
// //   if (b[orderBy] < a[orderBy]) {
// //     return -1;
// //   }
// //   if (b[orderBy] > a[orderBy]) {
// //     return 1;
// //   }
// //   return 0;
// // }

// // function stableSort(array, cmp) {
// //   const stabilizedThis = array.map((el, index) => [el, index]);
// //   stabilizedThis.sort((a, b) => {
// //     const order = cmp(a[0], b[0]);
// //     if (order !== 0) return order;
// //     return a[1] - b[1];
// //   });
// //   return stabilizedThis.map(el => el[0]);
// // }

// // function getSorting(order, orderBy) {
// //   return order === "desc"
// //     ? (a, b) => desc(a, b, orderBy)
// //     : (a, b) => -desc(a, b, orderBy);
// // }

// const headCells = [
//   {
//     id: "name",
//     numeric: false,
//     disablePadding: true,
//     label: "Services"
//   },
//   { id: "calories", numeric: true, disablePadding: false, label: "Price" }
// ];

// // function EnhancedTableHead(props) {
// //   const {
// //     classes,
// //     onSelectAllClick,
// //     order,
// //     orderBy,
// //     numSelected,
// //     rowCount,
// //     onRequestSort
// //   } = props;
// //   const createSortHandler = property => event => {
// //     onRequestSort(event, property);
// //   };

// //   return (
// //     <TableHead>
// //       <TableRow>
// //         <TableCell padding='checkbox'>
// //           <Checkbox
// //             indeterminate={numSelected > 0 && numSelected < rowCount}
// //             s
// //             checked={numSelected === rowCount}
// //             onChange={onSelectAllClick}
// //             inputProps={{ "aria-label": "select all desserts" }}
// //           />
// //         </TableCell>
// //         {headCells.map(headCell => (
// //           <TableCell
// //             key={headCell.id}
// //             align={headCell.numeric ? "right" : "left"}
// //             padding={headCell.disablePadding ? "none" : "default"}
// //             sortDirection={orderBy === headCell.id ? order : false}
// //           >
// //             <TableSortLabel
// //               active={orderBy === headCell.id}
// //               direction={order}
// //               onClick={createSortHandler(headCell.id)}
// //             >
// //               {headCell.label}
// //               {orderBy === headCell.id ? (
// //                 <span className={classes.visuallyHidden}>
// //                   {order === "desc" ? "sorted descending" : "sorted ascending"}
// //                 </span>
// //               ) : null}
// //             </TableSortLabel>
// //           </TableCell>
// //         ))}
// //       </TableRow>
// //     </TableHead>
// //   );
// // }

// // EnhancedTableHead.propTypes = {
// //   classes: PropTypes.object.isRequired,
// //   numSelected: PropTypes.number.isRequired,
// //   onRequestSort: PropTypes.func.isRequired,
// //   onSelectAllClick: PropTypes.func.isRequired,
// //   order: PropTypes.oneOf(["asc", "desc"]).isRequired,
// //   orderBy: PropTypes.string.isRequired,
// //   rowCount: PropTypes.number.isRequired
// // };

// const useToolbarStyles = makeStyles(theme => ({
//   root: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(1)
//   },
//   highlight:
//     theme.palette.type === "light"
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85)
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark
//         },
//   title: {
//     flex: "1 1 100%"
//   }
// }));

// // const EnhancedTableToolbar = props => {
// //   const classes = useToolbarStyles();
// //   const { numSelected } = props;

// //   return (
// //     <Toolbar
// //       className={clsx(classes.root, {
// //         [classes.highlight]: numSelected > 0
// //       })}
// //     >
// //       {numSelected > 0 ? (
// //         <Typography
// //           className={classes.title}
// //           color='inherit'
// //           variant='subtitle1'
// //         >
// //           {numSelected} selected
// //         </Typography>
// //       ) : (
// //         <Typography className={classes.title} variant='h6' id='tableTitle'>
// //           Nutrition
// //         </Typography>
// //       )}

// //       {numSelected > 0 ? (
// //         <Tooltip title='Delete'>
// //           <IconButton aria-label='delete'>
// //             <DeleteIcon />
// //           </IconButton>
// //         </Tooltip>
// //       ) : (
// //         <Tooltip title='Filter list'>
// //           <IconButton aria-label='filter list'>
// //             <FilterListIcon />
// //           </IconButton>
// //         </Tooltip>
// //       )}
// //     </Toolbar>
// //   );
// // };

// // EnhancedTableToolbar.propTypes = {
// //   numSelected: PropTypes.number.isRequired
// // };

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: "100%"
//     // marginTop: theme.spacing(3)
//   },
//   paper: {
//     width: "100%"
//     // marginBottom: theme.spacing(2)
//   },
//   table: {
//     // minWidth: 750
//   },
//   tableWrapper: {
//     // overflowX: "auto"
//   },
//   visuallyHidden: {
//     border: 0,
//     clip: "rect(0 0 0 0)",
//     height: 1,
//     margin: -1,
//     overflow: "hidden",
//     padding: 0,
//     position: "absolute",
//     top: 20,
//     width: 1
//   }
// }));

// export default function EnhancedTable() {
//   const classes = useStyles();
//   const [order, setOrder] = React.useState("asc");
//   const [orderBy, setOrderBy] = React.useState("calories");
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(true);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const handleRequestSort = (event, property) => {
//     const isDesc = orderBy === property && order === "desc";
//     setOrder(isDesc ? "asc" : "desc");
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = event => {
//     if (event.target.checked) {
//       const newSelecteds = rows.map(n => n.name);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }

//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = event => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = event => {
//     setDense(event.target.checked);
//   };

//   const isSelected = name => selected.indexOf(name) !== -1;

//   const emptyRows =
//     rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

//   return (
//     <div className={classes.root}>
//       {/* <Paper className={classes.paper}> */}
//       {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
//       <div className={classes.tableWrapper}>
//         <Table
//           className={classes.table}
//           aria-labelledby='tableTitle'
//           size={dense ? "small" : "medium"}
//           aria-label='enhanced table'
//         >
//           {/* <EnhancedTableHead
//             classes={classes}
//             // numSelected={selected.length}
//             // order={order}
//             // orderBy={orderBy}
//             // onSelectAllClick={handleSelectAllClick}
//             // onRequestSort={handleRequestSort}
//             rowCount={rows.length}
//           /> */}
//           <TableBody>
//             {/* {stableSort(rows, getSorting(order, orderBy)) */}
//             {/* // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
//             {rows.map((row, index) => {
//               const isItemSelected = isSelected(row.name);
//               const labelId = `enhanced-table-checkbox-${index}`;

//               return (
//                 <TableRow
//                   hover
//                   onClick={event => handleClick(event, row.name)}
//                   role='checkbox'
//                   aria-checked={isItemSelected}
//                   tabIndex={-1}
//                   key={row.name}
//                   selected={isItemSelected}
//                 >
//                   <TableCell padding='checkbox'>
//                     <Checkbox
//                       checked={isItemSelected}
//                       inputProps={{ "aria-labelledby": labelId }}
//                     />
//                   </TableCell>
//                   <TableCell
//                     component='th'
//                     id={labelId}
//                     scope='row'
//                     padding='none'
//                   >
//                     {row.name}
//                   </TableCell>
//                   <TableCell align='right'>{row.calories}</TableCell>
//                   <TableCell align='right'>{row.fat}</TableCell>
//                 </TableRow>
//               );
//             })}
//             {emptyRows > 0 && (
//               <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
//                 <TableCell colSpan={6} />
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       {/* <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component='div'
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         backIconButtonProps={{
//           "aria-label": "previous page"
//         }}
//         nextIconButtonProps={{
//           "aria-label": "next page"
//         }}
//         onChangePage={handleChangePage}
//         onChangeRowsPerPage={handleChangeRowsPerPage}
//       /> */}
//       {/* </Paper> */}
//       {/* <FormControlLabel
//         control={<Switch checked={dense} onChange={handleChangeDense} />}
//         label='Dense padding'
//       /> */}
//     </div>
//   );
// }

// import React from "react";
// import PropTypes from "prop-types";
// import clsx from "clsx";
// import { lighten, makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TablePagination from "@material-ui/core/TablePagination";
// import TableRow from "@material-ui/core/TableRow";
// import TableSortLabel from "@material-ui/core/TableSortLabel";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import Paper from "@material-ui/core/Paper";
// import Checkbox from "@material-ui/core/Checkbox";
// import IconButton from "@material-ui/core/IconButton";
// import Tooltip from "@material-ui/core/Tooltip";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Switch from "@material-ui/core/Switch";
// import DeleteIcon from "@material-ui/icons/Delete";
// import FilterListIcon from "@material-ui/icons/FilterList";

// const log = console.log;

// function createData(name, calories) {
//   return { name, calories };
// }

// const rows = [
//   createData("Cupcake", 305, 3.7),
//   createData("Donut", 452, 25.0),
//   createData("Eclair", 262, 16.0),
//   createData("Frozen yoghurt", 159, 6.0),
//   createData("Gingerbread", 356, 16.0)
// ];

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: "100%"
//     // marginTop: theme.spacing(3)
//   },
//   paper: {
//     // width: "100%"
//     // marginBottom: theme.spacing(2)
//   },
//   table: {
//     margin: "0",
//     padding: "0"
//   },
//   tableWrapper: {
//     // overflowX: "auto"
//   },
//   visuallyHidden: {
//     border: 0,
//     clip: "rect(0 0 0 0)",
//     height: 1,
//     margin: -1,
//     // overflow: "hidden",
//     padding: 0,
//     // position: "absolute",
//     top: 20,
//     width: "100%"
//   }
// }));

// export default function EnhancedTable({ services, onChange }) {
//   const classes = useStyles();
//   const [order, setOrder] = React.useState("asc");
//   const [orderBy, setOrderBy] = React.useState("calories");
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(true);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const handleClick = async (event, _id, typeOfService, amount) => {
//     const selectedIndex = selected.indexOf(_id);
//     let newSelected = [];
//     // let newSelectedObject = { [_id]: { typeOfService: typeOfService } };

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, _id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }
//     // newSelectedObject.id = newSelected;

//     await setSelected(newSelected);
//     log(newSelected);
//     // log("NewSelec", newSelected);
//     // log("NewSeleObj", newSelectedObject);
//     await onChange(event, {
//       service: newSelected
//       // service: `${newSelected}?service=${typeOfService}?amount=${amount}`
//       // [_id]: {
//       //   typeOfService: typeOfService,
//       //   amount: amount
//       // }
//     });
//   };

//   const isSelected = _id => selected.indexOf(_id) !== -1;
//   const emptyRows =
//     rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

//   return (
//     <div>
//       {/* <Paper className={classes.paper}> */}
//       {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
//       <div className={classes.tableWrapper}>
//         <Table
//           className={classes.table}
//           aria-labelledby='tableTitle'
//           size={dense ? "small" : "medium"}
//           aria-label='enhanced table'
//         >
//           <TableBody>
//             {/* {stableSort(rows, getSorting(order, orderBy)) */}
//             {/* // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
//             {services.map((row, index) => {
//               const isItemSelected = isSelected(row._id);
//               const labelId = `enhanced-table-checkbox-${index}`;

//               return (
//                 <TableRow
//                   hover
//                   onClick={event =>
//                     handleClick(event, row._id, row.typeOfService, row.amount)
//                   }
//                   role='checkbox'
//                   aria-checked={isItemSelected}
//                   tabIndex={-1}
//                   key={row._id}
//                   name={row._id}
//                   selected={isItemSelected}
//                 >
//                   <TableCell padding='checkbox'>
//                     <Checkbox
//                       checked={isItemSelected}
//                       inputProps={{ "aria-labelledby": labelId }}
//                     />
//                   </TableCell>
//                   <TableCell
//                     component='th'
//                     id={labelId}
//                     scope='row'
//                     padding='none'
//                   >
//                     {row.typeOfService}
//                   </TableCell>
//                   <TableCell align='right'>{row.amount}</TableCell>
//                 </TableRow>
//               );
//             })}
//             {/* {emptyRows > 0 && (
//               <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
//                 <TableCell colSpan={3} />
//               </TableRow>
//             )} */}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }

import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing(3)
  }
}));

export default function CheckboxesGroup({ services, onChange }) {
  const classes = useStyles();

  // const [state, setState] = useState([]);

  // const handleChange = amount => event => {
  //   event.preventDefault();
  //   if (event.target.checked) {
  //     setState({
  //       ...state,
  //       [event.target.name]: { type: event.target.value, amount: amount }
  //     });
  //     onChange(event, state);
  //   } else {
  //     delete state[event.target.name];
  //   }
  //   onChange(state);
  // };
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Services</FormLabel>
        <FormGroup>
          {services.map(service => (
            <Fragment key={service._id}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={onChange(service.amount)}
                        // onChange={handleChange}
                        value={service.typeOfService}
                        name={service._id}
                      />
                    }
                    label={service.typeOfService}
                  />
                </Grid>
                <Grid item>{service.amount}</Grid>
              </Grid>
            </Fragment>
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
}