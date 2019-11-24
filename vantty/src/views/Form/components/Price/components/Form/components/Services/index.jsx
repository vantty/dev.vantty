import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import validate from "validate.js";
import { isMobile } from "react-device-detect";
import { getStrategy } from "../../../../../../../../helpers";

//Material-UI
import { makeStyles } from "@material-ui/styles";
import {
  CardHeader,
  CardContent,
  Grid,
  Button,
  TextField
} from "@material-ui/core";

// Actions
import { updateInfo, loadUser } from "../../../../../../../../actions/auth";
import {
  getCurrentProfile,
  createProfile
} from "../../../../../../../../actions/profile";

// Helpers
import { serviceSchemaErrors } from "../../../../../../../../helpers/errorsData";

const useStyles = makeStyles(theme => ({
  root: {},
  button: {
    float: "right",
    color: "white",
    boxShadow: "none",
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.greenVantty.light
    }
  }
}));

const Services = ({
  auth: { user, loading },
  getCurrentProfile,
  updateInfo,
  uploading,
  createProfile,
  loadUser,
  profile: { profile },
  history,
  className,
  nextStep,
  prevStep,
  match,
  step,
  serviceData,
  onChange,
  onSubmit,
  ...rest
}) => {
  const classes = useStyles();

  //errors
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  // const { typeOfService, amount } = formData;

  useEffect(() => {
    const errors = validate(formState.values, serviceSchemaErrors);
    setFormState(formState => ({
      ...formState,
      values: serviceData,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  //Errors
  const handleChange = async event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.name === "checkbox"
            ? event.target.checked
            : event.target.value
      },

      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
    onChange(event);
  };

  // const onSubmit = async e => {
  //   e.preventDefault();

  //   await updateInfo(serviceData, true);
  // };

  //errors
  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  return (
    <Fragment>
      <form autoComplete='off' noValidate>
        {/* <Divider /> */}
        <CardHeader
          // subheader='from what value do your services start'
          title='Create new typeOfService'
        />
        <CardContent>
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <TextField
                error={hasError("typeOfService")}
                helperText={
                  hasError("typeOfService")
                    ? formState.errors.typeOfService[0]
                    : null
                }
                fullWidth
                label='Service'
                margin='dense'
                name='typeOfService'
                required
                type='text'
                variant='outlined'
                id='typeOfService'
                autoComplete='fname'
                value={
                  formState.values.typeOfService || serviceData.typeOfService
                }
                onChange={handleChange}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Amount'
                margin='dense'
                name='amount'
                required
                variant='outlined'
                id='amount'
                error={hasError("amount")}
                helperText={
                  hasError("amount") ? formState.errors.amount[0] : null
                }
                value={formState.values.amount || serviceData.amount}
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label='Description'
                margin='dense'
                name='description'
                required
                type='text'
                multiline
                rows='3'
                variant='outlined'
                autoComplete='description'
                error={hasError("description")}
                helperText={
                  hasError("description")
                    ? formState.errors.description[0]
                    : null
                }
                value={formState.values.description || serviceData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid>
              <Button
                onClick={e => onSubmit(e)}
                className={classes.button}
                // disabled={!formState.isValid}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Fragment>
  );
};

Services.propTypes = {
  className: PropTypes.string,
  updateInfo: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  uploading: state.uploader.uploading
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  updateInfo,
  createProfile,
  loadUser
})(withRouter(Services));
