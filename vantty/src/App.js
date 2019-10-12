import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

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

//component
import { Alert } from "./components";

//Routes
import Routes from "./Routes";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const dotenv = require("dotenv");
dotenv.config();

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
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
