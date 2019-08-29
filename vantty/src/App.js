import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

// Redux Store
import store from "./store";

// Components
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./views/Form/UserForm";
import EditProfile from "./views/Form/EditProfile";
import AddEducation from "./views/Form/AddEducation";
import AddPortfolio from "./views/Form/AddPortfolio";
import InfoContact from "./views/Form/InfoContact";
import UserForm from "./views/Form/UserForm";
import Alert from "./components/Alert";
import ReviewForm from "./components/ReviewForm";
import NumberValidation from "./components/NumberValidation";
import EditPorfolio from "./views/Form/EditPortfolio";

// Views
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";
import Artists from "./views/Artists";
import Profile from "./views/Profile";
import Favorites from "./views/Favorites";

// Actions
import { loadUser } from "./actions/auth";

// Utils
import PrivateRoute from "./router/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
import EditPersonalInfo from "./views/Form/EditPersonalInfo";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path='/' component={Home} />
          {/* <Container> */}
          {/* <Alert /> */}
          <Switch>
            <Route exact path='/number' component={NumberValidation} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/artists' component={Artists} />
            <Route exact path='/favorites' component={Favorites} />
            <Route exact path='/profile/artist/:id' component={Profile} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/create-profile' component={UserForm} />
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
            <PrivateRoute
              exact
              path='/personal-info'
              component={EditPersonalInfo}
            />
            <PrivateRoute exact path='/info-contact' component={InfoContact} />
            <Route exact path='/create-profile' component={UserForm} />
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
    </Provider>
  );
};

export default App;