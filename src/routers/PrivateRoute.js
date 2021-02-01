import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import decode from "jwt-decode";
import { millisecondsToDaysHoursMinutesSeconds } from "utils";

const checkAuth = async () => {
  const payload = JSON.parse(localStorage.getItem("darasa_auth_payload"));
  if (payload === undefined || payload === null) {
    return false;
  }
  const accessToken = payload.token.access;
  const refreshToken = payload.token.refresh;

  if (!accessToken || !refreshToken) {
    return false;
  }

  try {
    const { exp } = decode(accessToken);

    const {
      days,
      hours,
      minutes,
      seconds,
    } = millisecondsToDaysHoursMinutesSeconds(exp);
    console.log(
      `Token Expires in: ${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`
    );

    if (exp * 1000 <= Date.now()) {
      return false;
    }
  } catch (error) {
    alert(`${JSON.stringify(error, null, 2)}`);
  }
  return true;
};
const PrivateRoute = ({ component: Component, path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        checkAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "auth/",
              state: { referrer: `dashboard/${path}` },
            }}
          />
        )
      }
    />
  );
};

export default withRouter(PrivateRoute);
