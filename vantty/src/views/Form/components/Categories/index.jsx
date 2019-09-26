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

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
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
    (await match.url) !== "/categories" && nextStep();
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
            subheader='from what value do your services start'
            title='Categories'
          />
          <Divider />
          <CardContent className={classes.content}>
            <Typography color='textSecondary' variant='body1'>
              This is the minimum price for which you provide a service but you
              define the final price with the customer
            </Typography>
            <br />

            <Fragment>
              <Grid
                container
                direction='row'
                justify='space-evenly'
                alignItems='baseline'
              >
                <Grid item xs={5}>
                  {/* <form className='form'> */}
                  <Typography color='textSecondary' variant='body1'>
                    Makeup
                  </Typography>

                  <FormControl
                    error={error}
                    component='fieldset'
                    className={classes.formControl}
                  >
                    <FormLabel component='legend'>Select minimum one</FormLabel>

                    <FormGroup>
                      {Object.keys(state).map((data, index) => {
                        return (
                          <div key={data}>
                            <Fragment>
                              {console.log(profile.categories.makeup[index])}
                              <FormControlLabel
                                key={data}
                                control={
                                  <Checkbox
                                    checked={state[data] === true && true}
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
                <Grid item xs={5}>
                  <Typography color='textSecondary' variant='body1'>
                    Hair
                  </Typography>

                  <FormControl
                    error={errorHair}
                    component='fieldset'
                    className={classes.formControl}
                  >
                    <FormLabel component='legend'>Select minimum one</FormLabel>
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
          <Divider />
          <CardActions>
            <LinkMui component={Link} to='/'>
              learn how to build the best profile
            </LinkMui>
          </CardActions>
          <Fragment>
            <FormBottomNav
              step={step}
              Children={
                <div>
                  <div>
                    <Fragment>
                      {match.url !== "/categories" ? (
                        <Button onClick={back}>Back</Button>
                      ) : (
                        <Button component={Link} to={"/settings"}>
                          Back
                        </Button>
                      )}
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
