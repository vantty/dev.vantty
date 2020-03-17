import React from "react";
import { Switch, Route } from "react-router-dom";

import RoutePrivateWithLayout from "./router/RoutePrivateWithLayout";
import RouteWithLayout from "./router/RouteWithLayout";
import { Main as MainLayout, Minimal as MinimalLayout } from "./layout";
import { TermsOfService as Terms } from "./views/General";
import { DataPolicy as Policy } from "./views/General";
import { FAQ } from "./views/General";

// Views
import {
  EditPersonalInfo,
  EditProfile,
  EditPortfolio,
  EditMobile,
  EditPrice,
  EditCategories,
  EditBookings,
  EditPayment,
  EditBank,
  EditBookingsUser,
  EditLocation
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
  CreateArtistAccount,
  Help,
  NotFound,
  UserRole,
  Test,
  LandingPage
} from "./views";

//Routes
import PrivateRoute from "./router/PrivateRoute";
import AdminRoute from "./router/AdminRoute";
import { InfoContact, Validation } from "./views/Form/components";
import {
  Account,
  ProfileSectionMobileArtist
} from "./views/Settings/components";

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/test' component={Test} />
      <Route exact path='/confirm-account' component={CreateArtistAccount} />
      <Route exact path='/confirmation/:token' component={Confirmation} />
      {/* ADMIN */}
      <AdminRoute exact path='/dashboard' component={Board} />
      <PrivateRoute exact path='/create-profile' component={Form} />
      />
      {/*  */}
      <PrivateRoute component={UserRole} exact path='/role' />
      <Route component={Register} exact path='/register' />
      <Route component={RegisterWithEmail} exact path='/register-email' />
      <Route component={Login} exact path='/login' />
      <Route component={LoginWithEmail} exact path='/login-email' />
      <RouteWithLayout
        component={ForgotPassword}
        exact
        layout={MainLayout}
        path='/forgot'
      />
      <RouteWithLayout
        component={ResetPassword}
        exact
        layout={MainLayout}
        path='/reset/:token'
      />
      <RouteWithLayout
        component={WaitForConfirmation}
        exact
        layout={MainLayout}
        path='/confirmation'
      />
      <Route
        component={LandingPage}
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
        exact
        layout={MainLayout}
        path='/help'
        component={Help}
      />
      <RouteWithLayout
        layout={MainLayout}
        component={Terms}
        exact
        path='/terms'
      />
      <RouteWithLayout
        layout={MainLayout}
        component={Policy}
        exact
        path='/policy'
      />
      <RouteWithLayout layout={MainLayout} component={FAQ} exact path='/faq' />
      {/* EDIT FORM */}
      <RoutePrivateWithLayout
        component={EditBookings}
        exact
        layout={MinimalLayout}
        path='/bookings'
      />
      <RoutePrivateWithLayout
        component={EditLocation}
        exact
        layout={MinimalLayout}
        path='/location'
      />
      <RoutePrivateWithLayout
        component={EditBookingsUser}
        exact
        layout={MinimalLayout}
        path='/bookings-user'
      />
      <RoutePrivateWithLayout
        component={Checkout}
        exact
        layout={MinimalLayout}
        path='/checkout/:id/:bookId'
      />
      <RoutePrivateWithLayout
        component={EditPersonalInfo}
        exact
        layout={MinimalLayout}
        path='/personal-info'
      />
      <RoutePrivateWithLayout
        component={EditProfile}
        exact
        layout={MinimalLayout}
        path='/edit-profile'
      />
      <RoutePrivateWithLayout
        component={Validation}
        exact
        layout={MinimalLayout}
        path='/validation'
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
      {/* SETTINGD */}
      <PrivateRoute component={Settings} exact path='/settings' />
      <PrivateRoute component={Account} exact path='/settings/account' />
      <PrivateRoute
        component={ProfileSectionMobileArtist}
        exact
        path='/settings/profile'
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
      <RoutePrivateWithLayout
        component={EditPayment}
        exact
        layout={MinimalLayout}
        path='/payments'
      />
      <RoutePrivateWithLayout
        component={EditBank}
        exact
        layout={MinimalLayout}
        path='/bank'
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
