import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

// Assets
import v2 from "../../../../assets/images/v2.jpg";

// Material-UI
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Container,
  Avatar,
  Typography,
  Toolbar,
  Divider,
  Link
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
    backgroundColor: "#FFF"
  },
  cardGrid: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "0.6rem",
    backgroundColor: "#FFF",
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
    minHeight: 0 + "!important",
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
  },
  link: {
    color: theme.palette.purpleVantty.main
  }
}));

const HomeGrid = ({ title, images }) => {
  const classes = useStyles();
  return (
    <div className={classes.pageBlock}>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.blockTitle}
        >
          <Grid item>
            <Typography className={classes.title}>{title}</Typography>
          </Grid>
          <Grid item>
            <Link
              component={RouterLink}
              to="/search"
              variant="h6"
              className={classes.link}
            >
              <Typography className={classes.seeAll}>See All</Typography>
            </Link>
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
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Toolbar className={classes.cardTitle}>
                    <Avatar alt="" src={v2} className={classes.avatar} />
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
