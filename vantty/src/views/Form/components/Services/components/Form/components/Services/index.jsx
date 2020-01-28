import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import NumberFormat from "react-number-format";

//Material-UI
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Button,
  TextField,
  FormControl,
  Typography
} from "@material-ui/core";

// Actions
import { updateInfo, loadUser } from "../../../../../../../../actions/auth";
import { getCurrentProfile } from "../../../../../../../../actions/profile";

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
    padding: "0.3rem",
    // margin: theme.spacing(1),
    fontSize: "0.6rem"
  },
  description: {
    padding: "0.3rem",
    maxWidth: "420px",
    // margin: theme.spacing(1),
    fontSize: "0.6rem"
  }
}));

const Services = ({
  auth,
  getCurrentProfile,
  updateInfo,
  uploading,
  loadUser,
  profile,
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
    inputRef: PropTypes.func.isRequired
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
        <br />
        <Typography>Add a Service</Typography>
        <Grid container direction='row' justify='center' alignItems='center'>
          <Grid item md={5} xs={5}>
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
          </Grid>

          <Grid item md={5} xs={5}>
            <TextField
              label='Amount'
              margin='dense'
              name='amount'
              required
              className={classes.textField}
              variant='outlined'
              id='amount'
              error={hasError("amount")}
              helperText={
                hasError("amount") ? formState.errors.amount[0] : null
              }
              value={formState.values.amount || serviceData.amount}
              // id='formatted-numberformat-input'
              // InputProps={{
              //   inputComponent: NumberFormatCustom
              // }}
              onChange={handleChange}
              // onChange={handleChange("amount")}
            />
          </Grid>
          <Grid item md={10} xs={10}>
            <TextField
              fullWidth
              className={classes.description}
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
                hasError("description") ? formState.errors.description[0] : null
              }
              value={formState.values.description || serviceData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid
            container
            direction='row'
            justify='flex-end'
            alignItems='flex-start'
          >
            <Button
              className={classes.textField}
              onClick={e => onSubmitPrice(e)}
              variant='contained'
              size='small'
              aria-label='small outlined'
              color='primary'
              disabled={!formState.isValid || !formState.values.description}
            >
              Add Service
            </Button>
          </Grid>
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
  loadUser
})(withRouter(Services));
