import { BASE_URL } from "constants/constants";
import React from "react";
import FacebookLogin from "react-facebook-login";

function FacebookSocialAuth() {
  const fbResponse = (response) => {
    console.log(response);
  };
  const fbResponse = async (accesstoken) => {
    let res = await axios.post(`${BASE_URL}/rest-auth/facebook/`, {
      access_token: accesstoken,
    });
    console.log(res);
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
