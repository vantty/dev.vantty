import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

//Material-UI
import { makeStyles } from "@material-ui/styles";
import { Divider, Grid, Button } from "@material-ui/core";

// Actions
import { update } from "../../../../actions/profile";
// import { AvatarUploader } from "./components";
import { FormBottomNav, CustomPaper } from "../ComponentsForm";

// Helpers

import { Gender, Qualified, EnglishLevel } from "./components";

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

const Validation = ({
  update,
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

    update(formData, history);
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
      <CustomPaper
        Children={
          <form autoComplete='off' noValidate>
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
                        className={classes.button}
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
        }
      />
      <br />
    </Fragment>
  );
};

Validation.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { update })(withRouter(Validation));
