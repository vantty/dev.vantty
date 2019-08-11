import React, { useState, Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../../actions/profile";

import MaskedInput from "react-text-mask";

import FormBottomNav from "../ComponentsForm/FormBottomNav";
import Alert from "../../../components/Alert";
import SimpleAppBar from "../ComponentsForm/SimpleAppBar";

//Materila-UI
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NumberFormat from "react-number-format";
import { Container, Input, Box } from "@material-ui/core";
import ArrowBack from "../../../components/ArrowBack";

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired
};

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      thousandSeparator
      prefix='$'
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

const InfoContact = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
  classes
}) => {
  const [formData, setFormData] = useState({
    mobileNumber: ""
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      mobileNumber: loading || !profile.social ? "" : profile.mobileNumber
    });
  }, [loading, getCurrentProfile]);

  const {
    profilePicture,
    bio,
    profession,
    location,
    mobileNumber,
    instagramUsername,
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  const [values, setValues] = React.useState({
    textmask: "(1  )    -      ",
    numberformat: "1320"
  });

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value
    });
  };

  return (
    <Fragment>
      <CssBaseline />
      <SimpleAppBar
        message={"3: Whatsapp number"}
        progress={3}
        page={"/profile"}
      />
      <Box pt={11} pb={8}>
        <Alert />
        <Container maxWidth='sm'>
          <Typography component='h5' variant='h6' align='left'>
            Para activar tu cuenta debes confirmar tu número de contacto
          </Typography>
          <FormControl>
            <InputLabel htmlFor='formatted-text-mask-input'>
              react-text-mask
            </InputLabel>
            <Input
              value={values.textmask}
              onChange={handleChange("textmask")}
              id='formatted-text-mask-input'
              inputComponent={TextMaskCustom}
            />
            <FormBottomNav
              step={3}
              backPage={"/add-portfolio"}
              nextPage={"/welcome"}
              disabled={true}
            />
          </FormControl>
        </Container>
      </Box>
      {/* </div> */}
    </Fragment>
  );
};

InfoContact.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(InfoContact));
