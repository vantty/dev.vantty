import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import validate from "validate.js";
import { isMobile } from "react-device-detect";
import { getStrategy } from "../../../../helpers";

//Material-UI
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Typography
} from "@material-ui/core";

// Actions
import { updateInfo, loadUser } from "../../../../actions/auth";
import { getCurrentProfile, createProfile } from "../../../../actions/profile";
// import { AvatarUploader } from "./components";
import { FormBottomNav } from "../ComponentsForm";

// Helpers
import {
  schemaErrors,
  schemaErrorsCreateProfile
} from "../../../../helpers/errorsData";
import { Gender, Qualified, EnglishLevel } from "./components";

const useStyles = makeStyles(() => ({
  root: {}
}));

const Validation = ({
  createProfile,
  getCurrentProfile,
  history,
  nextStep,
  formData,
  setFormData,
  prevStep,
  onChange,
  step,
  className,
  match,
  ...rest
}) => {
  const onSubmit = e => {
    e.preventDefault();

    createProfile(formData, history);
    nextStep();
  };

  //errors
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schemaErrorsCreateProfile);
    setFormState(formState => ({
      ...formState,
      values: formData,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const classes = useStyles();

  //Errors
  const handleChange = async event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
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

  //errors
  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  ////////////

  const back = e => {
    e.preventDefault();
    prevStep();
  };

  return (
    <Fragment>
      <Card className={clsx(classes.root, className)}>
        <form autoComplete='off' noValidate>
          <CardHeader
            // subheader='The information can be edited'
            title='Professional'
          />
          {/* <Divider /> */}
          <CardContent>
            <Grid container spacing={3}>
              <br />
              <Grid item md={12} xs={12}>
                <Gender formData={formData} handleChange={handleChange} />
                <br />
                <Qualified formData={formData} handleChange={handleChange} />
                <br />
                <EnglishLevel formData={formData} handleChange={handleChange} />
              </Grid>
            </Grid>
          </CardContent>

          <Divider />
          {/* {match.url === "/create-profile" && (
            <FormBottomNav
              step={step}
              Children={
                <div>
                  <div>
                    <Fragment>
                      <Button onClick={back}>Back</Button>
                      <Button
                        onClick={e => onSubmit(e)}
                        style={{ backgroundColor: "#f5f5" }}
                        disabled={!formState.isValid}
                      >
                        Next
                      </Button>
                    </Fragment>
                  </div>
                </div>
              }
            />
          )} */}

          <FormBottomNav
            step={step}
            Children={
              <div>
                <div>
                  <Fragment>
                    <Button onClick={back}>Back</Button>
                    <Button
                      onClick={e => onSubmit(e)}
                      style={{ backgroundColor: "#f5f5" }}
                      disabled={
                        !formData.gender ||
                        !formData.qualified ||
                        !formData.englishLevel
                      }
                    >
                      Next
                    </Button>
                  </Fragment>
                </div>
              </div>
            }
          />
        </form>
      </Card>
      <br />
    </Fragment>
  );
};

Validation.propTypes = {
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

export default connect(
  mapStateToProps,
  { getCurrentProfile, updateInfo, createProfile, loadUser }
)(withRouter(Validation));
