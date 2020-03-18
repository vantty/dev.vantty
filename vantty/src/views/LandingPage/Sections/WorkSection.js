import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "../components/GridContainer.js";
import GridItem from "../components/GridItem.js";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
export default function WorkSection() {
  const useStyles = makeStyles(theme => ({
    section: {
      marginBottom: theme.spacing(5),
      paddingTop: theme.spacing(5),
      background: theme.palette.vanttyPink.light,
      borderRadius: "8px"
    },

    description: {
      color: "#999",
      textAlign: "center"
    },
    textCenter: {
      textAlign: "center",
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(5)
    },
    button: {
      color: "white",
      boxShadow: "none",
      backgroundColor: theme.palette.greenVantty.main,
      "&:hover": {
        color: "white",
        backgroundColor: theme.palette.greenVantty.light
      }
    }
  }));
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify='center'>
        <GridItem cs={12} sm={12} md={8}>
          <Typography variant='h1' className={classes.description}>
            Divide details about your product or agency work into parts. Write a
          </Typography>
          <GridContainer justify='center'>
            <GridItem xs={12} sm={12} md={12} className={classes.textCenter}>
              <Button
                component={Link}
                variant='contained'
                color='primary'
                size='large'
                target='_blank'
                rel='noopener noreferrer'
                to={"/register"}
                className={classes.button}
              >
                Get Started
              </Button>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}
