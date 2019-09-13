import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";

import { getStrategy } from "../../../../helpers";
import EditForm from "../../../EditForm";

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
import { getCurrentProfile, createProfile } from "../../../../actions/profile";
import { FormBottomNav } from "../../../../components";

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = ({
  auth: { user, loading },
  getCurrentProfile,
  updateInfo,
  createProfile,
  profile: { profile },
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
    password: "",
    socialId: "",
    profifePicture: ""
  });

  useEffect(() => {
    getCurrentProfile();
    const strategy = getStrategy(user);
    setFormData({
      firstName: loading || !strategy ? "" : strategy.firstName,
      lastName: loading || !strategy ? "" : strategy.lastName,
      email: loading || !strategy ? "" : strategy.email,
      socialId: loading || !strategy ? "" : strategy.socialId,
      profifePicture: loading || !strategy ? "" : strategy.profifePicture,
      id: loading || !user._id ? "" : user._id,
      password: loading || !user.password ? "" : user.password
    });
  }, [loading, getCurrentProfile]);

  const { firstName, lastName, email, profifePicture } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    await updateInfo(formData, history, true);
    profile &&
      (await createProfile(
        { name: { firstName: firstName, lastName: lastName } },
        history,
        true
      ));
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
    <Fragment>
      <EditForm
        Children={
          <Card {...rest} className={clsx(classes.root, className)}>
            <form autoComplete='off' noValidate>
              <CardHeader
                subheader='The information can be edited'
                title='Profile'
              />
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
              <Fragment>
                <FormBottomNav
                  Children={
                    <div>
                      <div>
                        <Button component={Link} to='/dashboard'>
                          Back
                        </Button>
                        <Button
                          style={{ backgroundColor: "#f5f5" }}
                          onClick={e => onSubmit(e)}
                        >
                          Update
                        </Button>
                      </div>
                    </div>
                  }
                />
              </Fragment>
            </form>
          </Card>
        }
      />
    </Fragment>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
  updateInfo: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
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
  { getCurrentProfile, updateInfo, createProfile }
)(withRouter(AccountDetails));
