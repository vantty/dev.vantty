import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Material-UI
import { Container, Grid, Typography, Link, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowRight from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles(theme => ({
  blockTitle: {
    paddingBottom: theme.spacing(2)
  },
  pageBlock: {
    backgroundColor: "#F9F9F9"
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
  image: {
    position: "relative",
    width: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "0.6rem",
    backgroundColor: "rgba(0,0,0,.3)",
    borderColor: "white",
    borderStyle: "solid",
    paddingTop: "60%",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "130%"
    }
  },
  carousel: {
    paddingBottom: theme.spacing(6),
    paddingTop: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
    }
  }
}));

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    paritialVisibilityGutter: 0
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    paritialVisibilityGutter: 20
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 20
  }
};

const HomeCarousel = ({ title, artist, images }) => {
  const classes = useStyles();
  return (
    <div className={classes.pageBlock}>
      <Container maxWidth="md" className={classes.carousel}>
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.blockTitle}
        >
          <Grid item>
            <Typography variant="h2">{artist}</Typography>
          </Grid>
        </Grid>
        <Carousel
          responsive={responsive}
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          partialVisbile="right"
          renderDotsOutside={false}
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {images.map((image, index) => (
            <div
              style={{ backgroundImage: `url(${image})` }}
              className={classes.image}
              key={index}
            />
          ))}
        </Carousel>
        <Link
          component={RouterLink}
          to="/search"
          variant="h6"
          className={classes.link}
        >
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            className={classes.seeAllTitle}
          >
            <Grid item>
              <Typography className={classes.seeAll} variant="h5">
                {"See her amazing work!"}
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

export default HomeCarousel;
