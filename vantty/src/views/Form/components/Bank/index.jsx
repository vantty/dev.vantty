import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Material-UI
import { makeStyles } from "@material-ui/styles";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import { Grid, LinearProgress, Typography } from "@material-ui/core";
import { CustomPaper } from "../ComponentsForm";

const useStyles = makeStyles(theme => ({
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
              <Grid container>
                <Grid item xs={2}>
                  <CreditCardIcon className={classes.cardIcon} />
                </Grid>
                <Grid item xs={10}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant='h4'>
                        {profile.stripeBankData.bankName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='h4'>
                        {profile.stripeBankData.routingNumber} - ••••{" "}
                        {profile.stripeBankData.last4}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
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

export default connect(mapStateToProps, {})(Bank);
