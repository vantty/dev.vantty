import React from "react";
import { Switch, Route } from "react-router-dom";

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
  EditMobile,
  EditPrice,
  EditCategories
} from "./views/EditForm/components";

import {
  Profile,
  Landing,
  Home,
  Register,
  RegisterWithEmail,
  WaitForConfirmation,
  Confirmation,
  ResetPassword,
  ReviewForm,
  Login,
  LoginWithEmail,
  Form,
  Search,
  Board,
  Settings,
  ForgotPassword,
  Checkout,
  Order,
  OrderConfirm,
  NotFound
} from "./views";

//Routes
import PrivateRoute from "./router/PrivateRoute";
import AdminRoute from "./router/AdminRoute";
import { InfoContact, Validation } from "./views/Form/components";
import { SettingsGeneral } from "./views/Settings/components";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/order" component={Order} />
      <Route exact path="/test" component={OrderConfirm} />
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/confirmation/:token" component={Confirmation} />
      {/* <Route exact path='/confirmation' component={WaitForConfirmation} /> */}
      {/* ADMIN */}
      <AdminRoute exact path="/dashboard" component={Board} />
      <PrivateRoute exact path="/create-profile" component={Form} />
      />
      {/*  */}
      <Route component={Register} exact path="/register" />
      <Route component={RegisterWithEmail} exact path="/register-email" />
      <Route component={Login} exact path="/login" />
      <Route component={LoginWithEmail} exact path="/login-email" />
      <RouteWithLayout
        component={ForgotPassword}
        exact
        layout={MainLayout}
        path="/forgot"
      />
      <RouteWithLayout
        component={ResetPassword}
        exact
        layout={MainLayout}
        path="/reset/:token"
      />
      <RouteWithLayout
        component={WaitForConfirmation}
        exact
        layout={MainLayout}
        path="/confirmation"
      />
      <RouteWithLayout
        component={Landing}
        exact
        layout={MainLayout}
        path="/landing"
      />
      <RouteWithLayout component={Home} exact layout={MainLayout} path="/" />
      <RouteWithLayout
        component={Search}
        exact
        layout={MainLayout}
        path="/search"
      />
      {/* PROFILE */}
      <RouteWithLayout
        component={Profile}
        exact
        layout={MinimalLayout}
        path="/profile/artist/:id"
      />
      {/* GENERAL */}
      <RouteWithLayout
        layout={MainLayout}
        component={Terms}
        exact
        path="/terms-of-service"
      />
      <RouteWithLayout
        layout={MainLayout}
        component={Policy}
        exact
        path="/data-policy"
      />
      {/* EDIT FORM */}
      <RoutePrivateWithLayout
        component={EditPersonalInfo}
        exact
        layout={MinimalLayout}
        path="/personal-info"
      />
      <RoutePrivateWithLayout
        component={EditProfile}
        exact
        layout={MinimalLayout}
        path="/edit-profile"
      />
      <RoutePrivateWithLayout
        component={Validation}
        exact
        layout={MinimalLayout}
        path="/validation"
      />
      <RoutePrivateWithLayout
        component={InfoContact}
        exact
        layout={MinimalLayout}
        path="/info-contact"
      />
      <RoutePrivateWithLayout
        component={EditPortfolio}
        exact
        layout={MinimalLayout}
        path="/add-portfolio"
      />
      <PrivateRoute component={Settings} exact path="/settings" />
      <PrivateRoute
        component={SettingsGeneral}
        exact
        path="/settings/account"
      />
      <RoutePrivateWithLayout
        component={EditMobile}
        exact
        layout={MinimalLayout}
        path="/mobile"
      />
      <RoutePrivateWithLayout
        component={EditPrice}
        exact
        layout={MinimalLayout}
        path="/price"
      />
      <RoutePrivateWithLayout
        component={EditCategories}
        exact
        layout={MinimalLayout}
        path="/categories"
      />
      {/* REVIEW */}
      <RoutePrivateWithLayout
        component={ReviewForm}
        exact
        layout={MinimalLayout}
        path="/profile/artist/:userId/:reviewId"
      />
      <RouteWithLayout layout={MainLayout} component={NotFound} />
    </Switch>
  );
};

export default Routes;
