import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import { Modal } from "@redq/reuse-modal";
import AppLayout from "layouts/AppLayout";
import { AuthContext } from "contexts/auth/auth.context";
import PrivateRoutes from "./PrivateRoutes";

function BaseRouter({ deviceType }) {
  console.log(deviceType);
  const { isAuthenticated } = useContext(AuthContext);
  const authentication = () =>
    isAuthenticated ? (
      <Redirect to="/dashboard" deviceType={deviceType} />
    ) : (
      <PublicRoutes deviceType={deviceType} />
    );
  return (
    <>
      <Switch>
        <Route
          path="/dashboard"
          render={(props) => (
            <PrivateRoutes deviceType={deviceType} {...props} />
          )}
        />

        <AppLayout deviceType={deviceType}>
          <Route path="/" render={authentication} />
          <Modal />
        </AppLayout>
      </Switch>
    </>
  );
}

export default BaseRouter;
