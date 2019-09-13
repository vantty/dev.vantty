import React, { Fragment } from "react";
import withRoot from "./withRoot";

import AppAppBar from "./Components/AppAppBar";
import ProductHero from "./Components/ProductHero";
import ProductValues from "./Components/ProductValues";
import ProductCategories from "./Components/ProductCategories";
import ProductHowItWorks from "./Components/ProductHowItWorks";
import ProductCTA from "./Components/ProductCTA";
import ProductSmokingHero from "./Components/ProductSmokingHero";
import AppFooter from "./Components/AppFooter";

const Landing = () => {
  return (
    <Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
      {/* <ProductCTA /> */}
      <ProductSmokingHero />
      <AppFooter />
    </Fragment>
  );
};

export default withRoot(Landing);
