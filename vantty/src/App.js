import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Button from "@material-ui/core/Button";

// Redux Store
import store from "./store";

// Components

// import Alert from "./components/Alert";
import ReviewForm from "./components/ReviewForm";
import NumberValidation from "./components/NumberValidation";

// Views
import Home from "./views/Home";
import Register from "./views/Register";
import Confirmation from "./views/Confirmation";
import WaitForConfirmation from "./views/WaitForConfirmation";
import Login from "./views/Login";
import Artists from "./views/Artists";
import Profile from "./views/Profile";
import Favorites from "./views/Favorites";
import Landing from "./views/Landing";
import DashboardAdmin from "./components/dashboard/DashboardAdmin";

import { InfoContact } from "./views/Form/components";
import {
  EditProfile,
  EditPersonalInfo,
  EditMobile,
  Table
} from "./views/EditForm/components";
import {
  EditPortfolio,
  EditPrice,
  EditCategories
} from "./views/EditForm/components";
import Form from "./views/Form";

// Actions
import { loadUser } from "./actions/auth";

// Utils
import PrivateRoute from "./router/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
import theme from "./theme";
import "./assets/scss/index.scss";

// Material-UI
import { ThemeProvider } from "@material-ui/styles";
// import Settings from "./views/Settings";
import { Alert } from "./components";
import { Board } from "./views/Admin/";
import AdminRoute from "./router/AdminRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Alert />
        <Router>
          <Fragment>
            <Route exact path="/" component={Home} />
            <Switch>
              <Route exact path="/number" component={NumberValidation} />
              <Route exact path="/register" component={Register} />
              <Route
                exact
                path="/confirmation/:token"
                component={Confirmation}
              />
              <Route
                exact
                path="/confirmation"
                component={WaitForConfirmation}
              />
              <Route exact path="/login" component={Login} />
              <Route exact path="/artists" component={Artists} />
              <Route exact path="/favorites" component={Favorites} />
              <Route exact path="/profile/artist/:id" component={Profile} />
              <AdminRoute exact path="/board" component={Board} />
              {/* <Route exact path='/home' component={Home} /> */}
              <PrivateRoute
                exact
                path="/dashboard"
                component={DashboardAdmin}
              />
              <PrivateRoute exact path="/create-profile" component={Form} />
              />
              <PrivateRoute
                exact
                path="/categories"
                component={EditCategories}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/personal-info"
                component={EditPersonalInfo}
              />
              <PrivateRoute
                exact
                path="/info-contact"
                component={InfoContact}
              />
              <PrivateRoute exact path="/settings" component={Table} />
              <PrivateRoute exact path="/mobile" component={EditMobile} />
              <PrivateRoute exact path="/price" component={EditPrice} />
              <PrivateRoute
                exact
                path="/add-portfolio"
                component={EditPortfolio}
              />
              <PrivateRoute
                exact
                path="/profile/artist/:userId/:reviewId"
                component={ReviewForm}
              />
            </Switch>
          </Fragment>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
