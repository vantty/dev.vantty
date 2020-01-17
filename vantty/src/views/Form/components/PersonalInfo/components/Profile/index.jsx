import React, { useState, Fragment, useEffect, useRef } from "react";

// import { makeStyles } from "@material-ui/core/styles";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  TextField,
  Grid
} from "@material-ui/core";

// const useStyles = makeStyles(theme => ({
//   root: {},
//   buttons: {
//     textAlign: "right"
//   },
//   button: {
//     float: "right",
//     color: "white",
//     boxShadow: "none",
//     backgroundColor: theme.palette.greenVantty.main,
//     "&:hover": {
//       color: "white",
//       backgroundColor: theme.palette.greenVantty.light
//     }
//   }
// }));

const EditProfile = ({
  // profile: { profile, loading },

  formData,
  onChange,

  formState,

  handleChange,
  hasError
}) => {
  // const classes = useStyles();

  const inputLabel = useRef("");
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.labelWidth);
  }, []);

  return (
    <Fragment>
      <Fragment>
        <Fragment>
          <form autoComplete="off" noValidate>
            <Grid container>
              <Grid item md={12} xs={12}>
                <FormControl variant="outlined" margin="dense" fullWidth>
                  <InputLabel ref={inputLabel} htmlFor="profession">
                    Profesion
                  </InputLabel>
                  <Select
                    select
                    error={hasError("profession")}
                    value={
                      formState.values.profession || formData.profession || ""
                    }
                    onChange={handleChange}
                    id="profession"
                    name="profession"
                    label="profession"
                    input={
                      <OutlinedInput
                        labelWidth={labelWidth}
                        name="profession"
                        id="profession"
                      />
                    }
                  >
                    <MenuItem value={"Makeup Artists"}>Makeup Artists</MenuItem>
                    <MenuItem value={"Makeup Artist & Hair"}>
                      Makeup Artist & Hair
                    </MenuItem>
                    <MenuItem value={"Hair Stylist"}>Hair Stylist</MenuItem>
                  </Select>
                  {/* <FormHelperText>Tell us your profession</FormHelperText> */}
                </FormControl>
              </Grid>
              <br /> <br />
              <Grid item md={12} xs={12}>
                <Grid item xs={12}>
                  <TextField
                    required
                    variant="outlined"
                    id="bio"
                    name="bio"
                    label="bio"
                    margin="normal"
                    onChange={handleChange}
                    multiline
                    rows="6"
                    fullWidth
                    value={formState.values.bio || formData.bio}
                    error={hasError("bio")}
                    helperText={
                      hasError("bio") ? formState.errors.bio[0] : null
                    }
                  />
                </Grid>
              </Grid>
              <Grid item md={12} xs={12}>
                {/* <div className={classes.field}> */}
                <FormControl variant="outlined" margin="dense" fullWidth>
                  <InputLabel ref={inputLabel} htmlFor="city">
                    City
                  </InputLabel>
                  <Select
                    select
                    id="city"
                    name="city"
                    value={formData.city}
                    label="city"
                    onChange={e => onChange(e)}
                    input={
                      <OutlinedInput
                        labelWidth={labelWidth}
                        name="city"
                        id="city"
                      />
                    }
                  >
                    <MenuItem value={"Toronto - Canadá"}>
                      Toronto - Canadá
                    </MenuItem>
                    {/* <MenuItem value={"Medellín - Colombia"}>
                      Medellín - Colombia
                    </MenuItem> */}
                  </Select>
                </FormControl>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    id="instagramUsername"
                    name="instagramUsername"
                    label={`@Username`}
                    value={formData.instagramUsername}
                    onChange={e => onChange(e)}
                  />
                  {/* </div> */}
                </Grid>
              </Grid>
              {/* </form> */}
            </Grid>
          </form>
        </Fragment>
      </Fragment>
    </Fragment>
  );
};

export default EditProfile;
