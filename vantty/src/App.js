import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
// Externals
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// Redux Store
import store from "./store";

// Actions
import { loadUser } from "./actions/auth";
import { getCurrentProfile } from "./actions/profile";

// Utils
import setAuthToken from "./utils/setAuthToken";
import theme from "./theme";
import "./assets/scss/index.scss";

// Material-UI
import { ThemeProvider } from "@material-ui/styles";

//Routes
import Routes from "./Routes";
import { getBook } from "./actions/book";
import { getImages } from "./actions/uploader";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const dotenv = require("dotenv");
dotenv.config();

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getCurrentProfile());
    store.dispatch(getBook());
    // store.dispatch(getImages());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Fragment>
            <Routes />
          </Fragment>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
