import React, { useState, Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

//Packages

//Actions
import { createProfile } from "../../../../actions/profile";

//components
import FormBottomNav from "../../../../components/ComponentsForm/FormBottomNav";

//Material-UI
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

//classes
import Style from "../../style";

const CreateProfile = ({
  createProfile,
  history,
  formData,
  handleChange,
  nextStep,
  step
}) => {
  const classes = Style();

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
    nextStep();
  };

  return (
    <Fragment>
      <Grid container direction='row' justify='center' alignItems='center'>
        <Grid
          item
          xs={12}
          sm={12}
          container
          direction='row'
          justify='center'
          alignItems='center'
        >
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor='age-helper'>Profesion</InputLabel>
            <Select
              select
              value={formData.profession}
              onChange={e => handleChange(e)}
              id='profession'
              name='profession'
              label='profession'
            >
              <MenuItem value={"Makeup Artists"}>Makeup Artists</MenuItem>
              <MenuItem value={"Makeup Artist & Hair"}>
                Makeup Artist & Hair
              </MenuItem>
              <MenuItem value={"Hair Stylist"}>Hair Stylist</MenuItem>
            </Select>
            <FormHelperText>
              Obviously, we know you are an artist
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid container>
          <Grid item xs={12} sm={6} md={12}>
            <Typography
              component='h5'
              variant='h5'
              className={classes.typography}
            >
              Recogniced by
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              variant='outlined'
              id='bio'
              name='bio'
              label='bio'
              margin='normal'
              multiline
              rows='4'
              fullWidth
              onChange={e => handleChange(e)}
              defaultValue={formData.bio}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sm={6} md={6}>
            <Grid item xs={12} sm={6} md={6}>
              <Typography
                component='h6'
                variant='h5'
                className={classes.typography}
              >
                Living in
              </Typography>
            </Grid>

            <Grid>
              <FormControl className={classes.textField}>
                <InputLabel>City</InputLabel>
                <Select
                  select
                  id='city'
                  name='city'
                  value={formData.city}
                  // autoComplete='fname'
                  onChange={e => handleChange(e)}
                >
                  <MenuItem value={"Toronto - Canadá"}>
                    Toronto - Canadá
                  </MenuItem>
                  <MenuItem value={"Medellín - Colombia"}>
                    Medellín - Colombia
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Grid item xs={12} sm={12} md={12}>
              <Typography
                component='h5'
                variant='h5'
                className={classes.typography}
              >
                Uses Instagram as
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <TextField
                id='instagramUsername'
                name='instagramUsername'
                label={`@Username`}
                margin='normal'
                className={classes.textField}
                value={formData.instagramUsername}
                onChange={e => handleChange(e)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <FormBottomNav
        step={step}
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
                Next
              </Button>
            </div>
          </div>
        }
      />
    </Fragment>
  );
};

export default connect(
  null,
  { createProfile }
)(withRouter(CreateProfile));
