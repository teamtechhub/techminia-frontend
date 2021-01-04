import React, { useContext, useState } from "react";
import { axiosInstance } from "utils/axios";
import { Google } from "components/AllSvgIcon";
import GoogleLogin from "react-google-login";
import { Button } from "./SignInOutForm.style";
import { AuthContext } from "contexts/auth/auth.context";
import { useAlert } from "react-alert";
import { addArrayToLocalStorage, parseJwt } from "utils";
import { useHistory } from "react-router-dom";
import { tokenConfig } from "utils/axios";
import { addObjectToLocalStorageObject } from "utils";

function GoogleSocialAuth() {
  const { state, authDispatch } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(Boolean());
  const history = useHistory();
  const alert = useAlert();
  // const googleResponse = (response) => {
  //   console.log(response);
  // };
  const googleLogin = async (accesstoken) => {
    setIsLoading(true);
    console.log(accesstoken);
    console.log(accesstoken.accessToken);

    await axiosInstance
      .post(`/google/`, {
        access_token: accesstoken.accessToken,
      })
      .then(async (res) => {
        console.log("google response from django", res);
        const userPayload = parseJwt(res.data.refresh_token);
        console.log("user payload", userPayload);
        const roles = userPayload.role;
        if (roles) {
          localStorage.removeItem("darasa_auth_roles");
          addArrayToLocalStorage("darasa_auth_roles", roles);
        }

        await localStorage.setItem("access_token", `${res.data.access_token}`);
        await localStorage.setItem(
          "refresh_token",
          `${res.data.refresh_token}`
        );
        await localStorage.setItem("darasa_email", res.data.user.email);
        await localStorage.setItem("darasa_name", res.data.user.first_name);
        setIsLoading(false);
        axiosInstance.get("/auth/profile/", tokenConfig()).then((res) => {
          console.log(res);
          console.log(res.data.phone_number);
          if (res.data.phone_number) {
            const roles = [];
            if (res.data.is_student) {
              roles.push("student");
              localStorage.removeItem("darasa_auth_roles");
              addArrayToLocalStorage("darasa_auth_roles", roles);
            }
            if (res.data.is_publisher) {
              roles.push("publisher");
              localStorage.removeItem("darasa_auth_roles");
              addArrayToLocalStorage("darasa_auth_roles", roles);
            }
            if (res.data.is_teacher) {
              roles.push("teacher");
              localStorage.removeItem("darasa_auth_roles");
              addArrayToLocalStorage("darasa_auth_roles", roles);
            }
            const auth_profile = res.data;
            addObjectToLocalStorageObject("darasa_auth_profile", auth_profile);
            authDispatch({
              type: "UPDATE",
              payload: {
                ...state,
                profile: auth_profile,
              },
            });
            history.push("/dashboard");
          } else {
            authDispatch({
              type: "COMPLETEGOOGLELOGIN",
              payload: {
                ...state,
              },
            });
          }
        });

        console.log(res);
        return await res.status;
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response) {
          if (err.response.data) {
            if (err.response.data.non_field_errors) {
              alert.error(err.response.data.non_field_errors[0]);
              console.log(err.response.data.non_field_errors[0]);
            }
            console.log(err.response.data);
          }
          console.log(err.response);
        }
        console.log(err);
      });
  };
  return (
    <GoogleLogin
      render={(renderProps) => (
        <Button
          fullwidth
          title={"Continue with Google"}
          isLoading={isLoading}
          className="google"
          icon={<Google />}
          iconPosition="left"
          iconStyle={{ color: "#ffffff", marginRight: 5 }}
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          style={{ color: "#ffffff" }}
        />
      )}
      clientId="678840442214-p3h941erc79pifgavk18ugln619pbic7.apps.googleusercontent.com"
      onSuccess={googleLogin}
      onFailure={googleLogin}
      cookiePolicy={"single_host_origin"}
    />
  );
}

export default GoogleSocialAuth;
