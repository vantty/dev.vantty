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

// Assets
import { w1, w2, w3, w4, w5, w6 } from "../../assets/images/wedding";
import b1 from "../../assets/images/banner.png";
import b2 from "../../assets/images/banner2.png";
import {
  fa1,
  fa2,
  fa3,
  fa4,
  fa5,
  fa6,
  fa7
} from "../../assets/images/featuredArtist";
import {
  fm1,
  fm2,
  fm3,
  fm4,
  fm5,
  fm6
} from "../../assets/images/featuredMakeups";
import {
  fh1,
  fh2,
  fh3,
  fh4,
  fh5,
  fh6
} from "../../assets/images/featuresHairstyles";

const weddingImages = [
  { name: "Natalia", photo: w1 },
  { name: "Luisa", photo: w2 },
  { name: "Lina", photo: w3 },
  { name: "Cate", photo: w4 },
  { name: "Sara", photo: w5 },
  { name: "Sor", photo: w6 }
];
const featuresArtistImages = [fa1, fa2, fa3, fa4, fa5, fa6, fa7];
const bannerImage = b1;
const banner2Image = b2;
const featuredMakeupsImages = [
  { name: "Natalia", photo: fm1 },
  { name: "Luisa", photo: fm2 },
  { name: "Lina", photo: fm3 },
  { name: "Cate", photo: fm4 },
  { name: "Sara", photo: fm5 },
  { name: "Sor", photo: fm6 }
];
const featuresHairstyles = [
  { name: "Natalia", photo: fh1 },
  { name: "Luisa", photo: fh2 },
  { name: "Lina", photo: fh3 },
  { name: "Cate", photo: fh4 },
  { name: "Sara", photo: fh5 },
  { name: "Sor", photo: fh6 }
];

const Home = ({ changeNavbarValue }) => {
  useEffect(() => {
    changeNavbarValue("home");
  }, []);

  return (
    <Fragment>
      <CssBaseline />
      {isMobile ? <BottomNavabar /> : <Navbar />}
      <HomeJumbotron />
      <HomeGrid title={"Weddings"} images={weddingImages} />
      <HomeCarousel
        title={"Featured Artist"}
        artist={"Natalia Zuluaga"}
        images={featuresArtistImages}
      />
      <HomeGrid title={"Featured Makeups"} images={featuredMakeupsImages} />
      <HomeBanner image={bannerImage} />
      <HomeGrid title={"Featured Hairstyles"} images={featuresHairstyles} />
      <HomeBanner image={banner2Image} />
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
