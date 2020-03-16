import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
import { Banner, Carousel, Grid, Jumbotron, Description } from "./components";

// Actions
import { changeNavbarValue } from "../../actions/navbar";

// Material-UI
import CssBaseline from "@material-ui/core/CssBaseline";

// Seed
import { homeSeed } from "./../../assets/seed/homeSeed";

const Home = ({ changeNavbarValue }) => {
  useEffect(() => {
    changeNavbarValue("home");
  }, []);

  return (
    <Fragment>
      <div data-testid='home'>
        <CssBaseline />
        <Jumbotron />
        <Description />
        {/* <Grid
          title={homeSeed.firstGrid.title}
          subtitle={homeSeed.firstGrid.subtitle}
          images={homeSeed.firstGrid.images}
        />
        <Carousel
          title={homeSeed.carousel.title}
          artist={homeSeed.carousel.artist}
          images={homeSeed.carousel.images}
        /> */}
        <Grid
          title={homeSeed.secondGrid.title}
          subtitle={homeSeed.secondGrid.subtitle}
          images={homeSeed.secondGrid.images}
        />
        <Banner
          image={homeSeed.firstBanner.image}
          text={homeSeed.firstBanner.text}
          buttonText={homeSeed.firstBanner.buttonText}
        />
        <Grid
          title={homeSeed.thirdGrid.title}
          subtitle={homeSeed.thirdGrid.subtitle}
          images={homeSeed.thirdGrid.images}
        />
        <Banner
          image={homeSeed.secondBanner.image}
          text={homeSeed.secondBanner.text}
          buttonText={homeSeed.secondBanner.buttonText}
        />
      </div>
    </Fragment>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool,
  changeNavbarValue: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { changeNavbarValue })(Home);
