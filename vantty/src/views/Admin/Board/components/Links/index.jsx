import React, { Fragment } from "react";
// import { LinkMui } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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
          <Grid item md={6}>
            <Typography>Form</Typography>
            <Typography>
              <LinkMui
                component={Link}
                to={"/edit-profile"}
                className={classes.link}
              >
                /edit-profile
              </LinkMui>
            </Typography>
            <Typography>
              <LinkMui
                component={Link}
                to={"/add-portfolio"}
                className={classes.link}
              >
                /add-portfolio
              </LinkMui>
            </Typography>
            <Typography>
              <LinkMui
                component={Link}
                to={"/personal-info"}
                className={classes.link}
              >
                /personal-info
              </LinkMui>
            </Typography>
            <Typography>
              <LinkMui component={Link} to={"/price"} className={classes.link}>
                /price
              </LinkMui>
            </Typography>
            <Typography>
              <LinkMui component={Link} to={"/mobile"} className={classes.link}>
                /mobile
              </LinkMui>
            </Typography>
            <Typography>
              <LinkMui
                component={Link}
                to={"/categories"}
                className={classes.link}
              >
                /categories
              </LinkMui>
            </Typography>

            <Typography>
              <LinkMui
                component={Link}
                to={"/create-profile"}
                className={classes.link}
              >
                /create-profile
              </LinkMui>
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Typography>Site</Typography>
            <Typography>
              <LinkMui component={Link} to={"/home"} className={classes.link}>
                /home
              </LinkMui>
            </Typography>
            <Typography>
              <LinkMui
                component={Link}
                to={"/favorites"}
                className={classes.link}
              >
                /favorites
              </LinkMui>
            </Typography>
            <Typography>
              <LinkMui
                component={Link}
                to={"/artists"}
                className={classes.link}
              >
                /artists
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
