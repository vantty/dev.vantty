import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "../components/GridContainer.js";
import GridItem from "../components/GridItem.js";
import CustomInput from "../components/CustomInput.js";
import { Button } from "@material-ui/core";
// import Button from "./components/CustomButtons/Button.js";

export default function WorkSection() {
  const title = {
    color: "#3C4858",
    margin: "1.75rem 0 0.875rem",
    textDecoration: "none",
    fontWeight: "700",
    fontFamily: `"Roboto Slab", "Times New Roman", serif`
  };
  const useStyles = makeStyles(theme => ({
    section: {
      padding: "70px 0"
    },
    title: {
      ...title,
      marginBottom: "50px",
      marginTop: "30px",
      minHeight: "32px",
      textDecoration: "none",
      textAlign: "center"
    },
    description: {
      color: "#999",
      textAlign: "center"
    },
    textCenter: {
      textAlign: "center"
    },
    textArea: {
      marginRight: "15px",
      marginLeft: "15px"
    }
  }));
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify='center'>
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Work with us</h2>
          <h4 className={classes.description}>
            Divide details about your product or agency work into parts. Write a
            few lines about each one and contact us about any further
            collaboration. We will responde get back to you in a couple of
            hours.
          </h4>
          <form>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText='Your Name'
                  id='name'
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText='Your Email'
                  id='email'
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <CustomInput
                labelText='Your Message'
                id='message'
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea
                }}
                inputProps={{
                  multiline: true,
                  rows: 5
                }}
              />
              <GridContainer justify='center'>
                <GridItem xs={12} sm={12} md={4} className={classes.textCenter}>
                  <Button color='primary'>Send Message</Button>
                </GridItem>
              </GridContainer>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
