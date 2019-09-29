import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { UsersToolbar, UsersTable } from "./components";

import Progress from "@material-ui/core/LinearProgress";
import { getProfiles } from "../../actions/profile";
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  },
  content: {
    marginTop: theme.spacing(1)
  }
}));

const UserList = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, []);

  const classes = useStyles();
  const data = profiles;

  // const [users] = useState(data);

  return (
    <div className={classes.root}>
      {/* <UsersToolbar /> */}
      <div className={classes.content}>
        {loading ? (
          <Progress />
        ) : (
          <Fragment>
            {profiles.length > 0 ? (
              <UsersTable profiles={data} />
            ) : (
              <Progress />
            )}
          </Fragment>
        )}
        {/* {console.log(profiles)} */}
      </div>
    </div>
  );
};

UserList.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(UserList);
