import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link as RouterLink, withRouter } from "react-router-dom";

//Material-UI
import { makeStyles } from "@material-ui/styles";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import { Grid, LinearProgress, Typography, Link } from "@material-ui/core";

// Components
import { CustomPaper } from "../ComponentsForm";

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: theme.spacing(2)
  },
  cardIcon: {
    fontSize: "50px"
  }
}));

const Bank = ({ profile: { profile } }) => {
  const classes = useStyles();
  return (
    <CustomPaper
      Children={
        <Fragment>
          {!profile ? (
            <LinearProgress />
          ) : (
            <Fragment>
              <Grid container className={classes.container}>
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
              </Grid>
              <Typography variant="h6" align="laft">
                If you need to change it, please contact us{" "}
                <Link component={RouterLink} to="/help" variant="h6">
                  here.
                </Link>
              </Typography>
            </Fragment>
          )}
        </Fragment>
      }
    />
  );
};

Bank.propTypes = {
  profile: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {})(withRouter(Bank));
