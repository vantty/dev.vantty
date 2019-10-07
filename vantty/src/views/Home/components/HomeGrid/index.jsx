import React from "react";

// Assets

import v2 from "../../../../assets/images/v2.jpg";

// Material-UI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  blockTitle: {
    paddingBottom: "6px",
    paddingLeft: "10px",
    paddingRight: "10px"
  },
  title: {
    fontSize: "22px",
    display: "inline-block"
  },
  seeAll: {
    fontSize: "22px",
    display: "inline-block"
  },
  pageBlock: {
    backgroundColor: "#FAFAFA"
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "0.6rem",
    backgroundColor: "#FAFAFA",
    boxShadow: "none"
  },
  cardMedia: {
    paddingTop: "100%",
    borderRadius: "0.5rem"
  },
  cardContent: {
    flexGrow: 1,
    padding: 0,
    paddingBottom: 0 + "!important"
  },
  cardTitle: {
    padding: 0,
    paddingLeft: "0.6rem",
    minHeight: "0px" + "!important",
    marginTop: "0.5rem"
  },
  avatar: {
    display: "inline-block",
    width: 30,
    height: 30
  },
  name: {
    display: "inline-block",
    margin: 0,
    paddingLeft: "0.5rem",
    fontSize: "12px"
  }
}));

const HomeGrid = ({ title, images }) => {
  const classes = useStyles();
  return (
    <div className={classes.pageBlock}>
      <Container className={classes.cardGrid} maxWidth='md'>
        <Grid
          container
          direction='row'
          justify='space-between'
          alignItems='center'
          className={classes.blockTitle}
        >
          <Grid item>
            <Typography className={classes.title}>{title}</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.seeAll}>See All</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {images.map((image, index) => (
            <Grid item key={index} xs={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  key={image.photo}
                  className={classes.cardMedia}
                  image={`${image.photo}`}
                  title='Image title'
                />
                <CardContent className={classes.cardContent}>
                  <Toolbar className={classes.cardTitle}>
                    <Avatar alt='' src={v2} className={classes.avatar} />
                    <Typography
                      key={index}
                      gutterBottom
                      className={classes.name}
                    >
                      {"by "}
                      {image.name}
                    </Typography>
                  </Toolbar>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Divider />
    </div>
  );
};
HomeGrid.propTypes = {
  title: PropTypes.string,
  images: PropTypes.array
};

export default HomeGrid;
