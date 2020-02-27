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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// Components
import CardsList from "../CardsList";

// Actions
import { createStripeCustomer, addCard } from "../../../../../../actions/book";

// Helpers
const log = console.log;

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(3)
  },
  panel: {
    width: "100%"
  },
  button: {
    textTransform: "none",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      backgroundColor: theme.palette.greenVantty.dark
    }
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

  const stripeElements = text => {
    return (
      <Fragment>
        <Grid container spacing={2}>
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
              className={classes.button}
            >
              {text}
            </Button>
          </Grid>
        </Grid>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Typography variant="h6" className={classes.title}>
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
                <Typography>Add a new card</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <form onSubmit={handleAddCard}>
                  {stripeElements("Add card")}
                </form>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Fragment>
        ) : (
          <Fragment>
            <form onSubmit={handleSubmit}>
              {stripeElements("Save your card")}
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
