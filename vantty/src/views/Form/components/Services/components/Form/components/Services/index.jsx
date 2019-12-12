import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import validate from "validate.js";
import { isMobile } from "react-device-detect";
import { getStrategy } from "../../../../../../../../helpers";
import NumberFormat from "react-number-format";

//Material-UI
import { makeStyles } from "@material-ui/styles";
import {
  CardHeader,
  CardContent,
  Grid,
  Button,
  TextField,
  FormControl,
  Typography,
  Divider
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
  // root: {},
  button: {
    float: "right",
    color: "white",
    boxShadow: "none",
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.greenVantty.light
    }
  },
  // root: {
  //   "& > *": {
  //     margin: theme.spacing(1)
  //   }
  // },
  textField: {
    padding: "0.3rem"
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
  onSubmitPrice,
  availability,
  onChangeAvailability,
  onSubmitAvailability,
  ...rest
}) => {
  const classes = useStyles();

  function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
          onChange({
            target: {
              value: values.value
            }
          });
        }}
        thousandSeparator
        isNumericString
        prefix='$'
      />
    );
  }

  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  };

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

  // const onSubmitPrice = async e => {
  //   e.preventDefault();

  //   await updateInfo(serviceData, true);
  // };

  //errors
  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  return (
    <Fragment>
      {/* <form autoComplete='off' noValidate> */}

      <div className={classes.root}>
        <Typography>Tell you to your clients to availability</Typography>
        <form name='availability'>
          <TextField
            id='availability'
            fullWidth
            label='Availability'
            multiline
            rows='2'
            placeholder='Hi! You can take an appointment with me all days on the weekend'
            // defaultValue='Default Value'
            name='availability'
            value={"" || availability.availability || profile.availability}
            className={classes.textField}
            margin='normal'
            variant='outlined'
            onChange={onChangeAvailability}
          />
          {!isMobile && (
            <Button
              className={classes.textField}
              onClick={e => onSubmitAvailability(e)}
              // className={classes.button}
              size='small'
              aria-label='small outlined'
              color='primary'
            >
              update
            </Button>
          )}
        </form>
        <Divider />
        <br />
        <Typography>Add a Service</Typography>
        <Grid container direction='row' justify='center' alignItems='center'>
          {/* <Grid item md={6} xs={12}> */}
          <FormControl>
            <TextField
              error={hasError("typeOfService")}
              helperText={
                hasError("typeOfService")
                  ? formState.errors.typeOfService[0]
                  : null
              }
              className={classes.textField}
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
          </FormControl>

          {/* <Grid item md={6} xs={12}> */}
          <TextField
            label='Amount'
            margin='dense'
            name='amount'
            required
            className={classes.textField}
            variant='outlined'
            id='amount'
            error={hasError("amount")}
            helperText={hasError("amount") ? formState.errors.amount[0] : null}
            value={formState.values.amount || serviceData.amount}
            // id='formatted-numberformat-input'
            // InputProps={{
            //   inputComponent: NumberFormatCustom
            // }}
            onChange={handleChange}
            // onChange={handleChange("amount")}
          />
          {/* </Grid> */}
          {/* <Grid item md={12} xs={12}>
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
            </Grid> */}
          {/* <Grid> */}
          <Button
            className={classes.textField}
            onClick={e => onSubmitPrice(e)}
            // className={classes.button}
            size='small'
            aria-label='small outlined'
            color='primary'
            disabled={!formState.isValid}
          >
            Add Service
          </Button>
          {/* </Grid> */}
          {/* </Grid> */}
        </Grid>
      </div>
      {/* </form> */}
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
