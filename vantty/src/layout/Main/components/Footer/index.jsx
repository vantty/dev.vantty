import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { Fragment } from "react";
import { Divider } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {"Copyright © "}
      <Link color='inherit' href='https://vantty.com/'>
        Vantty
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    },
    ul: {
      margin: 0,
      padding: 0
    },
    li: {
      listStyle: "none"
    }
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: "wrap"
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200]
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2)
  },
  footer: {
    // borderTop: `1px solid ${theme.palette.divider}`,
    // marginTop: theme.spacing(2),
    paddingTop: theme.spacing(1),
    // paddingBottom: theme.spacing(2),
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
    title: "Company",
    description: ["Team", "Contact us"]
  },

  {
    title: "Artists",
    description: ["Artists", "Another resource"]
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
    link: []
  }
];

const newFooters = [
  "Team",
  "Contact us",
  "Artists",
  "Another resource",
  "Privacy policy",
  "Terms of use"
];
export default function HomeFooter() {
  const classes = useStyles();

  return (
    <Fragment>
      <Divider />
      <Container maxWidth='md' component='footer' className={classes.footer}>
        {/* <Grid container spacing={1} justify='space-evenly'>
        <Grid container direction='row' justify='center' alignItems='center'>
          {footers.map(footer => (
            <Grid item xs={4} sm={3} key={footer.title}>
              <Typography variant='h6' color='textPrimary' gutterBottom>
                {footer.title}
              </Typography>
              <ul>
              {footer.description.map(item => (
                <li key={item}>
                <Link href='#' variant='subtitle1' color='textSecondary'>
                  {item}{" "}
                </Link>
                </li>
              ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box> */}

        {/* <Grid container spacing={1} justify='space-evenly'> */}
        <Grid container direction='row' justify='center' alignItems='center'>
          {/* <Grid item xs={12} sm={12}> */}
          {newFooters.map(item => (
            // <Grid item xs={1} sm={2} key={item}>
            <span className={classes.element}>
              <Link href='#' variant='subtitle1' color='textSecondary'>
                {item}{" "}
              </Link>
            </span>
            // </Grid>
          ))}
          {/* </Grid> */}
        </Grid>
        <Box mt={3}>
          <Copyright />
        </Box>
      </Container>
    </Fragment>
  );
}
