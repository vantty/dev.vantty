import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

//Actions
import { createProfile } from "../../../../actions/profile";

// Externals
import PropTypes from "prop-types";

//Components
import { FormBottomNav } from "../../../../components";

// Material components
import {
  FormControl,
  FormHelperText,
  OutlinedInput,
  CardActions,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Button,
  TextField,
  Grid,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import LinkMui from "@material-ui/core/Link";

// Component styles
const useStyles = makeStyles(() => ({
  root: {},
  buttons: {
    textAlign: "right"
  }
}));

const states = [
  {
    value: "alabama",
    label: "Alabama"
  },
  {
    value: "new-york",
    label: "New York"
  },
  {
    value: "san-francisco",
    label: "San Francisco"
  }
];

const CreateProfile = ({
  createProfile,
  history,
  formData,
  handleChange,
  nextStep,
  step,
  className,
  ...rest
}) => {
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
    nextStep();
  };

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const classes = useStyles();

  return (
    <Fragment>
      <Card className={clsx(classes.root, className)}>
        {/* <form autoComplete='off' noValidate> */}
        <CardHeader subheader='The information can be edited' title='Profile' />
        <Divider />
        <CardContent>
          {/* <form autoComplete='off' noValidate> */}
          <Grid container>
            {/* <Grid
              container
              direction='column'
              justify='center'
              alignItems='center'
            > */}
            <Grid item md={12} xs={12}>
              <FormControl variant='outlined' margin='dense' fullWidth>
                <InputLabel ref={inputLabel} htmlFor='filled-age-simple'>
                  Profesion
                </InputLabel>
                <Select
                  select
                  value={formData.profession}
                  onChange={e => handleChange(e)}
                  id='profession'
                  name='profession'
                  label='profession'
                  input={
                    <OutlinedInput
                      labelWidth={labelWidth}
                      name='Profession'
                      id='outlined-age-simple'
                    />
                  }
                >
                  <MenuItem value={"Makeup Artists"}>Makeup Artists</MenuItem>
                  <MenuItem value={"Makeup Artist & Hair"}>
                    Makeup Artist & Hair
                  </MenuItem>
                  <MenuItem value={"Hair Stylist"}>Hair Stylist</MenuItem>
                </Select>
                <FormHelperText>
                  Obviously, we know you are an artist
                </FormHelperText>
              </FormControl>
            </Grid>
            <br /> <br />
            <Grid item md={12} xs={12}>
              <TextField
                helperText='Please specify the first name'
                margin='dense'
                id='bio'
                name='bio'
                label='bio'
                autoComplete='fname'
                required
                defaultValue={formData.bio}
                variant='outlined'
                multiline
                rows='4'
                fullWidth
                onChange={e => handleChange(e)}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              {/* <div className={classes.field}> */}
              <FormControl variant='outlined' margin='dense' fullWidth>
                <InputLabel htmlFor='filled-city-simple'>City</InputLabel>
                <Select
                  select
                  id='city'
                  name='city'
                  value={formData.city}
                  label='city'
                  onChange={e => handleChange(e)}
                  input={
                    <OutlinedInput
                      labelWidth={labelWidth}
                      name='City'
                      id='outlined-city-simple'
                    />
                  }
                >
                  <MenuItem value={"Toronto - Canadá"}>
                    Toronto - Canadá
                  </MenuItem>
                  <MenuItem value={"Medellín - Colombia"}>
                    Medellín - Colombia
                  </MenuItem>
                </Select>
              </FormControl>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  margin='dense'
                  required
                  variant='outlined'
                  id='instagramUsername'
                  name='instagramUsername'
                  label={`@Username`}
                  value={formData.instagramUsername}
                  onChange={e => handleChange(e)}
                />
                {/* </div> */}
              </Grid>
            </Grid>
            {/* </form> */}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions className={classes.buttons}>
          <div>
            <div>
              <LinkMui component={Link} to='/'>
                learn how to build the best profile
              </LinkMui>
            </div>
          </div>
        </CardActions>
        {/* </Grid> */}
        {/* </form> */}
      </Card>
      <FormBottomNav
        step={"1"}
        Children={
          <div>
            <div>
              <Button component={Link} to='/dashboard'>
                Back
              </Button>
              <Button
                style={{ backgroundColor: "#f5f5" }}
                onClick={e => onSubmit(e)}
              >
                Next
              </Button>
            </div>
          </div>
        }
      />
    </Fragment>
  );
};

CreateProfile.propTypes = {
  className: PropTypes.string
};

export default connect(
  null,
  { createProfile }
)(withRouter(CreateProfile));
