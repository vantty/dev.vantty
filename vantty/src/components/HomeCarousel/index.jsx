import React from "react";

// Assets
import v1 from "../../assets/images/v1.jpg";

// Material-UI
import Container from "@material-ui/core/Container";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  blockTitle: {
    paddingBottom: "3px",
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
    paddingTop: "95%",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "130%"
    }
  },
  carousel: {
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4)
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
    <div>
      <Container maxWidth="md" className={classes.carousel}>
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
            <Typography className={classes.seeAll}>{artist}</Typography>
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
      </Container>
      <Divider />
    </div>
  );
};

export default HomeCarousel;
