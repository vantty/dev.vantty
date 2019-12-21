import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { isMobile } from "react-device-detect";
import clsx from "clsx";
import randomCode from "crypto-random-string";

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
  StepConnector
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
import CheckoutContext from "./CheckoutContext";

// Helpers
const log = console.log;

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
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
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
  }
}));

const steps = ["Service", "Contact", "Payment", "Book"];

const Checkout = ({
  pay,
  getProfileById,
  profile: { profile },
  initialServices,
  history,
  match,
  cart,
  cart: { items, addedItems, total, loading },
  addNewBook,
  user: { stripeCustomerId, cards, _id },
  addUserBookings
}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [checkout, setCheckout] = React.useState({
    date: "",
    hour: "",
    address: {},
    descriptionAddress: "",
    services: [],
    totals: "",
    stripeCardId: ""
  });
  const {
    date,
    hour,
    services,
    totals,
    address,
    descriptionAddress,
    stripeCardId
  } = checkout;

  useEffect(() => {
    getProfileById(match.params.id);
  }, []);

  const handleNext = (e, total, addedItems) => {
    e.preventDefault();
    setCheckout({ ...checkout, totals: total, services: addedItems });
    setActiveStep(activeStep + 1);

    if (activeStep === 3) {
      const bookCode = randomCode({ length: 6 });
      addNewBook(
        match.params.bookId,
        profile.stripeArtistAccount,
        bookCode,
        checkout
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
            date={date}
            hour={hour}
          />
        );
      case 1:
        return (
          <AddressForm
            onChangeAddress={onChangeAddress}
            localAddress={address}
            onChangeTarget={onChangeTarget}
            descriptionAddress={descriptionAddress}
          />
        );
      case 2:
        return (
          <CheckoutContext.Provider value={{ onChangeTarget }}>
            <PaymentForm
              // onChangeTarget={onChangeTarget}
              stripeCustomerId={stripeCustomerId}
              cards={cards}
              isEdit={false}
              cardSelected={stripeCardId}
            />
          </CheckoutContext.Provider>
        );
      case 3:
        return <Summary checkout={checkout} cards={cards} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <Fragment>
      <CssBaseline />
      <Alert />
      {isMobile && <SimpleAppBar />}
      <Container maxWidth="sm">
        <main className={classes.layout}>
          {/* <Paper className={classes.paper}> */}
          <Typography component="h1" variant="h4" align="center">
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
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </Fragment>
            ) : (
              <Fragment>
                <Container maxWidth="sm">
                  {profile && getStepContent(activeStep)}
                </Container>
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}

                  {activeStep === 0 && (
                    <Button
                      variant="contained"
                      disabled={
                        (total === 0 && true) ||
                        (date === "" && true) ||
                        (hour === "" && true)
                      }
                      color="primary"
                      onClick={e => handleNext(e, total, addedItems)}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
                    </Button>
                  )}
                  {activeStep === 1 && (
                    <Button
                      variant="contained"
                      disabled={
                        Object.entries(address).length === 0 &&
                        address.constructor === Object &&
                        true
                      }
                      color="primary"
                      onClick={e => handleNext(e, total, addedItems)}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
                    </Button>
                  )}
                  {activeStep === 2 && (
                    <Button
                      variant="contained"
                      disabled={!stripeCardId}
                      color="primary"
                      onClick={e => handleNext(e, total, addedItems)}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
                    </Button>
                  )}

                  {activeStep === 3 && (
                    <Button
                      variant="contained"
                      disabled={false}
                      color="primary"
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
          {/* </Paper> */}
        </main>
      </Container>
    </Fragment>
  );
};

Checkout.propTypes = {
  history: PropTypes.object,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  pay: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  uploader: state.uploader,
  pay: state.pay,
  cart: state.cart,
  user: state.auth.user
});

export default connect(mapStateToProps, {
  getProfileById,
  initialServices,
  addNewBook
})(withRouter(Checkout));
