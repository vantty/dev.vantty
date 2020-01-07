import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Material-UI
import {
  CssBaseline,
  Typography,
  Container,
  Link,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FormBottomNav } from "../ComponentsForm";

// Assets
const StripeButton =
  "https://res.cloudinary.com/vantty/image/upload/v1574347454/seed/geofw7htk4kuglyonrh9.png";

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
  },
  logo: {
    width: "16rem"
  }
}));

const StripeAccount = ({
  match,
  prevStep,
  step,
  profile: { profile },
  user
}) => {
  const classes = useStyles();

  // Generate Stripe Link
  let method = user.method;
  const mobileNumberWithoutCode = profile.mobileNumber.substring(2, 11);
  const stripeApi = `https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_STRIPE_CLIENT_ID_TEST}&stripe_user[country]=CA&stripe_user[phone_number]=${mobileNumberWithoutCode}&stripe_user[email]=${user[method].email}&stripe_user[first_name]=${user[method].firstName}&stripe_user[last_name]=${user[method].lastName}&redirect_uri=${process.env.REACT_APP_STRIPE_REDIRECT_URI_TEST}`;
  // const stripeApi = `https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_STRIPE_CLIENT_ID_TEST}&stripe_user[country]=CA&stripe_user[phone_number]=${mobileNumberWithoutCode}&stripe_user[email]=${user[method].email}&stripe_user[first_name]=${user[method].firstName}&stripe_user[last_name]=${user[method].lastName}&redirect_uri=${process.env.REACT_APP_STRIPE_REDIRECT_URI}`;

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h2" className={classes.title}>
          Conect your bank account
        </Typography>
        <Typography variant="subtitle1" className={classes.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
        <Link underline="none" color="inherit" href={stripeApi}>
          <img src={StripeButton} alt="" className={classes.logo} />
        </Link>
      </div>
      {match.url === "/create-profile" && (
        <div>
          <FormBottomNav
            step={step}
            Children={
              <div>
                <div>
                  <Button onClick={prevStep}>Back</Button>
                </div>
              </div>
            }
          />
        </div>
      )}
    </Container>
  );
};

// export default StripeAccount;

StripeAccount.propTypes = {
  profile: PropTypes.object,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profile,
  user: state.auth.user
});

export default connect(mapStateToProps, {})(StripeAccount);
