import React, { useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//Actions
import { createProfile } from "../../../actions/profile";

//components
import FormBottomNav from "../ComponentsForm/FormBottomNav";

//Material-UI
import { Grid, Divider, makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
}));

const CreateProfile = ({
  createProfile,
  history,
  formData,
  handleChange,
  nextStep,
  step
}) => {
  const classes = useStyles();

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
    nextStep();
  };

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <Typography component='h5' variant='h6' align='left'>
            I am ...
          </Typography>
          <FormGroup row align='right'>
            <FormControlLabel
              control={
                <Checkbox
                  id='profession'
                  name='profession'
                  label='profession'
                  value={"Makeup Artist"}
                  onChange={e => handleChange(e)}
                />
              }
              label='Makeup Artist'
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={e => handleChange(e)}
                  id='profession'
                  name='profession'
                  label='profession'
                  value={"Hair Stylist"}
                />
              }
              label='Hair Stylist'
            />
          </FormGroup>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              required
              variant='outlined'
              id='bio'
              name='bio'
              label='bio'
              fullWidth
              multiline
              rows='4'
              onChange={e => handleChange(e)}
              defaultValue={formData.bio}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='location'
              name='location'
              label='Location'
              fullWidth
              className={classes.textField}
              value={formData.location}
              autoComplete='fname'
              onChange={e => handleChange(e)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='instagramUsername'
              name='instagramUsername'
              label='Username Instagram'
              fullWidth
              className={classes.textField}
              value={formData.instagramUsername}
              autoComplete='fname'
              onChange={e => handleChange(e)}
            />
          </Grid>
        </Grid>
        <FormBottomNav
          step={step}
          Children={
            <div>
              <div>
                <Button
                  style={{ backgroundColor: "#f5f5" }}
                  primary='true'
                  onClick={e => onSubmit(e)}
                >
                  Next
                </Button>
              </div>
            </div>
          }
        />
      </Grid>
    </Fragment>
  );
};

export default connect(
  null,
  { createProfile }
)(withRouter(CreateProfile));
