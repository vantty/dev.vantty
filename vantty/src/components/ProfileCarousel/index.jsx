import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { Container, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  image: {
    float: "left",
    position: "relative",
    width: "98%",
    paddingBottom: "100%",
    paddingRight: "1rem",
    paddingLeft: "1rem",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "10px"
  }
});

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const Porfolio = ({ profile: { portfolioPictures } }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Carousel
        swipeable={true}
        draggable={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="transform 100ms ease-in-out"
        transitionDuration={100}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        renderDotsOutside={false}
        partialVisbile={true}
        minimumTouchDrag={100}
        slidesToSlide={1}
      >
        {portfolioPictures.map(image => (
          <span
            key={image._id}
            style={{
              backgroundImage: `url(${image.original})`
            }}
            className={classes.image}
          />
        ))}
      </Carousel>
    </Fragment>
  );
};

// Porfolio.propTypes = {
//   portfolioPictures: PropTypes.object,
//   profile: PropTypes.object.isRequired
// };

export default Porfolio;
