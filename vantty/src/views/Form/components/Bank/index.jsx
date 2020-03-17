import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//Material-UI
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  LinearProgress,
  Typography,
  Link,
  Button
} from "@material-ui/core";

// Components
import { CustomPaper } from "../ComponentsForm";

// Assets
const StripeButton =
  "https://res.cloudinary.com/vantty/image/upload/v1584400238/seed/igwpowudr2ekm2zepvan.png";

const useStyles = makeStyles(theme => ({
  iconContainer: {
    textAlign: "center"
  },
  icon: {
    fontSize: "50px"
  },
  button: {
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      backgroundColor: theme.palette.greenVantty.dark
    }
  }
}));

const Bank = ({ profile: { profile }, user }) => {
  const classes = useStyles();
  const stripeApi =
    user &&
    `https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_STRIPE_CLIENT_ID}&stripe_user[country]=CA&stripe_user[email]=${user.email}&stripe_user[first_name]=${user.firstName}&stripe_user[last_name]=${user.lastName}&scope=read_only`;

  return (
    <CustomPaper
      Children={
        <Fragment>
          {!profile ? (
            <LinearProgress />
          ) : (
            <Fragment>
              {profile.stripeArtistAccount === null ? (
                <Fragment>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Typography variant="h6" align="laft">
                        In order to appear in Vantty search engine, get booked
                        and recieve payments, you need to save your banking
                        information first.{" "}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Link underline="none" color="inherit" href={stripeApi}>
                        <img
                          src={StripeButton}
                          alt=""
                          className={classes.logo}
                        />
                      </Link>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" align="laft">
                        All of your data is stored by Stripe, not by Vantty, and
                        it is completely secure. If you would like to read
                        Stripe Services Agreement and Data Polices please click{" "}
                        <Link
                          href={"https://stripe.com/es-us/ssa"}
                          target="_blank"
                          rel="noopener"
                          variant="h6"
                        >
                          here.
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                </Fragment>
              ) : (
                <Fragment>
                  <Grid container spacing={2}>
                    <Grid item xs={2} className={classes.iconContainer}>
                      <AccountBalanceIcon className={classes.icon} />
                    </Grid>
                    <Grid item xs={10}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="h3">
                            {profile.stripeBankData.bankName}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h5">
                            {profile.stripeBankData.routingNumber} - ••••{" "}
                            {profile.stripeBankData.last4}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" align="laft">
                        To view your payments history or to edit your banking
                        information, please go to your Stripe Account.{" "}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        href={profile.stripeLink}
                        target="_blank"
                        color="primary"
                        variant="contained"
                        className={classes.button}
                        startIcon={<AccountBalanceWalletIcon />}
                      >
                        {"Stripe Account"}
                      </Button>
                    </Grid>
                  </Grid>
                </Fragment>
              )}
            </Fragment>
          )}
        </Fragment>
      }
    />
  );
};

Bank.propTypes = {
  profile: PropTypes.object,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profile,
  user: state.auth.user
});

export default connect(mapStateToProps, {})(withRouter(Bank));
