import React from "react";
import { connect } from "react-redux";
import qs from "query-string";

// Material-UI
import { CssBaseline, Typography, Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Actions
import { confirmStripeAccount } from "../../actions/pay";

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

const ConfirmArtistAccount = props => {
  const { location, confirmStripeAccount } = props;
  const { code } = qs.parse(location.search, { ignoreQueryPrefix: true });
  confirmStripeAccount(code);

  const handleClick = () => {
    console.log("CLICKED");
  };

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h2" className={classes.title}>
          You Account has been successfully created
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
          // component={RouterLink}
          // to="/personal-info"
        >
          View your profile
        </Button>
      </div>
    </Container>
  );
};

export default connect(null, { confirmStripeAccount })(ConfirmArtistAccount);
