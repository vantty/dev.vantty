// import React from "react";
// import { Switch, Route } from "react-router-dom";

// //Preloading components
// const RoutePrivateWithLayoutPromise = import("./router/RoutePrivateWithLayout");
// const RouteWithLayoutPromise = import("./router/RouteWithLayout");
// const MainLayoutPromise = import("./layout/Main");
// const MinimalLayoutPromise = import("./layout/Minimal");
// const TermsOfServicePromise = import("./views/General/TermsOfService");
// const DataPolicyPromise = import("./views/General/DataPolicy");
// //Form components
// const EditPersonalInfoPromise = import(
//   "./views/EditForm/components/EditPersonalInfo"
// );
// const EditProfilePromise = import("./views/EditForm/components/EditProfile");
// const EditPortfolioPromise = import(
//   "./views/EditForm/components/EditPortfolio"
// );
// const EditMobilePromise = import("./views/EditForm/components/EditMobile");
// const EditPricePromise = import("./views/EditForm/components/EditPrice");
// const EditCategoriesPromise = import(
//   "./views/EditForm/components/EditCategories"
// );
// const EditBookingsPromise = import("./views/EditForm/components/EditBookings");
// const EditPaymentPromise = import("./views/EditForm/components/EditPayment");
// const EditBankPromise = import("./views/EditForm/components/EditBank");
// const EditBookingsUserPromise = import(
//   "./views/EditForm/components/EditBookingsUser"
// );
// const EditLocationPromise = import("./views/EditForm/components/EditLocation");
// const InfoContactPromise = import("./views/Form/components/InfoContact");
// const ValidationPromise = import("./views/Form/components/Validation");
// //Views
// const ProfilePromise = import("./views/Profile");
// const LandingPromise = import("./views/Landing");
// const HomePromise = import("./views/Home");
// const RegisterPromise = import("./views/Register");
// const RegisterWithEmailPromise = import("./views/RegisterWithEmail");
// const WaitForConfirmationPromise = import("./views/WaitForConfirmation");
// const ConfirmationPromise = import("./views/Confirmation");
// const ResetPasswordPromise = import("./views/ResetPassword");
// const ReviewFormPromise = import("./views/ReviewForm");
// const LoginPromise = import("./views/Login");
// const LoginWithEmailPromise = import("./views/LoginWithEmail");
// const FormPromise = import("./views/Form");
// const SearchPromise = import("./views/Search");
// const BoardPromise = import("./views/Admin/Board");
// const SettingsPromise = import("./views/Settings");
// const ForgotPasswordPromise = import("./views/ForgotPassword");
// const CheckoutPromise = import("./views/Checkout");
// const CreateArtistAccountPromise = import("./views/CreateArtistAccount");
// const HelpPromise = import("./views/Help");
// const NotFoundPromise = import("./views/NotFound");
// const TestPromise = import("./views/Test");
// //Routes
// const PrivateRoutePromise = import("./router/PrivateRoute");
// const AdminRoutePromise = import("./router/AdminRoute");
// //Settings
// const AccountPromise = import("./views/Settings/components/Account");
// const ProfileArtistPromise = import(
//   "./views/Settings/components/ProfileArtist"
// );

// //Loading component asynchrounous
// const RoutePrivateWithLayout = React.lazy(() => RoutePrivateWithLayoutPromise);
// const RouteWithLayout = React.lazy(() => RouteWithLayoutPromise);
// const MainLayout = React.lazy(() => MainLayoutPromise);
// const MinimalLayout = React.lazy(() => MinimalLayoutPromise);
// const Terms = React.lazy(() => TermsOfServicePromise);
// const Policy = React.lazy(() => DataPolicyPromise);
// //Forms components
// const EditPersonalInfo = React.lazy(() => EditPersonalInfoPromise);
// const EditProfile = React.lazy(() => EditProfilePromise);
// const EditPortfolio = React.lazy(() => EditPortfolioPromise);
// const EditMobile = React.lazy(() => EditMobilePromise);
// const EditPrice = React.lazy(() => EditPricePromise);
// const EditCategories = React.lazy(() => EditCategoriesPromise);
// const EditBookings = React.lazy(() => EditBookingsPromise);
// const EditPayment = React.lazy(() => EditPaymentPromise);
// const EditBank = React.lazy(() => EditBankPromise);
// const EditBookingsUser = React.lazy(() => EditBookingsUserPromise);
// const EditLocation = React.lazy(() => EditLocationPromise);
// const InfoContact = React.lazy(() => InfoContactPromise);
// const Validation = React.lazy(() => ValidationPromise);
// //Views
// const Profile = React.lazy(() => ProfilePromise);
// const Landing = React.lazy(() => LandingPromise);
// const Home = React.lazy(() => HomePromise);
// const Register = React.lazy(() => RegisterPromise);
// const RegisterWithEmail = React.lazy(() => RegisterWithEmailPromise);
// const WaitForConfirmation = React.lazy(() => WaitForConfirmationPromise);
// const Confirmation = React.lazy(() => ConfirmationPromise);
// const ResetPassword = React.lazy(() => ResetPasswordPromise);
// const ReviewForm = React.lazy(() => ReviewFormPromise);
// const Login = React.lazy(() => LoginPromise);
// const LoginWithEmail = React.lazy(() => LoginWithEmailPromise);
// const Form = React.lazy(() => FormPromise);
// const Search = React.lazy(() => SearchPromise);
// const Board = React.lazy(() => BoardPromise);
// const Settings = React.lazy(() => SettingsPromise);
// const ForgotPassword = React.lazy(() => ForgotPasswordPromise);
// const Checkout = React.lazy(() => CheckoutPromise);
// const CreateArtistAccount = React.lazy(() => CreateArtistAccountPromise);
// const Help = React.lazy(() => HelpPromise);
// const NotFound = React.lazy(() => NotFoundPromise);
// const Test = React.lazy(() => TestPromise);
// //Routes
// const PrivateRoute = React.lazy(() => PrivateRoutePromise);
// const AdminRoute = React.lazy(() => AdminRoutePromise);
// //Settings
// const Account = React.lazy(() => AccountPromise);
// const ProfileArtist = React.lazy(() => ProfileArtistPromise);

// const Loading = () => <div>Loading...</div>;

// const Routes = () => {
//   return (
//     <Switch>
//       <React.Suspense fallback={<Loading />}>
//         <Route exact path='/test' component={Test} />
//         <Route exact path='/confirm-account' component={CreateArtistAccount} />
//         <Route exact path='/confirmation/:token' component={Confirmation} />
//         {/* ADMIN */}
//         <AdminRoute exact path='/dashboard' component={Board} />
//         <PrivateRoute exact path='/create-profile' component={Form} />
//         />
//         {/*  */}
//         <Route component={Register} exact path='/register' />
//         <Route component={RegisterWithEmail} exact path='/register-email' />
//         <Route component={Login} exact path='/login' />
//         <Route component={LoginWithEmail} exact path='/login-email' />
//         <RouteWithLayout
//           component={ForgotPassword}
//           exact
//           layout={MainLayout}
//           path='/forgot'
//         />
//         <RouteWithLayout
//           component={ResetPassword}
//           exact
//           layout={MainLayout}
//           path='/reset/:token'
//         />
//         <RouteWithLayout
//           component={WaitForConfirmation}
//           exact
//           layout={MainLayout}
//           path='/confirmation'
//         />
//         <RouteWithLayout
//           component={Landing}
//           exact
//           layout={MainLayout}
//           path='/landing'
//         />
//         <RouteWithLayout component={Home} exact layout={MainLayout} path='/' />
//         <RouteWithLayout
//           component={Search}
//           exact
//           layout={MainLayout}
//           path='/search'
//         />
//         {/* PROFILE */}
//         <RouteWithLayout
//           component={Profile}
//           exact
//           layout={MinimalLayout}
//           path='/profile/artist/:id'
//         />
//         {/* GENERAL */}
//         <RouteWithLayout
//           exact
//           layout={MainLayout}
//           path='/help'
//           component={Help}
//         />
//         <RouteWithLayout
//           layout={MainLayout}
//           component={Terms}
//           exact
//           path='/terms'
//         />
//         <RouteWithLayout
//           layout={MainLayout}
//           component={Policy}
//           exact
//           path='/policy'
//         />
//         {/* EDIT FORM */}
//         <RoutePrivateWithLayout
//           component={EditBookings}
//           exact
//           layout={MinimalLayout}
//           path='/bookings'
//         />
//         <RoutePrivateWithLayout
//           component={EditLocation}
//           exact
//           layout={MinimalLayout}
//           path='/location'
//         />
//         <RoutePrivateWithLayout
//           component={EditBookingsUser}
//           exact
//           layout={MinimalLayout}
//           path='/bookings-user'
//         />
//         <RoutePrivateWithLayout
//           component={Checkout}
//           exact
//           layout={MinimalLayout}
//           path='/checkout/:id/:bookId'
//         />
//         <RoutePrivateWithLayout
//           component={EditPersonalInfo}
//           exact
//           layout={MinimalLayout}
//           path='/personal-info'
//         />
//         <RoutePrivateWithLayout
//           component={EditProfile}
//           exact
//           layout={MinimalLayout}
//           path='/edit-profile'
//         />
//         <RoutePrivateWithLayout
//           component={Validation}
//           exact
//           layout={MinimalLayout}
//           path='/validation'
//         />
//         <RoutePrivateWithLayout
//           component={InfoContact}
//           exact
//           layout={MinimalLayout}
//           path='/info-contact'
//         />
//         <RoutePrivateWithLayout
//           component={EditPortfolio}
//           exact
//           layout={MinimalLayout}
//           path='/add-portfolio'
//         />
//         {/* SETTINGD */}
//         <PrivateRoute component={Settings} exact path='/settings' />
//         <PrivateRoute component={Account} exact path='/settings/account' />
//         <PrivateRoute
//           component={ProfileArtist}
//           exact
//           path='/settings/profile'
//         />
//         <RoutePrivateWithLayout
//           component={EditMobile}
//           exact
//           layout={MinimalLayout}
//           path='/mobile'
//         />
//         <RoutePrivateWithLayout
//           component={EditPrice}
//           exact
//           layout={MinimalLayout}
//           path='/price'
//         />
//         <RoutePrivateWithLayout
//           component={EditCategories}
//           exact
//           layout={MinimalLayout}
//           path='/categories'
//         />
//         <RoutePrivateWithLayout
//           component={EditPayment}
//           exact
//           layout={MinimalLayout}
//           path='/payments'
//         />
//         <RoutePrivateWithLayout
//           component={EditBank}
//           exact
//           layout={MinimalLayout}
//           path='/bank'
//         />
//         {/* REVIEW */}
//         <RoutePrivateWithLayout
//           component={ReviewForm}
//           exact
//           layout={MinimalLayout}
//           path='/profile/artist/:userId/:reviewId'
//         />
//         <RouteWithLayout layout={MainLayout} component={NotFound} />
//       </React.Suspense>
//     </Switch>
//   );
// };

// export default Routes;

import React from "react";
import { Switch, Route } from "react-router-dom";

import RoutePrivateWithLayout from "./router/RoutePrivateWithLayout";
import RouteWithLayout from "./router/RouteWithLayout";
import { Main as MainLayout, Minimal as MinimalLayout } from "./layout";
import { TermsOfService as Terms } from "./views/General";
import { DataPolicy as Policy } from "./views/General";
import { Agreement } from "./views/General";

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
  Test
} from "./views";

//Routes
import PrivateRoute from "./router/PrivateRoute";
import AdminRoute from "./router/AdminRoute";
import {
  InfoContact,
  Validation
  // Appointments,
  // Bookings
} from "./views/Form/components";
import {
  // SettingsGeneral,
  Account,
  // ProfileArist,
  ProfileSectionMobileArtist
} from "./views/Settings/components";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/test" component={Test} />
      <Route exact path="/confirm-account" component={CreateArtistAccount} />
      <Route exact path="/confirmation/:token" component={Confirmation} />
      {/* ADMIN */}
      <AdminRoute exact path="/dashboard" component={Board} />
      <PrivateRoute exact path="/create-profile" component={Form} />
      />
      {/*  */}
      <PrivateRoute component={UserRole} exact path="/role" />
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
        exact
        layout={MainLayout}
        path="/help"
        component={Help}
      />
      <RouteWithLayout
        layout={MainLayout}
        component={Terms}
        exact
        path="/terms"
      />
      <RouteWithLayout
        layout={MainLayout}
        component={Policy}
        exact
        path="/policy"
      />
      <RouteWithLayout
        layout={MainLayout}
        component={Agreement}
        exact
        path="/agreement"
      />
      {/* EDIT FORM */}
      <RoutePrivateWithLayout
        component={EditBookings}
        exact
        layout={MinimalLayout}
        path="/bookings"
      />
      <RoutePrivateWithLayout
        component={EditLocation}
        exact
        layout={MinimalLayout}
        path="/location"
      />
      <RoutePrivateWithLayout
        component={EditBookingsUser}
        exact
        layout={MinimalLayout}
        path="/bookings-user"
      />
      <RoutePrivateWithLayout
        component={Checkout}
        exact
        layout={MinimalLayout}
        path="/checkout/:id/:bookId"
      />
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
      {/* SETTINGD */}
      <PrivateRoute component={Settings} exact path="/settings" />
      <PrivateRoute component={Account} exact path="/settings/account" />
      <PrivateRoute
        component={ProfileSectionMobileArtist}
        exact
        path="/settings/profile"
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
      <RoutePrivateWithLayout
        component={EditPayment}
        exact
        layout={MinimalLayout}
        path="/payments"
      />
      <RoutePrivateWithLayout
        component={EditBank}
        exact
        layout={MinimalLayout}
        path="/bank"
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
