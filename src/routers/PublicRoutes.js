import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "pages/LandingPage/LandingPage";
import TermsPage from "pages/TermsConditions/TermsPage";
import PrivacyPage from "pages/TermsConditions/PrivacyPage";
import NotFound from "pages/NotFound";
import ColorPicker from "theme/ColorPage";
import EmailVerification from "containers/Authentication/emailVerification";
import Authentication from "containers/Authentication/Authentication";
import PasswordReset from "containers/Authentication/passwordReset";
import Library from "pages/Library/Library";
import ProductPage from "pages/product/[slug]";
import CheckoutPage from "pages/Checkout/Checkout";
import Video from "components/Video/Video";
import Contact from "pages/Contact/Contact";

const PublicRoutes = ({ deviceType }) => (
  <Fragment>
    <Switch>
      <Route exact path={`/`}>
        <LandingPage deviceType={deviceType} />
      </Route>
      <Route exact path={`/terms-and-conditions`}>
        <TermsPage deviceType={deviceType} />
      </Route>
      <Route exact path={`/privacy-policy`}>
        <PrivacyPage deviceType={deviceType} />
      </Route>
      <Route exact path={`/library`}>
        <Library deviceType={deviceType} />
      </Route>
      <Route exact path={`/contact-us`}>
        <Contact deviceType={deviceType} />
      </Route>
      <Route exact path={`/product/:slug`}>
        <ProductPage deviceType={deviceType} />
      </Route>
      <Route exact path={`/checkout`}>
        <CheckoutPage deviceType={deviceType} />
      </Route>
      <Route exact path={`/classes`}>
        <Video deviceType={deviceType} />
      </Route>
      <Route
        exact
        path={`/auth`}
        component={Authentication}
        deviceType={deviceType}
      />
      <Route exact path={`/auth/email-verify/`} component={EmailVerification} />
      <Route exact path={`/auth/pw-reset/`} component={PasswordReset} />

      <Route
        path={`/color-picker`}
        component={ColorPicker}
        deviceType={deviceType}
      />
      <Route component={NotFound} deviceType={deviceType} />
    </Switch>
  </Fragment>
);

export default PublicRoutes;
