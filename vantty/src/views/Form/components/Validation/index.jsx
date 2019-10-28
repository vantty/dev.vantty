import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";

//Material-UI
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Button
} from "@material-ui/core";

// Actions
import { createProfile } from "../../../../actions/profile";
// import { AvatarUploader } from "./components";
import { FormBottomNav } from "../ComponentsForm";

// Helpers

import { Gender, Qualified, EnglishLevel } from "./components";

const useStyles = makeStyles(() => ({
  root: {}
}));

const Validation = ({
  createProfile,
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

  const classes = useStyles();

  //Errors
  const handleChange = async event => {
    event.persist();
    onChange(event);
  };

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
  profile: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(Validation));
