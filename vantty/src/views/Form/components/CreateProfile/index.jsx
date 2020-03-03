import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//Actions
import { create } from "../../../../actions/profile";

//helpers
import { schemaErrorsCreateProfile } from "../../../../helpers/errorsData";

// Externals
import PropTypes from "prop-types";
import validate from "validate.js";

//Components
import { FormBottomNav } from "../ComponentsForm";

// Material components
import {
  FormControl,
  OutlinedInput,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Button,
  TextField,
  Grid,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

// Component styles
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
  },
  buttons: {
    textAlign: "right"
  }
}));

const CreateProfile = ({
  create,
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
    create(formData);
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

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <Fragment>
      <Card className={clsx(classes.root, className)}>
        {/* <form autoComplete='off' noValidate> */}
        <CardHeader
          // subheader='The information can be edited'
          title="Bio"
        />
        {/* <Divider /> */}
        <CardContent>
          <form autoComplete="off" noValidate>
            <Grid container>
              {/* <Grid
              container
              direction='column'
              justify='center'
              alignItems='center'
            > */}
              <Grid item md={12} xs={12}>
                <FormControl variant="outlined" margin="dense" fullWidth>
                  <InputLabel ref={inputLabel} htmlFor="filled-age-simple">
                    Profession
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
                        name="Profession"
                        id="filled-age-simple"
                      />
                    }
                  >
                    <MenuItem value={"Makeup Artist"}>Makeup Artist</MenuItem>
                    <MenuItem value={"Makeup & Hair Artist"}>
                      Makeup & Hair Artist
                    </MenuItem>
                    <MenuItem value={"Hair Stylist"}>Hair Stylist</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <br /> <br />
              <Grid item md={12} xs={12}>
                <TextField
                  error={hasError("bio")}
                  helperText={hasError("bio") ? formState.errors.bio[0] : null}
                  margin="dense"
                  id="bio"
                  name="bio"
                  label="Bio"
                  autoComplete="fname"
                  required
                  type="text"
                  placeholder="Tell your clients about yourself"
                  value={formState.values.bio || formData.bio || ""}
                  variant="outlined"
                  multiline
                  rows="6"
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                {/* <div className={classes.field}> */}
                <FormControl variant="outlined" margin="dense" fullWidth>
                  <InputLabel htmlFor="filled-city-simple">City</InputLabel>
                  <Select
                    select
                    error={hasError("city")}
                    value={formState.values.city || formData.city || ""}
                    onChange={handleChange}
                    id="city"
                    name="city"
                    label="city"
                    input={
                      <OutlinedInput
                        labelWidth={labelWidth}
                        name="City"
                        id="filled-city-simple"
                      />
                    }
                  >
                    <MenuItem value={"Toronto - Canada"}>
                      Toronto - Canada
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
                    label={`@ Instagram`}
                    placeholder="@myusername"
                    value={formData.instagramUsername}
                    onChange={e => handleChange(e)}
                  />
                  {/* </div> */}
                </Grid>
              </Grid>
              {/* </form> */}
            </Grid>
          </form>
        </CardContent>
        <Divider />

        {/* </Grid> */}
      </Card>
      <FormBottomNav
        step={step}
        Children={
          <div>
            <div>
              <Button onClick={back}>Back</Button>
              <Button
                className={classes.button}
                onClick={e => onSubmit(e)}
                disabled={!formState.isValid}
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

CreateProfile.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired,
  create: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, { create })(withRouter(CreateProfile));
