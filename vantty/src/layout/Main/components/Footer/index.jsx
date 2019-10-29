import React, { Fragment } from "react";

// Material-UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { Divider } from "@material-ui/core";

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
  root: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(8)
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
    title: "Team",
    Link: "/"
  },
  {
    title: "Contact Us",
    Link: "/"
  },
  {
    title: "Terms of Use",
    Link: "/terms-of-service/"
  },
  {
    title: "Data Policy",
    Link: "/data-policy"
  }
];

export default function Footer() {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.root}>
        <Divider />
        <Container maxWidth="md" component="footer" className={classes.footer}>
          <Grid container direction="row" justify="center" alignItems="center">
            {footers.map(item => (
              <span className={classes.element} key={item.title}>
                <Link
                  href={item.Link}
                  variant="subtitle1"
                  color="textSecondary"
                >
                  {item.title}{" "}
                </Link>
              </span>
            ))}
          </Grid>
          <Box mt={3} mb={2}>
            <Copyright />
          </Box>
        </Container>
        <Divider />
      </div>
    </Fragment>
  );
}
