import React, { Fragment, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";

// Actions
import { addCategories } from "../../../../actions/profile";
import { getCurrentProfile } from "../../../../actions/profile";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import {
  CardActions,
  Divider,
  Grid,
  Typography,
  InputLabel,
  Select,
  Input,
  Chip,
  MenuItem,
  FormControl,
  Button
} from "@material-ui/core";

// Components
import { FormBottomNav, CustomPaper } from "../ComponentsForm";
import FormContext from "../../FormContext";

const useStyles = makeStyles(theme => ({
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
  setStateHair,
  setStateMakeup,
  stateHair,
  stateMakeup
}) => {
  const classes = useStyles();

  // useEffect(() => {
  //   getCurrentProfile();
  // }, []);

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
    "Haircuts",
    "All-Over color",
    "Formal styling/Special Occasion hair",
    "Blowouts",
    "Deep conditioning treatments "
  ];

  const makeup = ["Social", "Bridal", "Glam"];

  // function getStyles(name, state, theme) {
  //   return {
  //     fontWeight:
  //       state.indexOf(name) === -1
  //         ? theme.typography.fontWeightRegular
  //         : theme.typography.fontWeightMedium
  //   };
  // }

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
                            <Button onClick={back}>Back</Button>
                            <Button
                              className={classes.button}
                              onClick={e => onSubmit(e)}
                              disabled={
                                stateHair.length === 0 &&
                                stateMakeup.length === 0
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
