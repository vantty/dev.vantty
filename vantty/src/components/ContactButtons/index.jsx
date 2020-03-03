import React from "react";
import { isIOS } from "react-device-detect";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button, Container, Link } from "@material-ui/core";

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

const ContactButtons = ({ customerType, number, message }) => {
  const classes = useStyles();

  const brand = isIOS ? "?" : "&";
  const buttons = [
    {
      type: "wapp",
      text: "Chat via Whatsapp",
      link: `https://api.whatsapp.com/send?phone=${number}&text=${message}`
    },
    {
      type: "sms",
      text: "Chat via SMS",
      link: `sms:${number}${brand}body=${message}`
    }
  ];

  return (
    <div className={classes.contact}>
      <Container maxWidth="lg">
        <Grid item xs={12}>
          <Typography>{`If you need to contact your ${customerType}:`}</Typography>
        </Grid>
      </Container>
      <Container className={classes.contactButtonsContainer}>
        <Grid container spacing={2}>
          {buttons.map(button => (
            <Grid item xs={12} key={button.type}>
              <Link
                href={button.link}
                target="_blank"
                rel="noopener"
                underline="none"
              >
                <Button
                  fullWidth
                  color="primary"
                  size="small"
                  variant="contained"
                  className={
                    button.type === "wapp"
                      ? classes.wappButton
                      : classes.smsButton
                  }
                >
                  {button.text}
                </Button>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default ContactButtons;
