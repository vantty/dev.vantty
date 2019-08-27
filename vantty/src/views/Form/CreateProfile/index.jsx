import React, { useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//Packages
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData
} from "react-country-region-selector-material-ui-new";

//Actions
import { createProfile } from "../../../actions/profile";

//components
import FormBottomNav from "../ComponentsForm/FormBottomNav";

//Material-UI
import {
  Grid,
  Divider,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Input,
  InputAdornment
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button
} from "@material-ui/core";
import { object } from "prop-types";

const useStyles = makeStyles(theme => ({
  textField: {
    paddingRight: theme.spacing(1)
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    textAlign: "center",
    cursor: "none"
  },
  typography: {
    marginTop: "1rem",
    marginBottom: "-0.5rem"
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

  const getRegions = countrySelected => {
    if (!countrySelected) {
      return [];
    }
    return countrySelected[2].split("|").map(regionPair => {
      let [regionName, regionShortCode = null] = regionPair.split("~");
      return regionName;
    });
  };

  return (
    <Fragment>
      <Grid>
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
                value={formData.profession}
                onChange={e => handleChange(e)}
                id='profession'
                name='profession'
                label='profession'
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
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
            <Grid item xs={12} sm={12}>
              <Typography
                component='h1'
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

          <Grid item xs={12} sm={12} md={12}>
            <Typography
              component='h1'
              variant='h5'
              className={classes.typography}
            >
              Living in
            </Typography>
          </Grid>

          <Grid xs={12} sm={4} md={4}>
            <TextField
              required
              id='country'
              name='country'
              label='Country'
              margin='normal'
              fullWidth
              className={classes.textField}
              value={formData.country}
              autoComplete='fname'
              onChange={e => handleChange(e)}
              select
            >
              {CountryRegionData.map((option, index) => (
                <MenuItem key={option[0]} value={option[0]}>
                  {option[0]}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid xs={12} sm={4} md={4}>
            <TextField
              disabled={!formData.country && true}
              required
              id='state'
              name='state'
              label={"State"}
              fullWidth
              margin='normal'
              className={classes.textField}
              value={formData.state}
              onChange={e => handleChange(e)}
              select
            >
              {CountryRegionData.map((option, index) =>
                option[0] === formData.country
                  ? getRegions(option).map((regions, ind) => (
                      <MenuItem key={regions} value={regions}>
                        {regions}
                      </MenuItem>
                    ))
                  : null
              )}
            </TextField>
          </Grid>
          <Grid xs={12} sm={4} md={4}>
            <TextField
              required
              disabled={!formData.state && true}
              id='city'
              name='city'
              label='City'
              margin='normal'
              fullWidth
              className={classes.textField}
              value={formData.city}
              autoComplete='fname'
              onChange={e => handleChange(e)}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Typography
              component='h1'
              variant='h5'
              className={classes.typography}
            >
              Uses Instagram as
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              id='instagramUsername'
              name='instagramUsername'
              label={`@Username`}
              margin='normal'
              value={formData.instagramUsername}
              defaultValue='@'
              onChange={e => handleChange(e)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>@</InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <FormBottomNav
        step={step}
        Children={
          <div>
            <div>
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
