import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Actions
import { addCategories } from "../../../../actions/profile";
import { getCurrentProfile } from "../../../../actions/profile";
//Materila-UI

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  Avatar,
  Typography,
  Slider,
  Container
} from "@material-ui/core";
import clsx from "clsx";
// import { makeStyles } from "@material-ui/styles";
import LinkMui from "@material-ui/core/Link";
import Progress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
//Components
import { FormBottomNav } from "../../../../components";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { isMobile } from "react-device-detect";

const useStyles = makeStyles(theme => ({
  root: {
    // display: "flex"
  },
  formControl: {
    margin: theme.spacing(3)
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
  className
}) => {
  const classes = useStyles();

  useEffect(() => {
    getCurrentProfile();
  }, []);

  const continues = e => {
    e.preventDefault();
    nextStep();
  };

  const back = e => {
    e.preventDefault();
    prevStep();
  };

  const onSubmit = async e => {
    e.preventDefault();
    addCategories(state, history, stateHair, false);
    match.url === "/create-profile" && nextStep();
  };

  const [state, setState] = useState({
    Wedding: true,
    Social: false,
    Prom: false,
    Fashion: false,
    Special_Effects: false,
    Photography: false
  });

  const {
    Wedding,
    Social,
    Prom,
    Fashion,
    Special_Effects,
    Photography
  } = state;

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const error =
    [Wedding, Social, Prom, Fashion, Special_Effects, Photography].filter(
      v => v
    ).length < 1;

  //Hair
  const [stateHair, setStateHair] = useState({
    Brides: true,
    Peinados: false,
    Cut: false
  });

  const { Brides, Peinados, Cut } = stateHair;
  const errorHair = [Brides, Peinados, Cut].filter(v => v).length < 1;

  const handleChangeHair = name => event => {
    setStateHair({ ...stateHair, [name]: event.target.checked });
  };

  return (
    <Fragment>
      <Card className={clsx(classes.root, className)}>
        <form autoComplete='off' noValidate>
          <CardHeader
            // subheader='from what value do your services start'
            title='Categories'
          />
          {/* <Divider /> */}
          <CardContent>
            <Fragment>
              <Grid
                container
                direction='row'
                justify='center'
                alignItems='baseline'
              >
                <Grid item xs={6} xl={6} md={6} sm={6}>
                  {/* <form className='form'> */}

                  <FormControl
                    error={error}
                    component='fieldset'
                    className={classes.formControl}
                  >
                    <Typography color='textSecondary' variant='body1'>
                      Makeup
                    </Typography>

                    {error && (
                      <FormLabel component='legend'>
                        Select minimum one
                      </FormLabel>
                    )}

                    <FormGroup>
                      {Object.keys(state).map((data, index) => {
                        return (
                          <div key={data}>
                            <Fragment>
                              <FormControlLabel
                                key={data}
                                control={
                                  <Checkbox
                                    checked={state[data] === true && true}
                                    // state[data](
                                    //   profile &&
                                    //     profile.categories.makeup[index]
                                    // );
                                    onChange={handleChange(data)}
                                    value={toString(data)}
                                  />
                                }
                                label={data}
                              />
                            </Fragment>
                          </div>
                        );
                      })}
                    </FormGroup>
                    {/* <FormHelperText>Be careful</FormHelperText> */}
                  </FormControl>
                  {/* </form> */}
                </Grid>
                <Grid item xs={6} xl={6} md={6} sm={6}>
                  <FormControl
                    error={errorHair}
                    component='fieldset'
                    className={classes.formControl}
                  >
                    <Typography color='textSecondary' variant='body1'>
                      Hair
                    </Typography>
                    {errorHair && (
                      <FormLabel component='legend'>
                        Select minimum one
                      </FormLabel>
                    )}
                    <FormGroup>
                      {Object.keys(stateHair).map((data, index) => {
                        return (
                          <div key={data}>
                            <Fragment>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    key={data}
                                    checked={stateHair[data] === true && true}
                                    onChange={handleChangeHair(data)}
                                    value={toString(data)}
                                  />
                                }
                                label={data}
                              />
                            </Fragment>
                          </div>
                        );
                      })}
                    </FormGroup>
                    {/* <FormHelperText>Be careful</FormHelperText> */}
                  </FormControl>
                </Grid>
              </Grid>
            </Fragment>
          </CardContent>
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
                    style={{ backgroundColor: "#f5f5" }}
                    onClick={e => onSubmit(e)}
                    disabled={error || errorHair}
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
                          style={{ backgroundColor: "#f5f5" }}
                          onClick={e => onSubmit(e)}
                          disabled={error || errorHair}
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
                            style={{ backgroundColor: "#f5f5" }}
                            onClick={e => onSubmit(e)}
                            disabled={error || errorHair}
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

        {/* <Progress /> */}
      </Card>
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
export default connect(
  mapStateToProps,
  { addCategories, getCurrentProfile }
)(withRouter(AddCategories));