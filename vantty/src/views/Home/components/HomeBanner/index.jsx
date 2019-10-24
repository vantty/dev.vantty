import React from "react";
import { Link } from "react-router-dom";

// Material-UI
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  pageBlock: {
    backgroundColor: "#FEFEFE"
  },
  bannerImage: {
    position: "relative",
    width: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "0.6rem",
    backgroundColor: "rgba(0,0,0,.3)",
    paddingTop: "70%",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "90%"
    }
  },
  banner: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10)
  },
  quoteInner: {
    textAlign: "center",
    flexBasis: "600px",
    paddingBottom: theme.spacing(8)
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300,
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

const HomeBanner = ({ image, text }) => {
  const classes = useStyles();
  return (
    <div className={classes.pageBlock}>
      <Container maxWidth='md' className={classes.banner}>
        <div
          style={{
            backgroundImage: `url(${image})`
          }}
          className={classes.bannerImage}
        >
          <div className={classes.quoteInner}>
            <Typography className={classes.quoteText} variant='h1'>
              {text}
            </Typography>
            <Button
              component={Link}
              to='/register'
              color='primary'
              variant='contained'
              className={classes.button}
            >
              JOIN NOW
            </Button>
          </div>
        </div>
      </Container>
      <Divider />
    </div>
  );
};

export default HomeBanner;
