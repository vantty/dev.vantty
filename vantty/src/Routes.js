import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import RoutePrivateWithLayout from "./router/RoutePrivateWithLayout";
import RouteWithLayout from "./router/RouteWithLayout";
import { Main as MainLayout, Minimal as MinimalLayout } from "./layout";
import { TermsOfService as Terms } from "./views/General";

// Views
import {
  EditPersonalInfo,
  EditProfile,
  EditPortfolio,
  SettingsProfile,
  EditMobile,
  EditPrice,
  EditCategories
} from "./views/EditForm/components";

import {
  Profile,
  Landing,
  Home,
  Register,
  WaitForConfirmation,
  Confirmation,
  ReviewForm,
  Login,
  Form,
  Search,
  Board,
  Settings
} from "./views";

//Routes
import PrivateRoute from "./router/PrivateRoute";
import AdminRoute from "./router/AdminRoute";
import { InfoContact } from "./views/Form/components";

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/confirmation/:token' component={Confirmation} />
      <Route exact path='/confirmation' component={WaitForConfirmation} />
      {/* ADMIN */}
      <AdminRoute exact path='/dashboard' component={Board} />
      <PrivateRoute exact path='/create-profile' component={Form} />
      />
      {/*  */}
      {/* <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} /> */}
      <RouteWithLayout
        component={Register}
        exact
        layout={MainLayout}
        path='/register'
      />
      <RouteWithLayout
        component={Login}
        exact
        layout={MainLayout}
        path='/login'
      />
      <RouteWithLayout
        component={Landing}
        exact
        layout={MainLayout}
        path='/landing'
      />
      <RouteWithLayout component={Home} exact layout={MainLayout} path='/' />
      <RouteWithLayout
        component={Search}
        exact
        layout={MainLayout}
        path='/search'
      />
      {/* PROFILE */}
      <RouteWithLayout
        component={Profile}
        exact
        layout={MinimalLayout}
        path='/profile/artist/:id'
      />
      {/* GENERAL */}
      <RoutePrivateWithLayout
        component={Terms}
        exact
        layout={MainLayout}
        path='/terms-of-service'
      />
      {/* EDIT FORM */}
      <RoutePrivateWithLayout
        component={EditPersonalInfo}
        exact
        layout={MainLayout}
        path='/personal-info'
      />
      <RoutePrivateWithLayout
        component={EditProfile}
        exact
        layout={MainLayout}
        path='/edit-profile'
      />
      <RoutePrivateWithLayout
        component={InfoContact}
        exact
        layout={MainLayout}
        path='/info-contact'
      />
      <RoutePrivateWithLayout
        component={EditPortfolio}
        exact
        layout={MainLayout}
        path='/add-portfolio'
      />
      <RoutePrivateWithLayout
        component={Settings}
        exact
        layout={MainLayout}
        path='/settings'
      />
      <RoutePrivateWithLayout
        component={EditMobile}
        exact
        layout={MainLayout}
        path='/mobile'
      />
      <RoutePrivateWithLayout
        component={EditPrice}
        exact
        layout={MainLayout}
        path='/price'
      />
      <RoutePrivateWithLayout
        component={EditCategories}
        exact
        layout={MainLayout}
        path='/categories'
      />
      {/* REVIEW */}
      <RoutePrivateWithLayout
        component={ReviewForm}
        exact
        layout={MainLayout}
        path='/profile/artist/:userId/:reviewId'
      />
    </Switch>
  );
};

export default Routes;
