import React, { Fragment, useState, useEffect } from "react";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

// Components
import Markdown from "./Markdown";

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3)
  },
  markdown: {
    padding: theme.spacing(3, 0)
  }
}));

export default function MarkdownText({ text, title }) {
  const classes = useStyles();

  const [post, setPost] = useState("");

  useEffect(() => {
    fetch(text)
      .then(res => res.text())
      .then(response => setPost(response))
      .catch(err => console.log(err));
  });

  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Grid container className={classes.mainGrid}>
          <Grid item>
            <Typography variant='h1' gutterBottom>
              {title}
            </Typography>
            <Divider />
            <Markdown className={classes.markdown} key={post.substring(0, 40)}>
              {post}
            </Markdown>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
