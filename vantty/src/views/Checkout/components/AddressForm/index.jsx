import React, { Fragment, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const log = console.log;

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  }
}));

export default function AddressForm({
  onChangeTarget,
  address,
  descriptionAddress
}) {
  const classes = useStyles();

  const [location, setLocation] = useState("");

  const handleChange = event => {
    setLocation(event.target.value);
  };

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h6' gutterBottom>
            Place of the service
          </Typography>
          <FormControl className={classes.formControl}>
            <Select value={location} onChange={handleChange}>
              <MenuItem value={"artistLocation"}>Artist Location</MenuItem>
              <MenuItem value={"userLocation"}>
                A location of your choice
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {location === "userLocation" ? (
          <Fragment>
            <Grid item xs={12}>
              <TextField
                required
                id='address'
                label='Address'
                name='address'
                value={address}
                onChange={onChangeTarget}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id='description'
                label='Description'
                name='descriptionAddress'
                value={descriptionAddress}
                onChange={onChangeTarget}
                fullWidth
              />
            </Grid>
          </Fragment>
        ) : location === "artistLocation" ? (
          <Fragment>
            <Grid item xs={12}>
              <h1>Artist Location</h1>
            </Grid>
          </Fragment>
        ) : null}
        <Grid item xs={12}>
          <Typography variant='h6' gutterBottom>
            Validate your phone
          </Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
}
