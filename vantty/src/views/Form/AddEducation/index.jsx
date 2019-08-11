import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Actions
import { addEducation } from "../../../actions/profile";

//Materila-UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import LinkMui from "@material-ui/core/Link";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  buttonSelect: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 150
  }
}));

const AddEducation = ({ addEducation, history }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    description: ""
  });
  const { school, degree, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h4' align='center'>
            Form
          </Typography>
          <form
            className='form'
            onSubmit={e => {
              e.preventDefault();
              addEducation(formData, history);
            }}
          >
            <Fragment>
              <Fragment>
                <Typography variant='h5' gutterBottom>
                  The best professional takes time to learn
                </Typography>
              </Fragment>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor='demo-controlled-open-select'>
                      School
                    </InputLabel>
                    <Select
                      value={school}
                      onChange={e => onChange(e)}
                      id='school'
                      name='school'
                      label='school'
                    >
                      <MenuItem value={"Makeup Academy"}>
                        Makeup Academy
                      </MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id='degree'
                    name='degree'
                    label='degree'
                    fullWidth
                    value={degree}
                    autoComplete='fname'
                    onChange={e => onChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id='description'
                    name='description'
                    label='description'
                    multiline
                    rowsMax='6'
                    fullWidth
                    value={description}
                    onChange={e => onChange(e)}
                    className={classes.textField}
                    margin='normal'
                    helperText='You ability'
                    variant='outlined'
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Submit
              </Button>
              <Grid container justify='flex-end'>
                <Grid item>
                  <LinkMui variant='body2' component={Link} to='/dashboard'>
                    Go back
                  </LinkMui>
                </Grid>
              </Grid>
            </Fragment>
          </form>
        </Paper>
      </main>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { addEducation }
)(withRouter(AddEducation));
