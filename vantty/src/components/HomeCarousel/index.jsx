import React from "react";

// Assets
import v1 from "../../assets/images/v1.jpg";

// Material-UI
import Container from "@material-ui/core/Container";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  image: {
    backgroundImage: `url(${v1})`,
    position: "relative",
    width: "100%",
    paddingTop: "80%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "0.6rem",
    backgroundColor: "rgba(0,0,0,.3)",
    borderColor: "white",
    borderStyle: "solid"
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

const HomeCarousel = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.carousel}>
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
        <div className={classes.image}>
          {<img style={{ display: "none" }} src={v1} alt="background" />}
        </div>
        <div className={classes.image}>
          {<img style={{ display: "none" }} src={v1} alt="background" />}
        </div>
        <div className={classes.image}>
          {<img style={{ display: "none" }} src={v1} alt="background" />}
        </div>
        <div className={classes.image}>
          {<img style={{ display: "none" }} src={v1} alt="background" />}
        </div>
        <div className={classes.image}>
          {<img style={{ display: "none" }} src={v1} alt="background" />}
        </div>
      </Carousel>
    </Container>
  );
};

export default HomeCarousel;
