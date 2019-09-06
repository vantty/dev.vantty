import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";

import { getStrategyName } from "../../helpers";

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "white",
    overflow: "hidden",
    position: "fixed",
    bottom: 0,
    border: "grey"
  },
  button: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    width: "10rem",
    float: "right"
  }
});

const ContactButton = ({ profile: { mobileNumber, user, price } }) => {
  const classes = useStyles();
  // useEffect(() => {
  //   isOwner(auth, user._id);
  // }, [isOwner, user._id]);
  return (
    <Fragment>
      <div className={classes.root}>
        <Container maxWidth='md'>
          <Fragment>
            <Grid
              container
              direction='row'
              justify='space-around'
              alignItems='center'
            >
              <Grid item>
                <h2 className={classes.price}>From CAD$ {price}</h2>
              </Grid>
              <Grid item>
                <a
                  target='#'
                  href={`https://api.whatsapp.com/send?phone=${mobileNumber}&text=Hello!%20${getStrategyName(
                    user
                  )},%20I%20watched%20your%20profile%20in%20www.vantty.com,%20so%20I%20wanted%20to%20get%20an%20appoinment%20with%20you!`}
                >
                  <Button
                    className={classes.button}
                    variant='contained'
                    color='primary'
                  >
                    Contact
                  </Button>
                </a>
              </Grid>
            </Grid>
          </Fragment>
        </Container>
      </div>
    </Fragment>
  );
};

ContactButton.propTypes = {
  profile: PropTypes.object.isRequired,
  mobileNumber: PropTypes.string
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ContactButton);
