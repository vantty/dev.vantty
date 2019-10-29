import React from "react";
import { Link } from "react-router-dom";

// Material-UI
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  pageBlock: {
    backgroundColor: "#F9F9F9"
  },
  bannerImage: {
    position: "relative",
    width: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "0.6rem",
    backgroundColor: "rgba(0,0,0,.3)",
    paddingTop: "40%",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "60%"
    }
  },
  banner: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
    }
  },
  quoteInner: {
    textAlign: "left",
    flexBasis: "600px",
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  },
  quoteText: {
    color: theme.palette.white,
    textShadow: "0 0 1.5px #000",
    paddingBottom: theme.spacing(1)
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  button: {
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      backgroundColor: theme.palette.greenVantty.dark
    }
  }
}));

const HomeBanner = ({ image, text, buttonText }) => {
  const classes = useStyles();
  return (
    <div className={classes.pageBlock}>
      <Container maxWidth="md" className={classes.banner}>
        <div
          style={{
            backgroundImage: `url(${image})`
          }}
          className={classes.bannerImage}
        >
          <div className={classes.quoteInner}>
            <Grid container>
              <Grid item xs={12} sm={8}>
                <Typography className={classes.quoteText} variant="h1">
                  {text}
                </Typography>
                <Button
                  component={Link}
                  to="/register"
                  color="primary"
                  variant="contained"
                  className={classes.button}
                >
                  {buttonText}
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
      <Divider />
    </div>
  );
};

export default HomeBanner;
