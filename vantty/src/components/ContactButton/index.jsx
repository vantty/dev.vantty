import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

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
    marginRight: "1rem",
    width: "55%",
    float: "right"
  },
  input: {
    display: "none"
  },
  price: {
    marginTop: "0.5rem",
    marginLeft: "1rem",
    width: "30%",
    marginBottom: "1rem",
    paddingBlock: "0.2rem",
    float: "left",
    display: "inline-block"
  }
});

const ContactButton = ({ profile: { mobileNumber, user } }) => {
  const classes = useStyles();
  // useEffect(() => {
  //   isOwner(auth, user._id);
  // }, [isOwner, user._id]);
  return (
    <Fragment>
      <div className={classes.root}>
        <Fragment>
          <Grid>
            <h2 className={classes.price}>CAD$ 50</h2>
          </Grid>
          <Grid>
            <a
              target='#'
              href={`https://api.whatsapp.com/send?phone=${mobileNumber}&text=Hello!%20${
                user.local.firstName
              },%20I%20watched%20your%20profile%20in%20www.vantty.com,%20so%20I%20wanted%20to%20get%20an%20appoinment%20with%20you!`}
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
        </Fragment>
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
