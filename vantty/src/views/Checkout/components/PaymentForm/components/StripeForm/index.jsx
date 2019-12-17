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
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";

// Components
import CardsList from "../CardsList";
import { Progress } from "../../../../../../components";

// Actions
import { validateCard, addCard } from "../../../../../../actions/book";

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
    validateCard,
    addCard,
    stripeCustomerId,
    cards,
    onChangeTarget,
    isEdit,
    cardSelected
  } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
  const classes = useStyles();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleChange = ({ error }) => {
    if (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSubmit = async event => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
    try {
      event.preventDefault();
      if (stripe) {
        let { token } = await stripe.createToken();
        validateCard(token);
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
                  onChangeTarget={onChangeTarget}
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
                      <Button type="submit" variant="contained" color="primary">
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
                <Button type="submit" variant="contained" color="primary">
                  Save your card
                </Button>
              </Grid>
              {/* <Grid item xs={12}>
                <div className={classes.root}>
                  <div className={classes.wrapper}>
                    <Fab
                      aria-label="save"
                      color="primary"
                      className={buttonClassname}
                    >
                      {success ? <CheckIcon /> : <SaveIcon />}
                    </Fab>
                    {loading && (
                      <CircularProgress
                        size={68}
                        className={classes.fabProgress}
                      />
                    )}
                  </div>
                  <div className={classes.wrapper}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={buttonClassname}
                      disabled={loading}
                    >
                      Save your card
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                </div>
              </Grid> */}
            </form>
          </Fragment>
        )}
      </Grid>
    </Fragment>
  );
};

const StripeForm = injectStripe(_StripeForm);

StripeForm.propTypes = {
  validateCard: PropTypes.func
};

// const mapStateToProps = state => ({
//   user: state.auth.user
// });

export default connect(null, { validateCard, addCard })(StripeForm);
