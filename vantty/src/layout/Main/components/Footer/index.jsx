import React, { Fragment } from "react";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://vantty.ca/">
        Vantty
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.white,
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(8)
    }
  },
  footer: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(4)
    }
  },
  element: {
    marginRight: "0.5rem"
  }
}));

const footers = [
  {
    title: "Contact us",
    Link: "/help"
  },
  {
    title: "Terms",
    Link: "/terms"
  },
  {
    title: "Data Policy",
    Link: "/policy"
  },
  {
    title: "FAQ",
    Link: "/faq"
  }
];

export default function Footer() {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.root}>
        <Divider />
        <Container maxWidth="md" component="footer" className={classes.footer}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            {footers.map(item => (
              <Grid item className={classes.element} key={item.title}>
                <Link
                  href={item.Link}
                  variant="subtitle1"
                  color="textSecondary"
                >
                  {item.title}{" "}
                </Link>
              </Grid>
            ))}
          </Grid>
          <Box mt={3} mb={2}>
            <Copyright />
          </Box>
        </Container>
        {/* <Divider /> */}
      </div>
    </Fragment>
  );
}
