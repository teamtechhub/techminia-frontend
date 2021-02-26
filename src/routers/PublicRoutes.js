import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "pages/LandingPage/LandingPage";
import TermsPage from "pages/TermsConditions/TermsPage";
import ComingSoon from "pages/coming/coming-soon";
import PrivacyPage from "pages/TermsConditions/PrivacyPage";
import NotFound from "pages/NotFound";
import ColorPicker from "theme/ColorPage";
import EmailVerification from "containers/Authentication/emailVerification";
import Authentication from "containers/Authentication/Authentication";
import PasswordReset from "containers/Authentication/passwordReset";
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
      <Route exact path={`/contact-us`}>
        <Contact deviceType={deviceType} />
      </Route>
      <Route exact path={`/coming-soon`}>
        <ComingSoon deviceType={deviceType} />
      </Route>
      <Route
        exact
        path={`/auth`}
        component={Authentication}
        deviceType={deviceType}
      />
      <Route
        exact
        path={`/auth/:userType[A-Da-z0-9]+`}
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
