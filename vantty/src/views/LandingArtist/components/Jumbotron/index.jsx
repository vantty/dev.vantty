import React, { useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
// Actions
import { searchValue } from "../../../../actions/search";

// Material-UI
import {
  Grid,
  Typography,
  Button,
  Container,
  CssBaseline
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
const JumbotronBackground =
  //with background
  // "https://res.cloudinary.com/vantty/image/upload/v1583973869/seed/ouoswijho4fvbxzgql9c.png";
  //Without
  "https://res.cloudinary.com/vantty/image/upload/v1583976620/seed/nuk2l4mrcmyz5br8mrte.jpg";
// "https://res.cloudinary.com/vantty/image/upload/v1583978169/seed/y9agox8oupnme4ohwftx.jpg";
const Logo =
  "https://res.cloudinary.com/vantty/image/upload/q_auto:low/v1572304171/seed/pms9bvmck4uygtqs0ljz.png";

const useStyles = makeStyles(theme => ({
  root: {},
  grid: {
    height: "30rem"
  },
  logo: {
    position: "absolute",
    width: "5rem",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2)
  },
  quoteContainer: {},
  quote: {
    height: "100%",
    zIndex: "10",
    backgroundColor: theme.palette.neutral,
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
    backgroundImage: `url(${JumbotronBackground})`,
    // backgroundSize: "cover",
    // backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  image: {
    height: "25rem"
    // width: "200px" /* width of container */,
    // height: "200px" /* height of container */,
    // objectFit: "cover",
    // border: "5px solid black"
  },
  quoteInner: {
    marginLeft: theme.spacing(2),
    textAlign: "center",
    flexBasis: "600px"
  },
  quoteText: {
    textAlign: "center",
    marginBottom: "1rem",
    color: theme.palette.purpleVantty.main,
    marginTop: "5rem"
  },
  textField: {
    height: "40px",
    backgroundColor: "white",
    borderRadius: "4px",
    borderColor: "white",
    "&:hover": {
      borderColor: "white"
    },
    "& label.Mui-focused": {
      color: "white"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white"
      },
      "&:hover fieldset": {
        borderColor: "white"
      },
      "&.Mui-focused fieldset": {
        borderColor: "white"
      }
    },
    "& .MuiOutlinedInput-adornedStart": {
      height: "40px"
    },
    "& .MuiOutlinedInput-input": {
      padding: 0
    }
  },
  button: {
    backgroundColor: theme.palette.greenVantty.main,
    "&:hover": {
      backgroundColor: theme.palette.greenVantty.dark
    },
    textAlign: "center"
  }
}));

const HomeJumbotron = ({ searchValue, goSearch }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Grid
          container
          direction='row'
          justify='space-between'
          alignItems='center'
        >
          <Grid item xs={12} sm={6} lg={6}>
            {" "}
            <Typography className={classes.quoteText} variant='h1'>
              Get your dreamed look, done by the perfect artists
            </Typography>
            <Button
              component={Link}
              to='/register'
              color='primary'
              variant='contained'
              className={classes.button}
            >
              Get Started
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            {isMobile && <img src={Logo} alt='' className={classes.logo} />}
            {/* <div className={classes.quote}>edqweqdwqweqe</div> */}
            <img src={JumbotronBackground} className={classes.image} />
          </Grid>
        </Grid>
      </div>
      {/* <div className={classes.root}>
        <Grid container>
          <Grid className={classes.grid} item sm={12}>
            {isMobile && <img src={Logo} alt='' className={classes.logo} />}
            <div className={classes.quote}>
              <Container maxWidth='xl'>
                <Grid container>
                  <Grid item xs={12} sm={6} lg={4}>
                    <div className={classes.quoteInner}>
                      <Typography className={classes.quoteText} variant='h1'>
                        Get your dreamed look, done by the perfect artists
                      </Typography>

                      <Grid container>
                        <Grid item></Grid>
                        <Grid item>
                          <Button
                            component={Link}
                            to='/register'
                            color='primary'
                            variant='contained'
                            className={classes.button}
                          >
                            Get Started
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </Container>
            </div>
          </Grid>
        </Grid>
      </div> */}
    </Fragment>
  );
};

HomeJumbotron.propTypes = {
  searchValue: PropTypes.func,
  goSearch: PropTypes.bool
};

const mapStateToProps = state => ({
  goSearch: state.search.goSearch
});

export default connect(mapStateToProps, { searchValue })(HomeJumbotron);
