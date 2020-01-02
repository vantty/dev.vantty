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
import { GoogleMapsAutocomplete } from "../../../../components";
const log = console.log;

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  }
}));

export default function AddressForm({
  onChangeTarget,
  localAddress,
  onChangeAddress,
  descriptionAddress,
  onChange,
  profile: { delivery, place }
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
          {/* <FormControl className={classes.formControl}>
            <Select value={location} onChange={handleChange}>
              <MenuItem value={"artistLocation"}>Artist Location</MenuItem>
              <MenuItem value={"userLocation"}>
                A location of your choice
              </MenuItem>
            </Select>
          </FormControl> */}
        </Grid>
        {delivery && (
          <Fragment>
            <GoogleMapsAutocomplete
              localAddress={localAddress}
              onChangeTarget={onChangeTarget}
              onChangeAddress={onChangeAddress}

              // onChange={onChange}
              // descriptionAddress={descriptionAddress}
            />

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
        )}
        {place && (
          <Fragment>
            <Grid item xs={12}>
              <Typography variant='h6' gutterBottom>
                Artist Location
              </Typography>
            </Grid>
          </Fragment>
        )}
        {/* ) : null} */}
        {/* <Grid item xs={12}>
          <Typography variant='h6' gutterBottom>
            Validate your phone
          </Typography>
          <TextField id='outlined-basic' label='Outlined' variant='outlined' />
        </Grid> */}
      </Grid>
    </Fragment>
  );
}
