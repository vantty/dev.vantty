import React, { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
// import CardAction from "@material-ui/core/CardAction";
import { CardAction } from "../../../../components";

const useStyles = makeStyles({
  image: {
    float: "left",
    position: "relative",
    width: "100%",
    paddingBottom: "100%",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "0.6rem",
    borderColor: "white",
    borderStyle: "solid"
  }
});

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
    paritialVisibilityGutter: 0
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
    paritialVisibilityGutter: 20
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
    paritialVisibilityGutter: 20
  }
};

const Porfolio = ({ profile: { portfolioPictures } }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Fragment>
        <Carousel
          responsive={responsive}
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          containerClass='container'
          dotListClass=''
          draggable
          focusOnSelect={false}
          infinite
          itemClass=''
          keyBoardControl
          minimumTouchDrag={80}
          partialVisbile='right'
          renderDotsOutside={false}
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {portfolioPictures.map(image => (
            <CardAction key={image._id}>
              <span
                key={image._id}
                style={{
                  backgroundImage: `url(${image.original})`
                }}
                className={classes.image}
              />
            </CardAction>
          ))}
        </Carousel>
      </Fragment>
    </Fragment>
  );
};

// Porfolio.propTypes = {
//   portfolioPictures: PropTypes.object,
//   profile: PropTypes.object.isRequired
// };

export default Porfolio;
