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
import { getProfiles, verifiedProfile } from "../../../../../actions/profile";
import { isIOS } from "react-device-detect";
import { Verified as VerifiedIcon } from "../../../../../assets/icons";
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

  const {
    className,
    profiles,
    history,
    formData,
    verifiedProfile,
    ...rest
  } = props;

  useEffect(() => {
    getProfiles();
  }, []);

  const onSubmit = (e, value, id) => {
    e.preventDefault();
    verifiedProfile({ verified: value, id: id });
  };

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
                  <TableCell>date when verified</TableCell>
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
                          disabled={user.verified}
                          onClick={e => onSubmit(e, true, user._id)}
                        >
                          Verify
                        </Button>
                      }
                      {
                        <Button
                          size='small'
                          disabled={!user.verified}
                          onClick={e => onSubmit(e, false, user._id)}
                        >
                          Block
                        </Button>
                      }
                    </TableCell>
                    <TableCell>{user.date},</TableCell>

                    <TableCell>
                      {moment(user.createdAt).format("DD/MM/YYYY")}
                    </TableCell>
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
  profiles: PropTypes.array.isRequired,
  verifiedProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles, verifiedProfile }
)(UsersTable);
