import { BASE_URL } from "constants/constants";
import React from "react";
import FacebookLogin from "react-facebook-login";
import { logToConsole } from "utils/logging";

function FacebookSocialAuth() {
  const fbResponse = (response) => {
    logToConsole(response);
  };
  const fbResponse = async (accesstoken) => {
    let res = await axios.post(`${BASE_URL}/rest-auth/facebook/`, {
      access_token: accesstoken,
    });
    logToConsole(res);
    return await res.status;
  };
  return (
    <div>
      <FacebookLogin
        textButton="Continue with Facebook"
        appId="2950169338543132"
        fields="name,email,picture"
        callback={fbResponse}
      />
    </div>
  );
}

export default FacebookSocialAuth;
