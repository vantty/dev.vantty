import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// Components
import { NumberValidation } from "./components";
import { FormBottomNav, CustomPaper } from "../ComponentsForm";

//Material-UI
import { makeStyles } from "@material-ui/styles";
import { Button, Typography } from "@material-ui/core";
import VerifiedIcon from "@material-ui/icons/VerifiedUserRounded";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    display: "inline-block"
  },
  formControl: {
    alignContent: "center",
    alignItems: "center"
  },
  typography: {
    marginBottom: "1.5rem"
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

  return (
    <Fragment>
      <CustomPaper
        Children={
          <div className={classes.root}>
            <Typography
              component="h5"
              variant="h6"
              align="center"
              className={classes.typography}
            >
              Enter a cellphone number where we and your clients can reach you
              if it is necessary.
            </Typography>
            {profile && !profile.mobileNumber ? (
              <div className={classes.root}>
                <ReactPhoneInput
                  defaultCountry="us"
                  onlyCountries={["co", "us", "ca"]}
                  masks={{
                    co: "+.. (...) ...-..-..",
                    ca: "+. (...) ...-..-..",
                    us: "+. (...) ...-..-.."
                  }}
                  disableAreaCodes
                  value={phone}
                  onChange={handleOnChange}
                  inputExtraProps={{
                    margin: "normal",
                    autoComplete: "phone",
                    name: "custom-username"
                  }}
                  inputClass={classes.field}
                  dropdownClass={classes.countryList}
                />
                <NumberValidation
                  phone={phone}
                  countryCode={countryCode}
                  history={history}
                />
              </div>
            ) : (
              <Typography variant="h4" align="center">
                {`+${profile.mobileNumber}`}
                <VerifiedIcon className={classes.verifiedIcon} />
              </Typography>
            )}
          </div>
        }
      />
      {match.url === "/create-profile" ? (
        <div>
          <FormBottomNav
            step={step}
            Children={
              <div>
                <div>
                  <Button onClick={back}>Back</Button>
                  <Button
                    onClick={next}
                    className={classes.button}
                    disabled={!profile.mobileNumber}
                  >
                    Next
                  </Button>
                </div>
              </div>
            }
          />
        </div>
      ) : (
        <div>
          <FormBottomNav
            step={step}
            Children={
              <div>
                <div>
                  <Button component={Link} to="/settings/profile">
                    Back
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
