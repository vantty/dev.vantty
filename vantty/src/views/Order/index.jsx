import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Material-UI
import { CssBaseline, Typography, Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Actions
import { createStripeAccount } from "../../actions/pay";

const useStyles = makeStyles(theme => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(2)
  },
  text: {
    marginBottom: theme.spacing(2)
  },
  button: {
    marginBottom: theme.spacing(10),
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      backgroundColor: theme.palette.greenVantty.dark
    }
  }
}));

const Order = ({ createStripeAccount }) => {
  const classes = useStyles();

  const handleClick = () => {
    createStripeAccount();
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h2" className={classes.title}>
          Your book is complete
        </Typography>
        <Typography variant="subtitle1" className={classes.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
        <Button
          onClick={handleClick}
          color="primary"
          variant="contained"
          className={classes.button}
        >
          Conect with Stripe
        </Button>
      </div>
    </Container>
  );
};

Order.propTypes = {
  user: PropTypes.object
};

// const mapStateToProps = state => ({
//   user: state.auth.user
// });

export default connect(null, { createStripeAccount })(Order);
