import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button, Container } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  contact: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  contactButtonsContainer: {
    maxWidth: "315px",
    marginTop: theme.spacing(2)
  },
  wappButton: {
    textTransform: "none",
    backgroundColor: "rgb(72, 230, 117)",
    "&:hover": {
      backgroundColor: "rgb(52, 210, 97)"
    }
  },
  smsButton: {
    textTransform: "none",
    backgroundColor: "rgb(60, 190, 165)",
    "&:hover": {
      backgroundColor: "rgb(40, 170, 145)"
    }
  }
}));

const ContactButtons = ({ type }) => {
  const classes = useStyles();
  return (
    <div className={classes.contact}>
      <Container maxWidth="lg">
        <Grid item xs={12}>
          <Typography>{`If you need to contact your ${type}:`}</Typography>
        </Grid>
      </Container>
      <Container className={classes.contactButtonsContainer}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              fullWidth
              color="primary"
              size="small"
              variant="contained"
              className={classes.wappButton}
            >
              Chat via Whatsapp
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              color="primary"
              size="small"
              variant="contained"
              className={classes.smsButton}
            >
              Chat via SMS
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ContactButtons;
