import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
import {
  HomeBanner,
  HomeCarousel,
  HomeGrid,
  HomeJumbotron
} from "./components";

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
      <div data-testid="home">
        <CssBaseline />
        <HomeJumbotron />
        <HomeGrid
          title={homeSeed.firstGrid.title}
          subtitle={homeSeed.firstGrid.subtitle}
          images={homeSeed.firstGrid.images}
        />
        <HomeCarousel
          title={homeSeed.carousel.title}
          artist={homeSeed.carousel.artist}
          images={homeSeed.carousel.images}
        />
        <HomeGrid
          title={homeSeed.secondGrid.title}
          subtitle={homeSeed.secondGrid.subtitle}
          images={homeSeed.secondGrid.images}
        />
        <HomeBanner
          image={homeSeed.firstBanner.image}
          text={homeSeed.firstBanner.text}
          buttonText={homeSeed.firstBanner.buttonText}
        />
        <HomeGrid
          title={homeSeed.thirdGrid.title}
          subtitle={homeSeed.thirdGrid.subtitle}
          images={homeSeed.thirdGrid.images}
        />
        <HomeBanner
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
