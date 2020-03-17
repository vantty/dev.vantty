import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link as RouterLink } from "react-router-dom";

//Material-UI
import { makeStyles } from "@material-ui/styles";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import { Grid, LinearProgress, Typography, Link } from "@material-ui/core";

// Components
import { CustomPaper } from "../ComponentsForm";

// Assets
const StripeButton =
  "https://res.cloudinary.com/vantty/image/upload/v1584400238/seed/igwpowudr2ekm2zepvan.png";

const useStyles = makeStyles(theme => ({
  cardIcon: {
    fontSize: "50px"
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
                    <Grid item xs={2}>
                      <CreditCardIcon className={classes.cardIcon} />
                    </Grid>
                    <Grid item xs={10}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="h4">
                            {profile.stripeBankData.bankName}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h4">
                            {profile.stripeBankData.routingNumber} - ••••{" "}
                            {profile.stripeBankData.last4}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" align="laft">
                        If you need to change your banking information, please
                        click{" "}
                        <Link component={RouterLink} to="/help" variant="h6">
                          here.
                        </Link>
                      </Typography>
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
