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
  Link,
  CardActionArea
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowRight from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles(theme => ({
  blockTitle: {
    paddingBottom: theme.spacing(2),
    paddingRight: "10px"
  },
  title: {
    display: "inline-block"
  },
  seeAllTitle: {
    marginTop: theme.spacing(2)
  },
  seeAll: {
    color: theme.palette.greenVantty.dark,
    display: "inline-block"
  },
  arrow: {
    paddingTop: "5px",
    fontSize: "16px",
    color: theme.palette.greenVantty.dark,
    display: "inline-block"
  },
  pageBlock: {
    backgroundColor: "#FFF"
  },
  cardGrid: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
    }
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
  }
}));

const HomeGrid = ({ title, subtitle, images }) => {
  const classes = useStyles();
  return (
    <div className={classes.pageBlock}>
      <Container className={classes.cardGrid} maxWidth="md">
        <Typography variant="h2">{title}</Typography>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.blockTitle}
        >
          <Grid item>
            <Typography className={classes.title} variant="h4">
              {subtitle}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {images.map((image, index) => (
            <Grid item key={index} xs={6} md={4}>
              <Card className={classes.card}>
                <CardActionArea>
                  <a href={`http://localhost:3000/profile/artist/${image.id}`}>
                    <CardMedia
                      key={image.photo}
                      className={classes.cardMedia}
                      image={`${image.photo}`}
                    />
                  </a>
                </CardActionArea>
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
        <Link
          component={RouterLink}
          to="/search"
          variant="h6"
          className={classes.link}
        >
          <Grid
            container
            direction="row"
            justify="initial"
            alignItems="center"
            className={classes.seeAllTitle}
          >
            <Grid item>
              <Typography className={classes.seeAll} variant="h5">
                See All
              </Typography>
            </Grid>
            <Grid item>
              <ArrowRight className={classes.arrow} />
            </Grid>
          </Grid>
        </Link>
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
