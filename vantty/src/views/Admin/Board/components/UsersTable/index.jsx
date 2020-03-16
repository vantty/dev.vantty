import React, { useState, useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import PerfectScrollbar from "react-perfect-scrollbar";
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
import {
  getProfiles,
  verifiedProfile,
  deleteProfileAndUserDashboard
} from "../../../../../actions/profile";
import { isIOS } from "react-device-detect";
import BoardContext from "../../BoardContext";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(),
    overflowX: "auto",
    textAlign: `center !important`,
    padding: `0 !important`
  },
  tableCell: {
    padding: `0 !important`
  },
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

  const {
    className,
    history,
    formData,
    deleteProfileAndUserDashboard,
    verifiedProfile,
    ...rest
  } = props;

  const { profiles } = useContext(BoardContext);

  const [verifyButton, setVerifyButton] = useState({});
  const [users] = useState(profiles);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const onSubmit = (e, value, id) => {
    e.preventDefault();

    verifiedProfile({ verified: value, id: id });
    setVerifyButton({ ...verifyButton, [id]: value });
  };
  const deleteUsers = (e, elasticId, id) => {
    e.preventDefault();
    deleteProfileAndUserDashboard({ elasticId, id });
  };
  //Selects
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
        {/* <PerfectScrollbar> */}
        <div className={classes.inner}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedUsers.length === users.length}
                    color="primary"
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
                <TableCell>Delete Account</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {users.slice(0, rowsPerPage) */}
              {users.map(user => (
                <TableRow
                  className={classes.tableCell}
                  hover
                  key={user._id}
                  selected={selectedUsers.indexOf(user._id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.indexOf(user._id) !== -1}
                      color="primary"
                      onChange={event => handleSelectOne(event, user.user)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <div className={classes.nameContainer}>
                      <Avatar
                        className={classes.avatar}
                        src={user.profilePicture}
                      >
                        {/* {getInitials(user.name)} */}
                      </Avatar>
                      <Typography variant="body1">
                        {user.name.firstName}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell>{user.city}</TableCell>
                  <TableCell className={classes.tableCell}>
                    {
                      <div>
                        <a
                          target="#"
                          href={`https://api.whatsapp.com/send?phone=${user.mobileNumber}&text=Hola!`}
                        >
                          <IconButton
                            className={classes.button}
                            aria-label="delete"
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
                  <TableCell className={classes.tableCell}>
                    {
                      <Link
                        //   href={`${process.env.REACT_APP_PATH}/profile/artist/${user.user._id}`}
                        //   target='_blank'
                        // >
                        href={`https://vantty.ca/profile/artist/${user.user}`}
                        target="_blank"
                      >
                        Profile
                      </Link>
                    }
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        // onChange={event => handleSelectOne(event, user._id)}
                        // onChange={event =>
                        //   handleSelectVerified(event, user._id)
                        // }
                        disabled={
                          verifyButton[user.user] !== undefined
                            ? verifyButton[user.user]
                            : user.verified
                        }
                        onClick={e => onSubmit(e, true, user.user)}
                      >
                        Verify
                      </Button>
                    }
                    {
                      <Button
                        size="small"
                        disabled={
                          verifyButton[user.user] !== undefined
                            ? !verifyButton[user.user]
                            : !user.verified
                        }
                        onClick={e => onSubmit(e, false, user.user)}
                      >
                        Block
                      </Button>
                    }
                  </TableCell>
                  <TableCell>{user.date},</TableCell>

                  {/* <TableCell>
                    {moment(user.createdAt).format("DD/MM/YYYY")}
                  </TableCell> */}
                  <TableCell>
                    {
                      <Button
                        size="small"
                        // variant='contained'
                        color="secondary"
                        // disabled={verifyButton}
                        onClick={e => deleteUsers(e, user.elasticId, user.user)}
                      >
                        Delete
                      </Button>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* </PerfectScrollbar> */}
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
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
  profiles: PropTypes.array.isRequired,
  verifiedProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  verifiedProfile,
  deleteProfileAndUserDashboard,
  getProfiles
})(UsersTable);
