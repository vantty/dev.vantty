import React, { Fragment, useEffect } from "react";
// import { BrowserRouter as Router } from "react-router-dom";
import { Router } from "react-router-dom";

import { Provider } from "react-redux";
//Google Analytics
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";
import { Helmet } from "react-helmet";
// Redux Store
import store from "./store";

// Actions
import { loadUser } from "./actions/auth";

// Utils
import setAuthToken from "./utils/setAuthToken";
import theme from "./theme";
import "./assets/scss/index.scss";

// Material-UI
import { ThemeProvider } from "@material-ui/styles";

//Routes
import Routes from "./Routes";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

///Google Analytics Events
const trackingId = process.env.REACT_APP_GOOGLE_ANALYTICS;

ReactGA.initialize(trackingId);
const history = createBrowserHistory();

history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

require("dotenv-flow").config();

const App = () => {
  useEffect(() => {
    //to report page view
    ReactGA.pageview(window.location.pathname + window.location.search);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Helmet>
          <title>Vantty</title>
          <meta
            name='The Best Makeup and Hair Stylist in Toronto! '
            content='Your dreamer look, done by the perfect artist'
          />
        </Helmet>
        <Router history={history}>
          <Fragment>
            <Routes />
          </Fragment>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
