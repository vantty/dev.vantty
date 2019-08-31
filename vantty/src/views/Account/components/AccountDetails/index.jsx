import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

// Actions
import { updateInfo } from "../../../../actions/auth";
import { getCurrentProfile } from "../../../../actions/profile";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { Button, TextField } from "@material-ui/core";

// Shared components
// import FormBottomNav from "../../../components/ComponentsForm/FormBottomNav";

import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from "../../../../components";

// Component styles
import styles from "./styles";

const states = [
  {
    value: "alabama",
    label: "Alabama"
  },
  {
    value: "new-york",
    label: "New York"
  },
  {
    value: "san-francisco",
    label: "San Francisco"
  }
];

const Account = ({
  auth: { user, loading, isAuthenticated },
  getCurrentProfile,
  updateInfo,
  history,
  classes,
  className,
  ...rest
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    id: "",
    password: ""
  });

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      firstName: loading || !user.local ? "" : user.local.firstName,
      lastName: loading || !user.local ? "" : user.local.lastName,
      email: loading || !user.local ? "" : user.local.email,
      id: loading || !user._id ? "" : user._id,
      password: loading || !user.password ? "" : user.password
    });
  }, [loading, getCurrentProfile]);

  const { firstName, lastName, email } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    updateInfo(formData, history, true);
    console.log(formData);
  };
  const rootClassName = classNames(classes.root, className);

  return (
    <Portlet {...rest} className={rootClassName}>
      <PortletHeader>
        <PortletLabel
          subtitle='The information can be edited'
          title='Profile'
        />
      </PortletHeader>
      <PortletContent noPadding>
        <form autoComplete='off' noValidate>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              helperText='Please specify the first name'
              margin='dense'
              name='firstName'
              label='First Name'
              id='firstName'
              autoComplete='fname'
              required
              value={firstName}
              variant='outlined'
              onChange={e => onChange(e)}
            />
            <TextField
              className={classes.textField}
              margin='dense'
              required
              value={lastName}
              variant='outlined'
              name='lastName'
              label='Last Name'
              id='lastName'
              onChange={e => onChange(e)}
            />
          </div>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              label='Email Address'
              margin='dense'
              variant='outlined'
              name='email'
              id='local.email'
              autoComplete='email'
              fullWidth
              required
              value={email}
              onChange={e => onChange(e)}
            />
            <TextField
              className={classes.textField}
              label='Phone Number'
              margin='dense'
              type='number'
              // value={phone}
              variant='outlined'
            />
          </div>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              label='Select State'
              margin='dense'
              onChange={e => onChange(e)}
              required
              select
              SelectProps={{ native: true }}
              // value={state}
              value={"ji"}
              variant='outlined'
            >
              {states.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <TextField
              className={classes.textField}
              label='Country'
              margin='dense'
              required
              value={"ji"}
              variant='outlined'
            />
          </div>
        </form>
      </PortletContent>
      <PortletFooter className={classes.portletFooter}>
        <Button
          color='primary'
          variant='contained'
          // style={{ backgroundColor: "#f5f5" }}
          onClick={e => onSubmit(e)}
        >
          Save details
        </Button>
      </PortletFooter>
    </Portlet>
  );
};

Account.propTypes = {
  updateInfo: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, updateInfo }
)(withStyles(styles)(withRouter(Account)));

// export default withRouter(
//   connect(
//     mapStateToProps,
//     { getCurrentProfile, updateInfo }
//   )(withStyles(styles)(Account))
// );

// export default connect(
//   mapStateToProps,
//   { getCurrentProfile, updateInfo }
// )(withRouter(Account))(withStyles(styles)(Account));
