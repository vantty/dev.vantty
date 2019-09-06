import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";

import { getStrategy } from "../../../../helpers";

//Material Components
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from "@material-ui/core";

// Actions
import { updateInfo } from "../../../../actions/auth";
import { getCurrentProfile } from "../../../../actions/profile";

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = ({
  auth: { user, loading },
  getCurrentProfile,
  updateInfo,
  history,
  className,
  ...rest
}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    id: "",
    password: ""
  });

  useEffect(() => {
    getCurrentProfile();
    const strategy = getStrategy(user);
    setFormData({
      firstName: loading || !strategy ? "" : strategy.firstName,
      lastName: loading || !strategy ? "" : strategy.lastName,
      email: loading || !strategy ? "" : strategy.email,
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
  };
  // const rootClassName = classNames(classes.root, className);

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

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete='off' noValidate>
        <CardHeader subheader='The information can be edited' title='Profile' />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText='Please specify the first name'
                label='First name'
                margin='dense'
                name='firstName'
                required
                variant='outlined'
                id='firstName'
                autoComplete='fname'
                value={firstName}
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Last name'
                margin='dense'
                name='lastName'
                required
                variant='outlined'
                value={lastName}
                id='lastName'
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Email Address'
                margin='dense'
                name='email'
                required
                variant='outlined'
                id='local.email'
                autoComplete='email'
                value={email}
                onChange={e => onChange(e)}
              />
            </Grid>
            {/* <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Phone Number'
                margin='dense'
                name='phone'
                type='number'
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Select State'
                margin='dense'
                name='state'
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                // value={values.state}
                variant='outlined'
              >
                {states.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Country'
                margin='dense'
                name='country'
                // onChange={handleChange}
                required
                // value={values.country}
                variant='outlined'
              />
            </Grid> */}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color='primary'
            variant='contained'
            onClick={e => onSubmit(e)}
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
  updateInfo: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
// export default AccountDetails;

// export default connect(
//   mapStateToProps,
//   { getCurrentProfile, updateInfo }
// )(withStyles(styles)(withRouter(AccountDetails)));

export default connect(
  mapStateToProps,
  { getCurrentProfile, updateInfo }
)(withRouter(AccountDetails));
