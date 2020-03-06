import React, { Fragment } from "react";
// import { LinkMui } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Title } from "../index";
import { Link } from "react-router-dom";
import { Typography, Grid } from "@material-ui/core";
import LinkMui from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  input: {
    display: "none"
  }
}));
export default function Links({ id }) {
  const classes = useStyles();
  return (
    <Fragment>
      <Title>Links</Title>
      <Fragment>
        <Grid
          container
          direction='column'
          justify='space-between'
          alignItems='flex-start'
        >
          <Grid item>
            <Typography>Site</Typography>
            <Typography>
              <LinkMui component={Link} to={"/"} className={classes.link}>
                /
              </LinkMui>
            </Typography>
            <Typography>
              <LinkMui component={Link} to={"/search"} className={classes.link}>
                /search
              </LinkMui>
            </Typography>
            <Typography>
              <LinkMui
                component={Link}
                to={"/settings"}
                className={classes.link}
              >
                /settings
              </LinkMui>
            </Typography>
            <Typography>
              <LinkMui
                component={Link}
                to={`profile/artist/${id}`}
                className={classes.link}
              >
                /profile
              </LinkMui>
            </Typography>
          </Grid>
        </Grid>
      </Fragment>
    </Fragment>
  );
}
