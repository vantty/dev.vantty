import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing(3)
  }
}));

export default function CheckboxesGroup({ services, onChange }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Services</FormLabel>
        <FormGroup>
          {services.map(service => (
            <Fragment key={service._id}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={onChange(service.amount)}
                        // onChange={handleChange}
                        value={service.typeOfService}
                        name={service._id}
                      />
                    }
                    label={service.typeOfService}
                  />
                </Grid>
                <Grid item>{service.amount}</Grid>
              </Grid>
            </Fragment>
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
}
