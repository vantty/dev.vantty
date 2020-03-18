import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// core components
import GridContainer from "../components/GridContainer.js";
import GridItem from "../components/GridItem.js";
import CustomInput from "../components/CustomInput.js";
import {
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails
} from "@material-ui/core";
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
    },
    root: {
      width: "100%"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
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

          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <div className={classes.root}>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                  >
                    <Typography className={classes.heading}>
                      Expansion Panel 1
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel2a-content'
                    id='panel2a-header'
                  >
                    <Typography className={classes.heading}>
                      Expansion Panel 2
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}
