import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { isMobile } from "react-device-detect";
import clsx from "clsx";
import randomCode from "crypto-random-string";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// Material-UI
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  StepConnector,
  IconButton,
  LinearProgress
} from "@material-ui/core";
import Check from "@material-ui/icons/Check";

// Components
import AddressForm from "./components/AddressForm";
import PaymentForm from "./components/PaymentForm";
import Service from "./components/Service";
import Summary from "./components/Summary";
import { SimpleAppBar, Alert } from "../../components";

// Actions
import { getProfileById } from "../../actions/profile";
import { initialServices } from "../../actions/cart";
import { addNewBook } from "../../actions/book";
import { gaEvent } from "../../marketing/gAnalytics";
// import CheckoutContext from "./CheckoutContext";

// Helpers

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)"
  },
  active: {
    "& $line": {
      borderColor: "#784af4"
    }
  },
  completed: {
    "& $line": {
      borderColor: "#784af4"
    }
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1
  }
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center"
  },

  active: {
    color: "#784af4"
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor"
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18
  }
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: "auto",
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  container: {
    marginTop: theme.spacing(8)
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  bookingsButton: {
    textTransform: "none",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      backgroundColor: theme.palette.greenVantty.dark
    }
  }
}));

const steps = ["Service", "Contact", "Payment", "Book"];

const Checkout = ({
  getProfileById,
  profile: { profile },
  initialServices,
  history,
  match,
  cart,
  cart: { items, addedItems, total },
  addNewBook,
  user,
  addUserBookings,
  loading
}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [checkout, setCheckout] = React.useState({
    appointmentDate: "",
    appointmentTimeStamp: "",
    address: {},
    descriptionAddress: "",
    services: [],
    totalValue: "",
    stripeCardId: "",
    place: ""
  });
  const {
    appointmentDate,
    address,
    descriptionAddress,
    stripeCardId,
    place
  } = checkout;

  useEffect(() => {
    getProfileById(match.params.id);
  }, []);

  const [location, setLocation] = useState({
    toHome: true,
    artistSite: false
  });
  const { toHome, artistSite } = location;
  const testAddress = place === "artistSite" ? profile.address : address;

  const handleNext = async (e, total, addedItems) => {
    e.preventDefault();
    setCheckout({ ...checkout, totalValue: total, services: addedItems });
    //ga
    activeStep === 0 && gaEvent("Checkout", "Service");
    activeStep === 1 && gaEvent("Checkout", "Address");
    activeStep === 2 && gaEvent("Checkout", "Payment");
    activeStep === 3 && gaEvent("Checkout", "Finished");
    setActiveStep(activeStep + 1);

    if (activeStep === 3) {
      const bookCode = randomCode({ length: 6 });

      const testAddress = place === "artistSite" ? profile.address : address;
      await addNewBook(
        match.params.bookId,
        profile.stripeArtistAccount,
        bookCode,
        checkout,
        testAddress
      );
    }
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const onChangeDate = value => {
    setCheckout({
      ...checkout,
      ...value
    });
  };

  const onChangeTarget = e =>
    setCheckout({ ...checkout, [e.target.name]: e.target.value });

  const onChangeAddress = (address, log, lat) => {
    setCheckout({
      ...checkout,
      address,
      log,
      lat
    });
  };

  const handleChange = event => {
    setLocation(event.target.value);
    setCheckout({ ...checkout, place: event.target.value });
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Service
            profile={profile}
            initialServices={initialServices}
            checkout={checkout}
            cart={cart}
            onChangeDate={onChangeDate}
            date={appointmentDate}
          />
        );
      case 1:
        return (
          <AddressForm
            onChangeAddress={onChangeAddress}
            localAddress={address}
            onChangeTarget={onChangeTarget}
            descriptionAddress={descriptionAddress}
            profile={profile}
            location={location}
            setLocation={setLocation}
            toHome={toHome}
            artistSite={artistSite}
            handleChange={handleChange}
          />
        );
      case 2:
        return (
          <PaymentForm
            onChangeTarget={onChangeTarget}
            stripeCustomerId={user.stripeCustomerId}
            cards={user.cards}
            isEdit={false}
            cardSelected={stripeCardId}
          />
        );
      case 3:
        return (
          <Summary
            checkout={checkout}
            cards={user.cards}
            address={testAddress}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const desable = (address, location) => {
    if (location === "toHome" && address.street) {
      return false;
    } else if (location === "artistSite") {
      return false;
    } else {
      return true;
    }
  };
  return (
    <Fragment>
      <CssBaseline />
      {loading && <LinearProgress />}
      <Alert />
      {isMobile && <SimpleAppBar />}
      <Container maxWidth='sm' className={classes.container}>
        {!isMobile && activeStep === 0 && (
          <IconButton>
            <Link
              component={Link}
              to={`/profile/artist/${match.params.id}`}
              variant='h6'
            >
              <ArrowBackIcon style={{ color: "black" }} />
            </Link>
          </IconButton>
        )}
        {/* <main className={classes.layout}> */}
        {/* <Paper className={classes.paper}> */}
        <Typography variant='h2' align='center'>
          Checkout
        </Typography>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<QontoConnector />}
        >
          {steps.map(label => (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Fragment>
          {activeStep === steps.length ? (
            <Fragment>
              <Typography variant='h5' gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant='subtitle1'>
                Your booking request has been placed and we have emailed your
                artist this request. Once she accepts it, we will send you the
                confirmation and your <strong>booking code.</strong>
              </Typography>
              <Button
                component={Link}
                to='/bookings-user'
                color='primary'
                variant='contained'
                className={classes.bookingsButton}
                disabled={loading}
              >
                {"See all bookings"}
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              {profile && getStepContent(activeStep)}
              <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                )}

                {activeStep === 0 && (
                  <Button
                    variant='contained'
                    disabled={
                      (total === 0 && true) || (appointmentDate === "" && true)
                    }
                    color='primary'
                    onClick={e => handleNext(e, total, addedItems)}
                    type='submit'
                    fullWidth
                    className={classes.submit}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                )}
                {activeStep === 1 && (
                  <Button
                    variant='contained'
                    disabled={desable(address, location)}
                    color='primary'
                    onClick={e => handleNext(e, total, addedItems)}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                )}
                {activeStep === 2 && (
                  <Button
                    variant='contained'
                    disabled={!stripeCardId}
                    color='primary'
                    onClick={e => handleNext(e, total, addedItems)}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                )}

                {activeStep === 3 && (
                  <Button
                    variant='contained'
                    disabled={false}
                    color='primary'
                    onClick={e => handleNext(e, total, addedItems)}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                )}
              </div>
            </Fragment>
          )}
        </Fragment>
      </Container>
    </Fragment>
  );
};

Checkout.propTypes = {
  history: PropTypes.object,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  user: PropTypes.object,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  uploader: state.uploader,
  cart: state.cart,
  user: state.auth.user,
  loading: state.book.loading
});

export default connect(mapStateToProps, {
  getProfileById,
  initialServices,
  addNewBook
})(withRouter(Checkout));
