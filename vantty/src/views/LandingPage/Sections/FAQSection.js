import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
// @material-ui/icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// core components
import GridContainer from "../components/GridContainer.js";
import GridItem from "../components/GridItem.js";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Link
} from "@material-ui/core";
import { faq } from "../FAQList.js";

export default function WorkSection() {
  
  const useStyles = makeStyles(theme => ({
    section: {
      padding: "70px 0"
    },
    title: {
      color: "#3C4858",
      margin: "1.75rem 0 0.875rem",
      marginTop: "30px",
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
          <Typography variant="h2" className={classes.title}>
          FAQ
          </Typography>

          <Typography variant='h4' className={classes.description}>
            Here you can find a list of frequenlty asked questions about Vantty
            services. If you have another one, please contact us{" "}
            <Link component={RouterLink} to='/help' variant='h4'>
              here.
            </Link>
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
                          <strong>{qst.question}</strong>
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>{qst.answer}</Typography>
                        <Typography className={classes.heading}>
                          {qst.continue}
                        </Typography>
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
