import React, { Fragment, useEffect } from "react";
import { CustomPaper, FormBottomNav } from "../ComponentsForm";
import {
  makeStyles,
  Typography,
  TextField,
  Divider,
  CardActions,
  Grid,
  Button
} from "@material-ui/core";
import { connect } from "react-redux";
import Progress from "@material-ui/core/LinearProgress";
import { update } from "../../../../actions/profile";
import { isMobile } from "react-device-detect";
import Switch from "@material-ui/core/Switch";
import { GoogleMapsAutocomplete } from "../../../../components";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "0"
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
  content: {
    padding: "1rem"
  }
}));

const Location = ({
  nextStep,
  match,
  update,
  step,
  prevStep,
  profile: { profile }
}) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    place: false,
    delivery: false,
    availability: "",
    address: {}
  });
  useEffect(() => {
    setState({
      ...state,
      availability: profile ? profile.availability : "",
      place: profile ? profile.place : false,
      delivery: profile ? profile.delivery : false
    });
  }, [profile]);

  const { address, delivery, place, availability } = state;
  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.checked });
  };
  const onChangeAvailability = e =>
    setState({ ...state, [e.target.name]: e.target.value });

  const onChangeAddress = (address, log, lat) => {
    setState({
      ...state,
      address,
      log,
      lat
    });
  };

  const values = {
    delivery,
    place,
    availability,
    address: {
      street:
        "" ||
        (address && address.street) ||
        (profile && profile.address && profile.address.street)
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    update(values);
    match.url === "/create-profile" && nextStep();
  };

  const desable = values => {
    const { address, availability, place } = values;
    if (availability && place && Object.values(address)[0]) {
      return false;
    } else if (
      availability &&
      delivery &&
      place &&
      !Object.values(address)[0]
    ) {
      return true;
    } else if (availability && delivery) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <CustomPaper
      Children={
        <Fragment>
          {profile === null ? (
            <Progress />
          ) : (
            <Fragment>
              <div className={classes.root}>
                <Typography>Tell your costumers your availability</Typography>
                <form name="availability">
                  <TextField
                    id="availability"
                    fullWidth
                    label="Availability"
                    multiline
                    rows="2"
                    placeholder="Hi! You can take an appointment with me all days on the weekend"
                    name="availability"
                    value={availability}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={onChangeAvailability}
                  />
                  <Fragment>
                    <Grid
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="center"
                    >
                      <Fragment>
                        <Grid item xs={10}>
                          <Typography>
                            You want your customers to go to a place where you
                            provide the service. Tell them the address:
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Switch
                            checked={place}
                            name="place"
                            onChange={handleChange}
                            value="place"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                        </Grid>
                        {place && (
                          <Grid item xs={12}>
                            <GoogleMapsAutocomplete
                              localAddress={
                                profile.address ? profile.address : address
                              }
                              onChangeAddress={onChangeAddress}
                            />
                          </Grid>
                        )}
                        <br />
                        <br />
                        <br />
                        <Grid item xs={10}>
                          <Typography>Do you provide home delivery?</Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Switch
                            checked={delivery}
                            name="delivery"
                            onChange={handleChange}
                            value="delivery"
                            color="primary"
                            inputProps={{ "aria-label": "primary checkbox" }}
                          />
                        </Grid>
                      </Fragment>
                    </Grid>
                    <Divider />
                    {!isMobile && match.url === "/location" && (
                      <CardActions>
                        <Grid
                          container
                          direction="row"
                          justify="flex-end"
                          alignItems="flex-start"
                        >
                          <Button
                            className={classes.button}
                            onClick={e => onSubmit(e)}
                          >
                            Update
                          </Button>
                        </Grid>
                      </CardActions>
                    )}
                  </Fragment>
                  <Fragment>
                    {match.url === "/create-profile" ? (
                      <FormBottomNav
                        step={step}
                        Children={
                          <div>
                            <div>
                              <Fragment>
                                <Button onClick={prevStep}>Back</Button>
                                <Button
                                  className={classes.button}
                                  onClick={e => onSubmit(e)}
                                  disabled={desable(values)}
                                >
                                  {match.url === "/location"
                                    ? "Update"
                                    : "Next"}
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
                                  <Button
                                    component={Link}
                                    to={"/settings/profile"}
                                  >
                                    Back
                                  </Button>
                                  <Button
                                    className={classes.button}
                                    onClick={e => onSubmit(e)}
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
              </div>
            </Fragment>
          )}
        </Fragment>
      }
    />
  );
};
const mapStateToProps = state => ({
  profile: state.profile
});

Location.propTypes = {
  update: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { update })(withRouter(Location));
