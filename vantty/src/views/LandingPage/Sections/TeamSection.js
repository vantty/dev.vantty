import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "../components/GridContainer.js";
import GridItem from "../components/GridItem.js";
// import Button from "components/CustomButtons/Button.js";
import Card from "../components/Card/Card";
import CardBody from "../components/Card/CardBody.js";
import CardFooter from "../components/Card/CardFooter.js";

// import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
import { Button } from "@material-ui/core";

const team1 =
  "https://res.cloudinary.com/vantty/image/upload/v1583973869/seed/ouoswijho4fvbxzgql9c.png";
const team2 =
  "https://res.cloudinary.com/vantty/image/upload/v1583973869/seed/ouoswijho4fvbxzgql9c.png";
const team3 =
  "https://res.cloudinary.com/vantty/image/upload/v1583973869/seed/ouoswijho4fvbxzgql9c.png";

// const useStyles = makeStyles(styles);

export default function TeamSection() {
  const useStyles = makeStyles(theme => ({
    section: {
      padding: "70px 0",
      textAlign: "center"
    },
    title: {
      color: "#3C4858",
      margin: "1.75rem 0 0.875rem",
      textDecoration: "none",
      fontWeight: "700",
      fontFamily: `"Roboto Slab", "Times New Roman", serif`,
      marginBottom: "1rem",
      marginTop: "30px",
      minHeight: "32px"
    },

    itemGrid: {
      marginLeft: "auto",
      marginRight: "auto"
    },
    cardTitle: {
      color: "#3C4858",
      margin: "1.75rem 0 0.875rem",
      textDecoration: "none",
      fontWeight: "700",
      fontFamily: `"Roboto Slab", "Times New Roman", serif`,
      marginTop: ".625rem"
    },
    smallTitle: {
      color: "#6c757d"
    },
    description: {
      color: "#999"
    },
    justifyCenter: {
      justifyContent: "center !important"
    },
    socials: {
      marginTop: "0",
      width: "100%",
      transform: "none",
      left: "0",
      top: "0",
      height: "100%",
      lineHeight: "41px",
      fontSize: "20px",
      color: "#999"
    },
    margin5: {
      margin: "5px"
    },
    imgFluid: {
      maxWidth: "100%",
      height: "auto"
    },
    imgRounded: {
      borderRadius: "6px !important"
    },
    imgRoundedCircle: {
      borderRadius: "50% !important"
    },
    imgRaised: {
      boxShadow:
        "0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },
    imgGallery: {
      width: "100%",
      marginBottom: "2.142rem"
    },
    imgCardTop: {
      width: "100%",
      borderTopLeftRadius: "calc(.25rem - 1px)",
      borderTopRightRadius: "calc(.25rem - 1px)"
    },
    imgCardBottom: {
      width: "100%",
      borderBottomLeftRadius: "calc(.25rem - 1px)",
      borderBottomRightRadius: "calc(.25rem - 1px)"
    },
    imgCard: {
      width: "100%",
      borderRadius: "calc(.25rem - 1px)"
    },
    imgCardOverlay: {
      position: "absolute",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      padding: "1.25rem"
    }
  }));

  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Here is our team</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team1} alt='...' className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Gigi Hadid
                <br />
                <small className={classes.smallTitle}>Model</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  You can write here details about one of your team members. You
                  can give more details about what they do. Feel free to add
                  some <a href='#pablo'>links</a> for people to be able to
                  follow them outside the site.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color='transparent'
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color='transparent'
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-instagram"} />
                </Button>
                <Button
                  justIcon
                  color='transparent'
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-facebook"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team2} alt='...' className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Christian Louboutin
                <br />
                <small className={classes.smallTitle}>Designer</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  You can write here details about one of your team members. You
                  can give more details about what they do. Feel free to add
                  some <a href='#pablo'>links</a> for people to be able to
                  follow them outside the site.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color='transparent'
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color='transparent'
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-linkedin"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team3} alt='...' className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Kendall Jenner
                <br />
                <small className={classes.smallTitle}>Model</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  You can write here details about one of your team members. You
                  can give more details about what they do. Feel free to add
                  some <a href='#pablo'>links</a> for people to be able to
                  follow them outside the site.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color='transparent'
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color='transparent'
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-instagram"} />
                </Button>
                <Button
                  justIcon
                  color='transparent'
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-facebook"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
