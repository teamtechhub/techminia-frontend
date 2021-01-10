import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { uniqBy } from "lodash";
import { rolesConfig } from "constants/roles.constants";
import * as Routes from "./PrivateRoutes.config";
// import Navigation from "containers/Navigation/Navigation";
import PrivateRoute from "./PrivateRoute";
import { Modal } from "@redq/reuse-modal";
import DashboardLayout from "layouts/DashboardLayout";
import NotFound from "pages/NotFound";

class PrivateRoutes extends Component {
  state = { allowedRoutes: [] };

  componentDidMount() {
    /*
      TODO: Replace hardcoded roles with API,
      contextAPI, localStorage, or get from server.
     */
    let authRoles = localStorage.getItem("darasa_auth_roles");
    let roles = JSON.parse(authRoles);
    if (roles) {
      roles = ["common", ...roles];
      let allowedRoutes = roles.reduce((acc, role) => {
        return [...acc, ...rolesConfig[role].routes];
      }, []);
      // For removing duplicate entries, compare with 'url'.
      allowedRoutes = uniqBy(allowedRoutes, "url");
      this.setState({ allowedRoutes });
    } else {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <DashboardLayout
        routes={this.state.allowedRoutes}
        path={this.props.match.path}
      >
        <Modal>
          <Switch>
            {this.state.allowedRoutes.map((route) => (
              <PrivateRoute
                exact
                key={route.url}
                component={Routes[route.component]}
                path={`${this.props.match.path}${route.url}`}
              />
            ))}
            <Route component={NotFound} />
          </Switch>
        </Modal>
      </DashboardLayout>
    );
  }
}

export default PrivateRoutes;
