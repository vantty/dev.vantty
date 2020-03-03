import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// Components
import { NumberValidation } from "./components";
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
  history,
  nextStep,
  step,
  prevStep,
  match
}) => {
  const [formDataNumber, setFormDataNumber] = useState({
    phone: "",
    countryCode: ""
  });

  const { phone, countryCode } = formDataNumber;

  function handleOnChange(value, data) {
    setFormDataNumber({
      phone: value.replace(/[^0-9]+/g, ""),
      countryCode: data.countryCode === "co" ? "57" : "1"
    });
  }

  const back = e => {
    e.preventDefault();
    prevStep();
  };
  const next = e => {
    e.preventDefault();
    nextStep();
  };

  const classes = useStyles();

  const phoneForm = () => {
    return (
      <div className={classes.root}>
        <ReactPhoneInput
          defaultCountry="ca"
          onlyCountries={["co", "us", "ca"]}
          masks={{
            ca: "+. (...) ...-..-..",
            us: "+. (...) ...-..-..",
            co: "+.. (...) ...-..-.."
          }}
          disableAreaCodes
          value={phone}
          onChange={handleOnChange}
          inputExtraProps={{
            margin: "normal",
            autoComplete: "phone",
            name: "custom-username"
          }}
        />
        <NumberValidation
          phone={phone}
          countryCode={countryCode}
          history={history}
        />
      </div>
    );
  };

  return (
    <Fragment>
      <CustomPaper
        Children={
          <Fragment>
            <Typography
              variant="h6"
              align="laft"
              className={classes.typography}
            >
              Your cellphone number has been verified.
            </Typography>
            {profile && !profile.mobileNumber ? (
              phoneForm()
            ) : (
              <Fragment>
                {!profile ? (
                  <CircularProgress size={20} />
                ) : (
                  <Typography
                    variant="h4"
                    align="center"
                    className={classes.typography}
                  >
                    {`${profile.mobileNumber}`}
                    <VerifiedIcon className={classes.verifiedIcon} />
                  </Typography>
                )}
              </Fragment>
            )}
            <Typography variant="h6" align="laft">
              If you need to change it, please contact us{" "}
              <Link component={RouterLink} to="/help" variant="h6">
                here.
              </Link>
            </Typography>
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
