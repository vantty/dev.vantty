import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import validate from "validate.js";
//Actions
import { createProfile } from "../../../../actions/profile";

// Externals
import PropTypes from "prop-types";

//Components
import { FormBottomNav } from "../../../../components";

// Material components
import {
  FormControl,
  FormHelperText,
  OutlinedInput,
  CardActions,
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
import LinkMui from "@material-ui/core/Link";

// Component styles
const useStyles = makeStyles(() => ({
  root: {},
  buttons: {
    textAlign: "right"
  }
}));

const schema = {
  bio: {
    presence: { allowEmpty: false, message: "is required" },
    bio: true,
    length: {
      maximum: 64
    }
  }
};

const CreateProfile = ({
  createProfile,
  history,
  formData,
  handleChange,
  nextStep,
  prevStep,
  step,
  className,
  ...rest
}) => {
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
    nextStep();
  };

  const back = e => {
    e.preventDefault();
    prevStep();
  };

  // const [formState, setFormState] = useState({
  //   isValid: false,
  //   values: {},
  //   touched: {},
  //   errors: {}
  // });

  // useEffect(() => {
  //   const errors = validate(formState.values, bio, schema);
  //   setFormState(formState => ({
  //     ...formState,
  //     isValid: errors ? false : true,
  //     errors: errors || {}
  //   }));
  // }, [formState.values]);

  // // const handleChangeVal = event => {
  // //   event.persist();

  // //   setFormState(formState => ({
  // //     ...formState,
  // //     values: {
  // //       ...formState.values,
  // //       [event.target.name]:
  // //         event.target.type === "checkbox"
  //           ? event.target.checked
  //           : event.target.value
  //     },
  //     touched: {
  //       ...formState.touched,
  //       [event.target.name]: true
  //     }
  //   }));
  // };
  // const {
  //   values: { bio }
  // } = formState;
  // const hasError = field =>
  //   formState.touched[field] && formState.errors[field] ? true : false;

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const classes = useStyles();

  return (
    <Fragment>
      <Card className={clsx(classes.root, className)}>
        {/* <form autoComplete='off' noValidate> */}
        <CardHeader subheader='The information can be edited' title='Profile' />
        <Divider />
        <CardContent>
          {/* <form autoComplete='off' noValidate> */}
          <Grid container>
            {/* <Grid
              container
              direction='column'
              justify='center'
              alignItems='center'
            > */}
            <Grid item md={12} xs={12}>
              <FormControl variant='outlined' margin='dense' fullWidth>
                <InputLabel ref={inputLabel} htmlFor='filled-age-simple'>
                  Profesion
                </InputLabel>
                <Select
                  select
                  value={formData.profession}
                  onChange={e => handleChange(e)}
                  id='profession'
                  name='profession'
                  label='profession'
                  input={
                    <OutlinedInput
                      labelWidth={labelWidth}
                      name='Profession'
                      id='filled-age-simple'
                    />
                  }
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
            <br /> <br />
            <Grid item md={12} xs={12}>
              <TextField
                // helperText={hasError("bio") ? formState.errors.bio[0] : null}
                margin='dense'
                id='bio'
                name='bio'
                label='bio'
                autoComplete='fname'
                required
                defaultValue={formData.bio}
                // value={bio || ""}
                // error={hasError("bio")}
                variant='outlined'
                type='text'
                multiline
                rows='6'
                fullWidth
                // onChange={handleChangeVal}
                onChange={e => handleChange(e)}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              {/* <div className={classes.field}> */}
              <FormControl variant='outlined' margin='dense' fullWidth>
                <InputLabel htmlFor='filled-city-simple'>City</InputLabel>
                <Select
                  select
                  value={formData.city}
                  onChange={e => handleChange(e)}
                  id='city'
                  name='city'
                  label='city'
                  input={
                    <OutlinedInput
                      labelWidth={labelWidth}
                      name='City'
                      id='filled-city-simple'
                    />
                  }
                >
                  <MenuItem value={"Toronto - Canadá"}>
                    Toronto - Canadá
                  </MenuItem>
                  <MenuItem value={"Medellín - Colombia"}>
                    Medellín - Colombia
                  </MenuItem>
                </Select>
              </FormControl>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  margin='dense'
                  required
                  variant='outlined'
                  id='instagramUsername'
                  name='instagramUsername'
                  label={`@Username`}
                  value={formData.instagramUsername}
                  onChange={e => handleChange(e)}
                />
                {/* </div> */}
              </Grid>
            </Grid>
            {/* </form> */}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions className={classes.buttons}>
          <div>
            <div>
              <LinkMui component={Link} to='/'>
                learn how to build the best profile
              </LinkMui>
            </div>
          </div>
        </CardActions>
        {/* </Grid> */}
        {/* </form> */}
      </Card>
      <FormBottomNav
        step={step}
        Children={
          <div>
            <div>
              <Button onClick={back}>Back</Button>
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

CreateProfile.propTypes = {
  className: PropTypes.string
};

export default connect(
  null,
  { createProfile }
)(withRouter(CreateProfile));
