import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { isMobile } from "react-device-detect";

// Externals
import PropTypes from "prop-types";

// Material components

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  Typography,
  Slider,
  Container
} from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import Progress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";

const PrettoSlider = withStyles(theme => ({
  root: {
    color: theme.palette.purpleVantty.light,
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
}))(Slider);

const useStyles = makeStyles(theme => ({
  root: {},
  button: {
    float: "right",
    color: "white",
    boxShadow: "none",
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.greenVantty.light
    }
  }
}));

const StartService = ({ price, handleChange }) => {
  return (
    <Fragment>
      <Fragment>
        <div>
          <div>
            <Container>
              <Typography color='textSecondary' variant='body1'>
                This is the minimum price for which you provide a service
              </Typography>
              <br />
              <br />
              <br />
              <Fragment>
                <Grid
                  container
                  direction='row'
                  justify='center'
                  alignItems='center'
                >
                  <Grid item xs={isMobile ? 12 : 11}>
                    <PrettoSlider
                      defaultValue={60}
                      valueLabelDisplay='on'
                      max={500}
                      step={10}
                      disabled={false}
                      value={price || 80}
                      name='price'
                      // onChange={e => onChange(e)}
                      onChange={handleChange}
                      // handleDragStop={price}
                    />
                    <br />
                    <br />
                    {/* <Typography
                      // className={classes.locationText}
                      // color='textSecondary'
                      variant='body1'
                    >
                      I provide a service minimum for{" "}
                      <strong>${price || 80}</strong>
                    </Typography> */}
                  </Grid>
                </Grid>
              </Fragment>
            </Container>
          </div>
        </div>
      </Fragment>
      <Divider />
    </Fragment>
  );
};

export default StartService;
