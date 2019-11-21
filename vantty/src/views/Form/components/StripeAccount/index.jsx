import React from "react";

// Material-UI
import { CssBaseline, Typography, Container, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Assets
const StripeButton =
  "https://res.cloudinary.com/vantty/image/upload/v1574347454/seed/geofw7htk4kuglyonrh9.png";

const stripeApi =
  "https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=ca_G8ZSxRaqpSpBlLsbbS5TTevLIRDo3cFF&scope=read_write#/";

const useStyles = makeStyles(theme => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(2)
  },
  text: {
    marginBottom: theme.spacing(2)
  },
  button: {
    marginBottom: theme.spacing(10),
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      backgroundColor: theme.palette.greenVantty.dark
    }
  },
  logo: {
    width: "16rem"
  }
}));

const StripeAccount = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h2" className={classes.title}>
          Conect your bank account
        </Typography>
        <Typography variant="subtitle1" className={classes.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
        <Link underline="none" color="inherit" href={stripeApi}>
          <img src={StripeButton} alt="" className={classes.logo} />
        </Link>
      </div>
    </Container>
  );
};

export default StripeAccount;
