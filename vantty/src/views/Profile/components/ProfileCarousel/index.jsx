import React, { Fragment, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { Link } from "@material-ui/core";
import MainPicture from "./components/MainPicture";
import { List } from "./components";
const useStyles = makeStyles({
  image: {
    float: "left",
    position: "relative",
    width: "100%",
    paddingBottom: "100%",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "0.1rem",
    borderColor: "white",
    borderStyle: "solid"
  },
  frame: {
    width: "100%"
  }
});

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
    paritialVisibilityGutter: 0
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
    paritialVisibilityGutter: 20
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
    paritialVisibilityGutter: 20
  }
};

const Porfolio = ({ images }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    picture: images[0].original,
    tag: images[0].tag
  });

  const { picture } = state;
  return (
    <Fragment>
      <Fragment>
        <MainPicture picture={picture} />
        {/* <List images={images} /> */}

        <Carousel
          responsive={responsive}
          // additionalTransfrom={0}
          arrows
          // autoPlaySpeed={3000}
          // centerMode={false}
          containerClass='container'
          // dotListClass=''
          draggable
          // focusOnSelect={false}
          infinite
          itemClass=''
          keyBoardControl
          minimumTouchDrag={2}
          partialVisbile='right'
          renderDotsOutside={false}
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {images.map(image => (
            <Link
              component='button'
              onClick={() => {
                setState({ picture: image.original, tag: image.tag });
              }}
              // onChange={() => {
              //   setState({ picture: image.original, tag: image.tag });
              // }}
              className={classes.frame}
              key={image._id}
            >
              <span
                key={image._id}
                style={{
                  backgroundImage: `url(${image.original})`
                }}
                className={classes.image}
              />
            </Link>
          ))}
        </Carousel>
      </Fragment>
    </Fragment>
  );
};

export default Porfolio;
