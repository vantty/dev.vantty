import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

//Actions
import { createProfile } from "../../../../actions/profile";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";

// Material helpers
import {
  withStyles,
  FormControl,
  FormHelperText,
  OutlinedInput
} from "@material-ui/core";

import FormBottomNav from "../../../../components/ComponentsForm/FormBottomNav";

// Material components
import { Button, TextField } from "@material-ui/core";

import { InputLabel, Select, MenuItem } from "@material-ui/core";

import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from "../../../../components";

// Component styles
import styles from "./styles";

const states = [
  {
    value: "alabama",
    label: "Alabama"
  },
  {
    value: "new-york",
    label: "New York"
  },
  {
    value: "san-francisco",
    label: "San Francisco"
  }
];

const CreateProfile = ({
  createProfile,
  history,
  formData,
  handleChange,
  nextStep,
  step,
  className,
  classes,
  ...rest
}) => {
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
    nextStep();
  };

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const rootClassName = classNames(classes.root, className);

  return (
    <Fragment>
      <Portlet {...rest} className={rootClassName}>
        <PortletHeader>
          <PortletLabel
            subtitle='The information can be edited'
            title='Biografy'
          />
        </PortletHeader>
        <PortletContent noPadding>
          <form autoComplete='off' noValidate>
            <div className={classes.field}>
              <FormControl
                variant='outlined'
                margin='dense'
                className={classes.textField}
              >
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
                      id='outlined-age-simple'
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
              <br /> <br />
              <TextField
                className={classes.textField}
                helperText='Please specify the first name'
                margin='dense'
                id='bio'
                name='bio'
                label='bio'
                autoComplete='fname'
                required
                defaultValue={formData.bio}
                variant='outlined'
                multiline
                rows='4'
                fullWidth
                onChange={e => handleChange(e)}
              />
            </div>
            <div className={classes.field}>
              <FormControl
                className={classes.textField}
                variant='outlined'
                margin='dense'
              >
                <InputLabel htmlFor='filled-city-simple'>City</InputLabel>
                <Select
                  select
                  id='city'
                  name='city'
                  value={formData.city}
                  onChange={e => handleChange(e)}
                  input={
                    <OutlinedInput
                      labelWidth={labelWidth}
                      name='City'
                      id='outlined-city-simple'
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
              <TextField
                className={classes.textField}
                margin='dense'
                required
                variant='outlined'
                id='instagramUsername'
                name='instagramUsername'
                label={`@Username`}
                value={formData.instagramUsername}
                onChange={e => handleChange(e)}
              />
            </div>
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
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
        </PortletFooter>
      </Portlet>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  { createProfile }
)(withStyles(styles)(withRouter(CreateProfile)));
