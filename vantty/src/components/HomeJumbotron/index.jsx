import React from "react";

// Assets
import top from "../../assets/images/top.jpg";

// Material-UI
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%"
  },
  grid: {
    height: "100%"
  },
  quoteContainer: {},
  quote: {
    backgroundColor: theme.palette.neutral,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${top})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  quoteInner: {
    textAlign: "center",
    flexBasis: "600px"
  },
  quoteText: {
    color: theme.palette.black,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.black
  },
  bio: {
    color: theme.palette.black
  }
}));

const HomeJumbotron = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item sm={12}>
          <div className={classes.quote}>
            <Container>
              <Grid container>
                <Grid item xs={6}>
                  <div className={classes.quoteInner}>
                    <Typography className={classes.quoteText} variant="h1">
                      Get your dreamed look, done by the perfect artists
                    </Typography>
                    <div className={classes.person}>
                      <Typography className={classes.name} variant="body1">
                        Takamaru Ayako
                      </Typography>
                      <Typography className={classes.bio} variant="body2">
                        Manager at inVision
                      </Typography>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomeJumbotron;
