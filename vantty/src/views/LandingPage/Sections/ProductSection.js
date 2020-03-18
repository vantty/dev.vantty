import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "../components/GridContainer";
import GridItem from "../components/GridItem";
import InfoArea from "../components/InfoArea";
import { Typography } from "@material-ui/core";

export default function ProductSection() {
  const title = {
    color: "#3C4858",
    margin: "1.75rem 0 0.875rem",
    textDecoration: "none",
    fontWeight: "700",
    fontFamily: `"Roboto Slab", "Times New Roman", serif`
  };
  const useStyles = makeStyles(theme => ({
    section: {
      padding: "70px 0",
      textAlign: "center"
    },
    title: {
      ...title,
      marginBottom: "1rem",
      marginTop: "30px",
      minHeight: "32px",
      textDecoration: "none"
    },
    description: {
      color: "#999",
      marginBottom: theme.spacing(2)
    }
  }));
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify='center'>
        <GridItem xs={12} sm={12} md={8}>
          <Typography variant='h2' className={classes.title}>
            What Vantty is?
          </Typography>
          {/* <h5 className={classes.description}> */}
          <Typography variant='h5' className={classes.description}>
            This is the paragraph where you can write more details about your
            product. Keep you user engaged by providing meaningful information.
            Remember that by this time, the user is curious, otherwise he wouldn
            {"'"}t scroll to get here. Add a button if you want the user to see
            more.
          </Typography>
          {/* </h5> */}
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title='Online Booking'
              description='Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.'
              icon={Chat}
              iconColor='info'
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title='Get Reviews'
              description='Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.'
              icon={VerifiedUser}
              iconColor='success'
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title='We make ads for you '
              description='Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.'
              icon={Fingerprint}
              iconColor='danger'
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title='Secure and Fast payments'
              description='Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.'
              icon={Chat}
              iconColor='info'
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title='Commision'
              description='Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.'
              icon={VerifiedUser}
              iconColor='success'
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title='Chat Directly with your user'
              description='Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.'
              icon={Fingerprint}
              iconColor='danger'
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
