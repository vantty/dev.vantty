import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// Components
import { FormBottomNav, CustomPaper } from "../ComponentsForm";

//Material-UI
import { makeStyles } from "@material-ui/styles";
import { Button, Typography, CircularProgress, Link } from "@material-ui/core";
import VerifiedIcon from "@material-ui/icons/VerifiedUserRounded";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    display: "inline-block"
  },
  phone: {
    alignContent: "center",
    alignItems: "center"
  },
  typography: {
    marginBottom: theme.spacing(2)
  },
  button: {
    float: "right",
    color: "white",
    boxShadow: "none",
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.greenVantty.light
    }
  },
  verifiedIcon: {
    color: "rgb(0, 223, 212)",
    marginLeft: "0.3rem",
    marginBottom: "-0.3rem",
    width: "1rem"
  }
}));

const InfoContact = ({
  profile: { profile },
  nextStep,
  step,
  prevStep,
  match
}) => {
  const back = e => {
    e.preventDefault();
    prevStep();
  };
  const next = e => {
    e.preventDefault();
    nextStep();
  };

  const classes = useStyles();

  return (
    <Fragment>
      <CustomPaper
        Children={
          <Fragment>
            {profile && !profile.mobileNumber ? (
              <Fragment>
                <Typography variant="h6" align="laft">
                  You phone will be validated once you have saved your banking
                  information. To do it please click{" "}
                  <Link component={RouterLink} to="/bank" variant="h6">
                    here.
                  </Link>
                </Typography>
              </Fragment>
            ) : (
              <Fragment>
                {!profile ? (
                  <CircularProgress size={20} />
                ) : (
                  <Fragment>
                    <Typography
                      variant="h6"
                      align="laft"
                      className={classes.typography}
                    >
                      Your cellphone number has been verified.
                    </Typography>
                    <Typography variant="h4" className={classes.typography}>
                      {`${profile.mobileNumber}`}
                      <VerifiedIcon className={classes.verifiedIcon} />
                    </Typography>
                    <Typography variant="h6" align="laft">
                      If you need to change it, please contact us{" "}
                      <Link component={RouterLink} to="/help" variant="h6">
                        here.
                      </Link>
                    </Typography>
                  </Fragment>
                )}
              </Fragment>
            )}
          </Fragment>
        }
      />
      {match.url === "/create-profile" && (
        <div>
          <FormBottomNav
            step={step}
            Children={
              <div>
                <div>
                  <Button onClick={back}>Back</Button>
                  <Button onClick={next} className={classes.button}>
                    Next
                  </Button>
                </div>
              </div>
            }
          />
        </div>
      )}
    </Fragment>
  );
};

InfoContact.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {})(withRouter(InfoContact));
