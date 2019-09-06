import React, { Fragment } from "react";
// Material helpers
import { Container } from "@material-ui/core";
import { spacing } from "@material-ui/system";

// Material components
import { Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ReviewForm from "../ReviewForm";

const useStyles = makeStyles(theme => ({
  root: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    padding: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(13),
      marginBottom: theme.spacing(12),
      padding: theme.spacing(1)
    }
  }
}));

const Review = ({ children }) => {
  const classes = useStyles();
  return (
    <div>
      <Fragment>
        <Box pt={11} pb={11}>
          <div className={classes.root}>
            <Grid container spacing={4}>
              <Grid item lg={12} md={12} xl={12} xs={12}>
                <Container maxWidth='md'>
                  <Fragment>
                    <Fragment>{children}</Fragment>
                  </Fragment>
                </Container>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Fragment>
    </div>
  );
};

export default Review;
