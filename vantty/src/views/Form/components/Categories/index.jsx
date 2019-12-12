import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import clsx from "clsx";

//Actions
import { addCategories } from "../../../../actions/profile";
import { getCurrentProfile } from "../../../../actions/profile";

//Material-UI
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Typography,
  InputLabel,
  Select,
  Input,
  Chip,
  MenuItem
} from "@material-ui/core";
//Components
import { FormBottomNav, CustomPaper } from "../ComponentsForm";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { isMobile } from "react-device-detect";
import { useTheme } from "@material-ui/styles";
import { Services } from "..";

const useStyles = makeStyles(theme => ({
  root: {},
  formControl: {
    // margin: theme.spacing(3)
  },
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
  checked: {
    color: theme.palette.greenVantty.main,
    "&$checked": {
      color: theme.palette.greenVantty.main
    }
  },
  formControl: {
    margin: theme.spacing(),
    width: "100%"
    // minWidth: 120,
    // maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

const AddCategories = ({
  addCategories,
  history,
  profile: { profile, loading },
  createProfile,
  nextStep,
  prevStep,
  step,
  match,
  getCurrentProfile,
  className,
  setStateHair,
  setStateMakeup,
  stateHair,
  stateMakeup
}) => {
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    getCurrentProfile();
  }, []);

  const back = e => {
    e.preventDefault();
    prevStep();
  };
  const [stateHairElement, setStateHairElement] = React.useState([]);
  const [stateMakeupElement, setStateMakeupElement] = React.useState([]);

  const onSubmit = async e => {
    e.preventDefault();
    match.url === "/categories" &&
      addCategories(stateMakeupElement, history, stateHairElement, false);
    match.url === "/create-profile" &&
      addCategories(stateMakeup, history, stateHair, false);
    match.url === "/create-profile" && nextStep();
  };

  const handleChangeHair = event => {
    match.url === "/create-profile" && setStateHair(event.target.value);
    setStateHairElement(event.target.value);
  };

  const handleChangeMakeup = event => {
    match.url === "/create-profile" && setStateMakeup(event.target.value);
    setStateMakeupElement(event.target.value);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };

  const hair = [
    "corte",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander"
  ];

  const makeup = [
    "Artistic",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander"
  ];

  function getStyles(name, state, theme) {
    return {
      fontWeight:
        state.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium
    };
  }
  return (
    <Fragment>
      <CustomPaper
        Children={
          <Fragment>
            <form autoComplete='off' noValidate>
              {/* <Divider /> */}
              <div>
                <Fragment>
                  <Typography>Categoties</Typography>
                  <FormControl className={classes.formControl}>
                    <InputLabel id='demo-mutiple-chip-label'>Hair</InputLabel>
                    <Select
                      labelId='demo-mutiple-chip-label'
                      id='demo-mutiple-chip'
                      multiple
                      value={stateHair || stateHairElement}
                      onChange={handleChangeHair}
                      input={<Input id='select-multiple-chip' />}
                      renderValue={selected => (
                        <div className={classes.chips}>
                          {selected.map(value => (
                            <Chip
                              key={value}
                              label={value}
                              className={classes.chip}
                            />
                          ))}
                        </div>
                      )}
                      MenuProps={MenuProps}
                    >
                      {hair.map(name => (
                        <MenuItem
                          key={name}
                          value={name}
                          // style={getStyles(name, stateHair, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* MAKEUP */}
                  <FormControl className={classes.formControl}>
                    <InputLabel id='demo-mutiple-chip-label'>Makeup</InputLabel>
                    <Select
                      labelId='demo-mutiple-chip-label'
                      id='demo-mutiple-chip'
                      multiple
                      value={stateMakeup || stateMakeupElement}
                      onChange={handleChangeMakeup}
                      input={<Input id='select-multiple-chip' />}
                      renderValue={selected => (
                        <div className={classes.chips}>
                          {selected.map(value => (
                            <Chip
                              key={value}
                              label={value}
                              className={classes.chip}
                            />
                          ))}
                        </div>
                      )}
                      MenuProps={MenuProps}
                    >
                      {makeup.map(name => (
                        <MenuItem
                          key={name}
                          value={name}
                          // style={getStyles(name, stateMakeup, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* <Services formData={formData} onChange={onChange} /> */}
                </Fragment>
              </div>

              {match.url === "/categories" && !isMobile && (
                <Fragment>
                  <Divider />

                  <CardActions>
                    <Grid
                      container
                      direction='row'
                      justify='flex-end'
                      alignItems='flex-start'
                    >
                      <Button
                        className={classes.button}
                        onClick={e => onSubmit(e)}
                        // disabled={error || errorHair}
                      >
                        Update
                      </Button>
                    </Grid>
                  </CardActions>
                </Fragment>
              )}
              <Fragment>
                {match.url === "/create-profile" ? (
                  <FormBottomNav
                    step={step}
                    Children={
                      <div>
                        <div>
                          <Fragment>
                            {/* {match.url !== "/categories" ? (
                          <Button onClick={back}>Back</Button>
                        ) : (
                          <Button component={Link} to={"/dashboard"}>
                            Back
                          </Button>
                        )} */}
                            <Button onClick={back}>Back</Button>
                            <Button
                              className={classes.button}
                              onClick={e => onSubmit(e)}
                              disabled={
                                // stateHair === undefined ||
                                stateHair.length == 0 ||
                                // stateMakeup === undefined ||
                                stateMakeup.length == 0
                              }
                            >
                              {match.url === "/categories" ? "Update" : "next"}
                            </Button>
                          </Fragment>
                        </div>
                      </div>
                    }
                  />
                ) : (
                  isMobile && (
                    <FormBottomNav
                      step={step}
                      Children={
                        <div>
                          <div>
                            <Fragment>
                              <Button component={Link} to={"/settings"}>
                                Back
                              </Button>
                              <Button
                                className={classes.button}
                                onClick={e => onSubmit(e)}
                                // disabled={error || errorHair}
                              >
                                Update
                              </Button>
                            </Fragment>
                          </div>
                        </div>
                      }
                    />
                  )
                )}
              </Fragment>
            </form>
          </Fragment>
        }
      />
    </Fragment>
  );
};

AddCategories.propTypes = {
  addCategories: PropTypes.func.isRequired,
  className: PropTypes.string,
  // createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, { addCategories, getCurrentProfile })(
  withRouter(AddCategories)
);
