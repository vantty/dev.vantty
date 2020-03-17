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
  saveButton: {
    float: "right",
    color: "white",
    boxShadow: "none",
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.greenVantty.light
    }
  },
  logo: {
    width: "16rem"
  }
}));

const StripeAccount = ({ match, prevStep, step, user }) => {
  const classes = useStyles();

  // Generate Stripe Link
  const stripeApi = `https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_STRIPE_CLIENT_ID}&stripe_user[country]=CA&stripe_user[email]=${user.email}&stripe_user[first_name]=${user.firstName}&stripe_user[last_name]=${user.lastName}&scope=read_only`;

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h2" className={classes.title}>
          Conect your bank account
        </Typography>
        <Typography variant="subtitle1" className={classes.text}>
          Vantty doesn't save or storage your bank information; however, we use
          a Stripe as one of the best provider for these services in the world.
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
                  <Button href={`${process.env.REACT_APP_URI}/personal-info`}>
                    Save
                  </Button>
                </div>
              </div>
            }
          />
        </div>
      )}
    </Container>
  );
};

StripeAccount.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {})(StripeAccount);
