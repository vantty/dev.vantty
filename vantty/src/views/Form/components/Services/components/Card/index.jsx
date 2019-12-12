// import React, { Fragment } from "react";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
// import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
// import PlayArrowIcon from "@material-ui/icons/PlayArrow";
// import SkipNextIcon from "@material-ui/icons/SkipNext";
// import LinkMui from "@material-ui/core/Link";
// import { Button } from "@material-ui/core";

// const useStyles = makeStyles(theme => ({
//   card: {
//     display: "flex",
//     margin: "0.3rem"
//   },
//   details: {
//     display: "flex"
//   },
//   content: {
//     // flex: "1 0 auto"
//   },
//   cover: {
//     width: 151
//   },
//   controls: {
//     display: "flex",
//     alignItems: "center",
//     margin: "0.5rem",
//     fontSize: "1rem"
//   },
//   playIcon: {
//     height: 38,
//     width: 38
//   },
//   button: {
//     fontSize: "0.5rem",
//     color: "red"
//   }
// }));

// export default function ServiceCard({ services, deleteService }) {
//   const classes = useStyles();

//   return (
//     <Fragment>
//       {services.map(serv => (
//         <Card key={serv._id} className={classes.card}>
//           <div key={serv._id} className={classes.details}>
//             <CardContent className={classes.content}>
//               <Typography component='h5' variant='h5'>
//                 {serv.typeOfService}
//               </Typography>
//               <Typography color='textSecondary' variant='2'>
//                 {serv.description}
//               </Typography>
//               <div className={classes.controls}>
//                 <Typography variant={1}>{serv.amount}</Typography>
//               </div>
//               <Button>
//                 <span
//                   className={classes.button}
//                   onClick={e => deleteService(e, serv._id)}
//                 >
//                   Delete Service
//                 </span>
//               </Button>
//             </CardContent>
//           </div>

//           <br />
//         </Card>
//       ))}
//     </Fragment>
//   );
// }

import React, { Fragment } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";

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
    padding: "0.5rem" + "!important"
  }
}))(TableRow);

const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: "1rem" + "!important"
    // overflowX: "auto"
  },
  table: {
    width: "100%",
    padding: "15px"
  },
  button: {
    fontSize: "0.5rem",
    color: "red"
  }
});

export default function CustomizedTables({ services, deleteService }) {
  const classes = useStyles();

  return (
    <Fragment>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Service</StyledTableCell>
            <StyledTableCell align='right'>Value</StyledTableCell>
            <StyledTableCell align='right'>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map(serv => (
            <StyledTableRow key={serv._id}>
              <StyledTableCell component='th' scope='serv'>
                {serv.typeOfService}
              </StyledTableCell>
              <StyledTableCell align='right'>{serv.amount}</StyledTableCell>
              <StyledTableCell align='right'>
                <Button
                  className={classes.button}
                  size='small'
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
        <StyledTableCell align='right'>Add a new service</StyledTableCell>
      )}
    </Fragment>
  );
}
