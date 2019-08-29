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
  jumbotron: {
    paddingLeft: 0,
    paddingRight: 0
  },
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: `url(${top})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)"
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
      paddingRight: 0,
      paddingLeft: 0
    }
  }
}));

const HomeJumbotron = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="xl" className={classes.jumbotron}>
      <Paper className={classes.mainFeaturedPost}>
        {<img style={{ display: "none" }} src={top} alt="background" />}
        <div className={classes.overlay} />
        <Grid container>
          <Container maxWidth="md">
            <Grid item md={8}>
              <div className={classes.mainFeaturedPostContent}>
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                >
                  Title of a longer featured blog post
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  Multiple lines of text that form the lede, informing new
                  readers quickly and efficiently about what&apos;s most
                  interesting in this post&apos;s contents.
                </Typography>
                <Link variant="subtitle1" href="#">
                  Continue reading…
                </Link>
              </div>
            </Grid>
          </Container>
        </Grid>
      </Paper>
    </Container>
  );
};

export default HomeJumbotron;
