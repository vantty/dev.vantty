import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";

// Components
import Navbar from "../../components/Navbar";
import BottomNavabar from "../../components/BottomNavbar";
import HomeJumbotron from "../../components/HomeJumbotron";
import HomeGrid from "../../components/HomeGrid";
import HomeCarousel from "../../components/HomeCarousel";
import HomeBanner from "../../components/HomeBanner";
import HomeFooter from "../../components/HomeFooter";

// Actions
import { changeNavbarValue } from "../../actions/navbar";

// Material-UI
import CssBaseline from "@material-ui/core/CssBaseline";

// Seed
import { homeSeed } from "./seed";

const Home = ({ changeNavbarValue }) => {
  useEffect(() => {
    changeNavbarValue("home");
  }, []);

  return (
    <Fragment>
      <CssBaseline />
      {isMobile ? <BottomNavabar /> : <Navbar />}
      <HomeJumbotron />
      <HomeGrid
        title={homeSeed.firstGrid.title}
        images={homeSeed.firstGrid.images}
      />
      <HomeCarousel
        title={homeSeed.carousel.title}
        artist={homeSeed.carousel.artist}
        images={homeSeed.carousel.images}
      />
      <HomeGrid
        title={homeSeed.secondGrid.title}
        images={homeSeed.secondGrid.images}
      />
      <HomeBanner image={homeSeed.firstBanner.image} />
      <HomeGrid
        title={homeSeed.thirdGrid.title}
        images={homeSeed.thirdGrid.images}
      />
      <HomeBanner image={homeSeed.secondBanner.image} />
      <HomeFooter />
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

export default connect(
  mapStateToProps,
  { changeNavbarValue }
)(Home);
