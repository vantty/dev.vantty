import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

// Redux Store
import store from "./store";

// Components
import Dashboard from "./components/dashboard/Dashboard";

// import Alert from "./components/Alert";
import ReviewForm from "./components/ReviewForm";
import NumberValidation from "./components/NumberValidation";

// Views
import Home from "./views/Home";
import Register from "./views/Register";
import Confirmation from "./views/Confirmation";
import Login from "./views/Login";
import Artists from "./views/Artists";
import Profile from "./views/Profile";
import Favorites from "./views/Favorites";
<<<<<<< HEAD
import Landing from "./views/Landing";
import { EditProfile } from "./views/EditForm/components";
=======
import { EditProfile, EditPersonalInfo } from "./views/EditForm/components";
>>>>>>> a6434e7e341c4392c839e5c4bd87dcabe6914a4e
import { InfoContact } from "./views/Form/components";
import { EditPortfolio, EditPrice } from "./views/EditForm/components";
import Account from "./views/Account";
import Form from "./views/Form";

//Layouts
import { Redirect } from "react-router-dom";
import { RouteWithLayout } from "./components";
import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";

import { Account as AccountView } from "./views";

// Actions
import { loadUser } from "./actions/auth";

// Utils
import PrivateRoute from "./router/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
import theme from "./theme";
import "./assets/scss/index.scss";

// Material-UI
import { ThemeProvider } from "@material-ui/styles";

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
        <Router>
          <Fragment>
            <Route exact path="/" component={Landing} />
            <Switch>
              <Route exact path='/number' component={NumberValidation} />
              <Route exact path='/register' component={Register} />
              <Route
                exact
                path='/confirmation/:token'
                component={Confirmation}
              />
              <Route exact path="/login" component={Login} />
              <Route exact path="/artists" component={Artists} />
              <Route exact path="/favorites" component={Favorites} />
              <Route exact path="/profile/artist/:id" component={Profile} />
              <Route exact path="/home" component={Home} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={Form} />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path='/personal-info'
                component={EditPersonalInfo}
              />
              <PrivateRoute
                exact
                path='/info-contact'
                component={InfoContact}
              />
              <PrivateRoute exact path='/price' component={EditPrice} />

              <PrivateRoute
                exact
                path='/add-portfolio'
                component={EditPortfolio}
              />
              <PrivateRoute
                exact
                path='/profile/artist/:userId/:reviewId'
                component={ReviewForm}
              />
              <RouteWithLayout
                component={AccountView}
                exact
                layout={MainLayout}
                path='/account'
              />
            </Switch>
          </Fragment>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
