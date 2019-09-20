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

const AddEducation = ({
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
    addCategories(state, history);
    (await match.url) !== "/categories" && nextStep();
  };

  const [state, setState] = useState({
    gilad: true,
    jason: false,
    antoine: false
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter(v => v).length !== 2;
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
            <br />
            <br />
            <Fragment>
              <Grid
                container
                direction='row'
                justify='center'
                alignItems='center'
              >
                <Grid item xs={8}>
                  <form className='form'>
                    <FormControl
                      error={error}
                      component='fieldset'
                      className={classes.formControl}
                    >
                      <FormLabel component='legend'>
                        Assign responsibility
                      </FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={gilad}
                              onChange={handleChange("gilad")}
                              value='gilad'
                            />
                          }
                          label='Gilad Gray'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={jason}
                              onChange={handleChange("jason")}
                              value='jason'
                            />
                          }
                          label='Jason Killian'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={antoine}
                              onChange={handleChange("antoine")}
                              value='antoine'
                            />
                          }
                          label='Antoine Llorca'
                        />
                      </FormGroup>
                      <FormHelperText>Be careful</FormHelperText>
                    </FormControl>
                  </form>
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
                        // disabled={!price}
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

AddEducation.propTypes = {
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
)(withRouter(AddEducation));
