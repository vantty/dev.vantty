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
  history,
  match,
  update,
  step,
  prevStep,
  profile: { profile }
}) => {
  const classes = useStyles();
  //Selector
  // const { profile } = useSelector(state => ({
  //   profile: state.profile.profile
  // }));
  // States

  // const [availability, setAvailability] = useState("");
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
      // address: profile ? profile.address : "",
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
    address: { street: address.street, log: address.log, lat: address.lat }
  };
  const onSubmit = e => {
    e.preventDefault();
    update(values);
    match.url === "/create-profile" && nextStep();
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
                    // defaultValue='Default Value'
                    name="availability"
                    value={
                      availability
                      // mode === "EDIT" ? profile.availability:availability

                      // availability || profile.availability || ""
                    }
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={onChangeAvailability}
                  />

                  {/* {match.url === "/location" && ( */}

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
                  {/* )} */}
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
                                  disabled={!place && !delivery}
                                >
                                  {match.url === "/location"
                                    ? "Update"
                                    : "next"}
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
