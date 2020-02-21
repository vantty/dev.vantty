import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from "react-stripe-elements";

// Material-UI
import {
  Typography,
  Grid,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// Components
import CardsList from "../CardsList";

// Actions
import { createStripeCustomer, addCard } from "../../../../../../actions/book";

// Helpers
const log = console.log;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  panel: {
    width: "100%"
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%"
  }
}));

const _StripeForm = props => {
  const {
    stripe,
    createStripeCustomer,
    addCard,
    stripeCustomerId,
    cards,
    isEdit,
    cardSelected,
    loading
  } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const classes = useStyles();

  const handleChange = ({ error }) => {
    if (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      if (stripe) {
        let { token } = await stripe.createToken();
        createStripeCustomer(token);
      } else {
        console.log("Stripe.js hasn't loaded yet.");
      }
    } catch (error) {
      log(error);
    }
  };

  const handleAddCard = async event => {
    try {
      event.preventDefault();
      if (stripe) {
        let { token } = await stripe.createToken();
        addCard(token);
      } else {
        console.log("Stripe.js hasn't loaded yet.");
      }
    } catch (error) {
      log(error);
    }
  };

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={1}>
        {stripeCustomerId ? (
          <Fragment>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <CardsList
                  cardSelected={cardSelected}
                  cards={cards}
                  isEdit={isEdit}
                />
              </Grid>
            </Grid>
            <ExpansionPanel className={classes.panel}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  Add a new card
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <form onSubmit={handleAddCard}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <CardNumberElement onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <CardExpiryElement onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <CardCVCElement onChange={handleChange} />
                    </Grid>
                    <div role="alert">{errorMessage}</div>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                      >
                        Add card
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Fragment>
        ) : (
          <Fragment>
            <form onSubmit={handleSubmit}>
              <Grid item xs={12}>
                <CardNumberElement onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <CardExpiryElement onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <CardCVCElement onChange={handleChange} />
              </Grid>
              <div role="alert">{errorMessage}</div>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  Save your card
                </Button>
              </Grid>
            </form>
          </Fragment>
        )}
      </Grid>
    </Fragment>
  );
};

const StripeForm = injectStripe(_StripeForm);

StripeForm.propTypes = {
  createStripeCustomer: PropTypes.func,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  loading: state.book.loading
});

export default connect(mapStateToProps, { createStripeCustomer, addCard })(
  StripeForm
);
