import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Typography as MuiTypography,
  Container,
  Typography,
  Divider,
  Paper
} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import terms from "./text.1.md";

// import Markdown from "./Markdown";

import Markdown from "markdown-to-jsx";
// const readmePath = require("./terms.1.md");

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  markdown: {
    // ...theme.typography.body2,
    padding: theme.spacing(3, 0)
  }
}));

const texto = [terms];
const TermsOfService = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    state2: {
      post: null
    }
  });
  useEffect(() => {
    fetch(terms)
      .then(res => res.text())
      .then(post => this.setState(state => ({ ...state, post })))
      .catch(err => console.error(err));
  }, []);
  const { post } = state;
  return (
    <Container>
      <main>
        <Grid container spacing={5} className={classes.mainGrid}>
          {/* Main content */}
          <Grid item xs={12} md={8}>
            <Typography variant='h6' gutterBottom>
              From the Firehose
            </Typography>
            <Divider />
            {texto.map(tex => (
              <Markdown
                className={classes.markdown}
                key={tex.substring(0, 40)}
                component={tex}
              >
                {tex}
              </Markdown>
            ))}
            <ReactMarkdown source={post} />
            {/* <Markdown>#terms</Markdown> */}
          </Grid>
          {/* End main content */}
          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0} className={classes.sidebarAboutBox}>
              <Typography variant='h6' gutterBottom>
                About
              </Typography>
              <Typography>
                Etiam porta sem malesuada magna mollis euismod. Cras mattis
                consectetur purus sit amet fermentum. Aenean lacinia bibendum
                nulla sed consectetur.
              </Typography>
            </Paper>
            <Typography
              variant='h6'
              gutterBottom
              className={classes.sidebarSection}
            >
              Archives
            </Typography>
            {/* {archives.map(archive => (
              <Link display='block' variant='body1' href='#' key={archive}>
                {archive}
              </Link>
            ))} */}
            <Typography
              variant='h6'
              gutterBottom
              className={classes.sidebarSection}
            >
              Social
            </Typography>
            {/* {social.map(network => (
              <Link display='block' variant='body1' href='#' key={network}>
                {network}
              </Link>
            ))} */}
          </Grid>
          {/* End sidebar */}
        </Grid>
      </main>
    </Container>
  );
};

export default TermsOfService;
