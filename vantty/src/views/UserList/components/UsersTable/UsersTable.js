import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Link,
  Button,
  IconButton
} from "@material-ui/core";
import Sms from "@material-ui/icons/SmsOutlined";
import { getProfiles } from "../../../../actions/profile";
import { isIOS } from "react-device-detect";
// import { getInitials } from "../../../../helpers/getInitials";

const useStyles = makeStyles(theme => ({
  root: { width: "100%", marginTop: theme.spacing(1), overflowX: "auto" },
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: "flex",
    alignItems: "center"
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: "flex-end"
  },
  button: {
    margin: theme.spacing(1)
  }
}));
const msg = (kindOfPhone, mobileNumber, name) => {
  let text = `sms:${mobileNumber}${kindOfPhone}body=Hello! ,I watched your profile in www.vantty.com,so I wanted to get an appoinment with you!`;
  return text;
};
const UsersTable = props => {
  const classes = useStyles();

  const { className, profiles, ...rest } = props;

  useEffect(() => {
    getProfiles();
  }, []);

  const [users] = useState(profiles);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { users } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map(user => user._id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, _id) => {
    const selectedIndex = selectedUsers.indexOf(_id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, _id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding='checkbox'>
                    <Checkbox
                      checked={selectedUsers.length === users.length}
                      color='primary'
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < users.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Profile Link</TableCell>
                  <TableCell>Verify</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(0, rowsPerPage).map(user => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user._id}
                    selected={selectedUsers.indexOf(user._id) !== -1}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                        checked={selectedUsers.indexOf(user._id) !== -1}
                        color='primary'
                        onChange={event => handleSelectOne(event, user._id)}
                        value='true'
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={user.profilePicture}
                        >
                          {/* {getInitials(user.name)} */}
                        </Avatar>
                        <Typography variant='body1'>
                          {user.name.firstName}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>{user.city}</TableCell>
                    <TableCell>
                      {
                        <div>
                          <a
                            target='#'
                            href={`https://api.whatsapp.com/send?phone=${user.mobileNumber}&text=Hola!`}
                          >
                            <IconButton
                              className={classes.button}
                              aria-label='delete'
                              style={{ color: "#25D366" }}
                            >
                              <Sms />
                            </IconButton>
                          </a>

                          <a
                            href={msg(
                              isIOS ? "?" : "&",
                              user.mobileNumber,
                              user.name.firstName
                            )}
                          >
                            <IconButton
                              className={classes.button}
                              style={{ color: "blue" }}
                            >
                              <Sms />
                            </IconButton>
                          </a>
                        </div>
                      }
                    </TableCell>
                    <TableCell>
                      {
                        <Link
                          href={`http://localhost:3000/profile/artist/${user.user._id}`}
                          target='_blank'
                        >
                          Profile
                        </Link>
                      }
                    </TableCell>
                    <TableCell>
                      {
                        <Button
                          size='small'
                          variant='contained'
                          color='secondary'
                        >
                          Verify
                        </Button>
                      }
                      {<Button size='small'>Block</Button>}
                    </TableCell>
                    <TableCell>{user.date},</TableCell>
                    {/* <TableCell>
                      {moment(user.createdAt).format("DD/MM/YYYY")}
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component='div'
          count={users.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

// UsersTable.propTypes = {
//   className: PropTypes.string,
//   users: PropTypes.array.isRequired
// };

// export default UsersTable;
UsersTable.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  className: PropTypes.string,
  profiles: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(UsersTable);

// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
// import PropTypes from "prop-types";
// import { Avatar, Typography, Checkbox } from "@material-ui/core";
// import moment from "moment";
// const useStyles = makeStyles(theme => ({
//   root: {
//     width: "100%",
//     marginTop: theme.spacing(3),
//     overflowX: "auto"
//   },
//   table: {
//     minWidth: 650
//   }
// }));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const UsersTable = ({ profiles }) => {
//   const classes = useStyles();
//   console.log(profiles);
//   return (
//     <Paper className={classes.root}>
//       <Table className={classes.table}>
//         <TableHead>
//           <TableRow>
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align='right'>Calories</TableCell>
//             <TableCell align='right'>Fat&nbsp;(g)</TableCell>
//             <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
//             <TableCell align='right'>Protein&nbsp;(g)</TableCell>
//           </TableRow>
//         </TableHead>

//         <TableBody>
//           {profiles.map(user => (
//             <TableRow
//               className={classes.tableRow}
//               hover
//               key={user._id}
//               // selected={selectedUsers.indexOf(user._id) !== -1}
//             >
//               <TableCell padding='checkbox'>
//                 <Checkbox
//                   // checked={selectedUsers.indexOf(user._id) !== -1}
//                   color='primary'
//                   // onChange={event => handleSelectOne(event, user._id)}
//                   value='true'
//                 />
//               </TableCell>
//               <TableCell>
//                 <div className={classes.nameContainer}>
//                   <Avatar className={classes.avatar} src={user.profilePicture}>
//                     {/* {getInitials(user.name)} */}
//                   </Avatar>
//                   <Typography variant='body1'>{user.name.firstName}</Typography>
//                 </div>
//               </TableCell>
//               <TableCell>{user.email}</TableCell>
//               <TableCell>{user.city},</TableCell>
//               <TableCell>{user.phone}</TableCell>
//               <TableCell>
//                 {moment(user.createdAt).format("DD/MM/YYYY")}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Paper>
//   );
// };

// UsersTable.propTypes = {
//   getProfiles: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired,
//   className: PropTypes.string,
//   profiles: PropTypes.array.isRequired
// };

// export default UsersTable;
