import React, { useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Actions
import { createProfile } from "../../../actions/profile";

//Components
import FormBottomNav from "../ComponentsForm/FormBottomNav";
import Alert from "../../../components/Alert";
import SimpleAppBar from "../ComponentsForm/SimpleAppBar";

//Materila-UI
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Container,
  Box,
  Paper,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

const CreateProfile = ({ createProfile, history }) => {
  const styles = useStyles();
  const [formData, setFormData] = useState({
    profilePicture: "",
    bio: "",
    profession: "",
    location: "",
    mobileNumber: "",
    instagramUsername: "",
    youtube: "",
    instagram: ""
  });

  const { bio, location, instagramUsername } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <CssBaseline />
      <SimpleAppBar
        message={"1: This is your first step"}
        progress={1}
        page={`/dashboard`}
      />

      <Box pt={11} pb={8}>
        <Container maxWidth='sm'>
          <Paper>
            <Typography component='h5' variant='h6' align='left'>
              Recuerda que tu perfil pasará por un proceso de revisión y se te
              notificará por correo electrónico cuando sea activado.
            </Typography>
            <form id='0' className='form' onSubmit={e => onSubmit(e)}>
              <Fragment>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <Typography component='h5' variant='h6' align='left'>
                      I am ...
                    </Typography>
                    <FormGroup row align='right'>
                      <FormControlLabel
                        control={
                          <Checkbox
                            id='profession'
                            name='profession'
                            label='profession'
                            value={"Makeup Artist"}
                            onChange={e => onChange(e)}
                          />
                        }
                        label='Makeup Artist'
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={e => onChange(e)}
                            id='profession'
                            name='profession'
                            label='profession'
                            value={"Hair Stylist"}
                          />
                        }
                        label='Hair Stylist'
                      />
                    </FormGroup>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      variant='outlined'
                      id='bio'
                      name='bio'
                      label='bio'
                      fullWidth
                      multiline
                      rows='4'
                      value={bio}
                      autoComplete='fname'
                      onChange={e => onChange(e)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant='outlined'
                      id='location'
                      name='location'
                      label='location'
                      fullWidth
                      value={location}
                      autoComplete='fname'
                      onChange={e => onChange(e)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant='outlined'
                      id='instagramUsername'
                      name='instagramUsername'
                      label='instagramUsername'
                      fullWidth
                      value={instagramUsername}
                      autoComplete='fname'
                      onChange={e => onChange(e)}
                    />
                  </Grid>
                </Grid>
                <FormBottomNav
                  step={1}
                  backPage={"/add-portfolio"}
                  nextPage={""}
                />
              </Fragment>
            </form>
          </Paper>
        </Container>
      </Box>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(
  null,
  { createProfile }
)(withRouter(CreateProfile));

// export default withStyles(formPages)(
//   connect(
//     null,
//     { createProfile, createProfileForm }
//   )(withRouter(CreateProfile))
// );
