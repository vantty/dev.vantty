import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// core components
import GridContainer from "../components/GridContainer.js";
import GridItem from "../components/GridItem.js";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails
} from "@material-ui/core";
import { faq } from "../FAQList.js";

export default function WorkSection() {
  const title = {
    color: "#3C4858",

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
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
      minHeight: "32px",
      textDecoration: "none",
      textAlign: "center"
    },
    description: {
      color: "#999",
      textAlign: "center",
      marginBottom: "2rem"
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
          <Typography variant='h4' className={classes.description}>
            Divide details about your product or agency work into parts. Write a
            few lines about each one and contact us about any further
            collaboration. We will responde get back to you in a couple of
            hours.
          </Typography>

          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <div className={classes.root}>
                {faq.map(qst => (
                  <div key={qst.title}>
                    <ExpansionPanel>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                      >
                        <Typography className={classes.heading}>
                          {qst.question}
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>{qst.answer}</Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
                ))}
              </div>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}
