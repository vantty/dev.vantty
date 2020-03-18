import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
// @material-ui/icons

// core components
import GridContainer from "./components/GridContainer";
import GridItem from "./components/GridItem";
import { Button, Typography } from "@material-ui/core";
import Parallax from "./components/Parallax";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";
import CreateProfileSection from "./Sections/CreateProfileSection.js";
import BookingSection from "./Sections/BookingSection.js";
import FAQSection from "./Sections/FAQSection.js";
const JumbotronBackground =
  //with background
  "https://res.cloudinary.com/vantty/image/upload/v1583973869/seed/ouoswijho4fvbxzgql9c.png";
//Without
// "https://res.cloudinary.com/vantty/image/upload/v1583976620/seed/nuk2l4mrcmyz5br8mrte.jpg";
// "https://res.cloudinary.com/vantty/image/upload/v1583978169/seed/y9agox8oupnme4ohwftx.jpg";
const dashboardRoutes = [];

// const useStyles = makeStyles(styles);

const LandingPage = props => {
  const conatinerFluid = {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%"
  };
  const useStyles = makeStyles(theme => ({
    container: {
      zIndex: "12",
      color: "#FFFFFF",
      ...conatinerFluid,
      "@media (min-width: 576px)": {
        maxWidth: "540px"
      },
      "@media (min-width: 768px)": {
        maxWidth: "720px"
      },
      "@media (min-width: 992px)": {
        maxWidth: "960px"
      },
      "@media (min-width: 1200px)": {
        maxWidth: "1140px"
      }
    },
    title: {
      margin: "1.75rem 0 0.875rem",
      display: "inline-block",
      position: "relative",
      marginTop: "30px",
      minHeight: "32px",
      color: "#FFFFFF"
    },

    main: {
      background: "#FFFFFF",
      position: "relative",
      zIndex: "3"
    },
    mainRaised: {
      margin: "-60px 30px 0px",
      borderRadius: "6px",
      boxShadow:
        "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },
    button: {
      color: "white",
      width: "8rem",
      height: "2rem",
      boxShadow: "none",
      backgroundColor: theme.palette.greenVantty.main,
      "&:hover": {
        color: "white",
        backgroundColor: theme.palette.greenVantty.light
      }
    }
  }));

  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Parallax filter image={JumbotronBackground}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <Typography variant='h1' className={classes.title}>
                Your Story Starts With Us.
              </Typography>
              <Typography variant='h3' className={classes.title}>
                Find the best match for your services and grow up your personal
                brand
              </Typography>
              <br />
              <Button
                component={Link}
                variant='contained'
                color='primary'
                size='small'
                target='_blank'
                rel='noopener noreferrer'
                className={classes.button}
                to={"/create-profile"}
              >
                Get Started
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <CreateProfileSection />
          <BookingSection />
          <FAQSection />
          {/* <TeamSection /> */}
          <WorkSection />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;
