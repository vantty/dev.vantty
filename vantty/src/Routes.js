import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import RoutePrivateWithLayout from "./router/RoutePrivateWithLayout";
import RouteWithLayout from "./router/RouteWithLayout";
import { Main as MainLayout, Minimal as MinimalLayout } from "./layout";
import { TermsOfService as Terms } from "./views/General";
import { DataPolicy as Policy } from "./views/General";

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
  Settings,
  NotFound
} from "./views";

//Routes
import PrivateRoute from "./router/PrivateRoute";
import AdminRoute from "./router/AdminRoute";
import { InfoContact } from "./views/Form/components";
import { SettingsGeneral } from "./views/Settings/components";

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
      <Route component={Register} exact path='/register' />
      <Route component={Login} exact path='/login' />
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
      <RouteWithLayout
        layout={MainLayout}
        component={Terms}
        exact
        path='/terms-of-service'
      />
      <RouteWithLayout
        layout={MainLayout}
        component={Policy}
        exact
        path='/data-policy'
      />
      {/* EDIT FORM */}
      <RoutePrivateWithLayout
        component={EditPersonalInfo}
        exact
        layout={MinimalLayout}
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
        layout={MinimalLayout}
        path='/info-contact'
      />
      <RoutePrivateWithLayout
        component={EditPortfolio}
        exact
        layout={MinimalLayout}
        path='/add-portfolio'
      />
      <PrivateRoute component={Settings} exact path='/settings' />
      <PrivateRoute
        component={SettingsGeneral}
        exact
        path='/settings/general'
      />
      <RoutePrivateWithLayout
        component={EditMobile}
        exact
        layout={MinimalLayout}
        path='/mobile'
      />
      <RoutePrivateWithLayout
        component={EditPrice}
        exact
        layout={MinimalLayout}
        path='/price'
      />
      <RoutePrivateWithLayout
        component={EditCategories}
        exact
        layout={MinimalLayout}
        path='/categories'
      />
      {/* REVIEW */}
      <RoutePrivateWithLayout
        component={ReviewForm}
        exact
        layout={MinimalLayout}
        path='/profile/artist/:userId/:reviewId'
      />
      <RouteWithLayout layout={MainLayout} component={NotFound} />
    </Switch>
  );
};

export default Routes;
