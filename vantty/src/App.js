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
import Login from "./views/LoginKit";
import Artists from "./views/Artists";
import Profile from "./views/Profile";
import Favorites from "./views/Favorites";
import EditProfile from "./views/Form/EditForm/EditProfile";
import AddEducation from "./views/Form/UserForm/AddEducation";
import InfoContact from "./views/Form/UserForm/InfoContact";
import EditPorfolio from "./views/Form/EditForm/EditPortfolio";

// Actions
import { loadUser } from "./actions/auth";

// Utils
import PrivateRoute from "./router/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
import theme from "./theme";
import "./assets/scss/index.scss";

// Material-UI
import { ThemeProvider } from "@material-ui/styles";
import Account from "./views/Account";
import Form2 from "./views/Form2";

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
            <Route exact path='/' component={Home} />
            <Switch>
              <Route exact path='/number' component={NumberValidation} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/artists' component={Artists} />
              <Route exact path='/favorites' component={Favorites} />
              <Route exact path='/profile/artist/:id' component={Profile} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/create-profile' component={Form2} />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <PrivateRoute exact path='/personal-info' component={Account} />
              <PrivateRoute
                exact
                path='/info-contact'
                component={InfoContact}
              />
              <PrivateRoute
                exact
                path='/add-education'
                component={AddEducation}
              />
              <PrivateRoute
                exact
                path='/add-portfolio'
                component={EditPorfolio}
              />
              <PrivateRoute
                exact
                path='/profile/artist/:userId/:reviewId'
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
