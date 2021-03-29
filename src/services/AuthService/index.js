import firebase from "firebase/app";
import "firebase/auth";
import { axiosInstance, formTokenConfig, tokenConfig } from "utils/axios";
import {
  toFormData,
  addArrayToLocalStorage,
  addObjectToLocalStorageObject,
  parseJwt,
} from "utils";
import { logToConsole } from "utils/logging";

export function resetPassword(props) {
  return axiosInstance
    .post(`/auth/reset-password/`, props, tokenConfig())
    .then(async (res) => {
      logToConsole("reset password res", res);
      if (res.status === 200) {
        return { state: true, data: res.data };
      }
    })
    .catch((err) => {
      logToConsole(err.response);
      return { state: false, data: err.response };
    });
}
export function sendResetGooglePasswordLink(email) {
  return axiosInstance
    .post(`/auth/send-reset-password-link/`, { ga: true, login: email })
    .then(async (res) => {
      logToConsole("google email reset", res);
      const url = new URL(res.data.detail);
      const query = new URLSearchParams(url.search);
      if (
        query.get("user_id") &&
        query.get("timestamp") &&
        query.get("signature")
      ) {
        return {
          user_id: query.get("user_id"),
          timestamp: query.get("timestamp"),
          signature: query.get("signature"),
        };
      }
    })
    .catch((err) => {
      logToConsole(err.response);
      return err.response;
    });
}
export function sendResetPasswordLink() {
  return {};
}

export async function sendOTP(phone_number) {
  logToConsole("phone on sendotp", phone_number);
  try {
    logToConsole("trying to send number");
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phone_number, appVerifier)
      .then(async (confirmationResult) => {
        logToConsole("confirmation result", confirmationResult);
        return confirmationResult;
      });
  } catch (err) {
    logToConsole("not trying otp");
    logToConsole(err);
    return err;
  }
}

export function submitOTP(confirmationResult, code) {
  window.confirmationResult = confirmationResult;
  confirmationResult
    .confirm(code)
    .then(async (result) => {
      return logToConsole("result after successful otp confirm: ", result);
    })
    .catch((error) => {
      logToConsole("error on otp submit: ", error);
      if (error.code === "auth/code-expired") {
        logToConsole("used up code", error.message);
        return error.message;
      }
      if ((error.code = "auth/invalid-verification-code")) {
        logToConsole("error code", error.code);
        return error.code;
      } else {
        logToConsole("Something went wrong, Please check your connection");
        return "Something went wrong, Please check your connection";
      }
    });
}

export function confirmPhone(phoneValues) {
  return axiosInstance
    .post(`/auth/verify-phone/`, phoneValues)
    .then(async (res) => {
      logToConsole("phone confirm res", res);
      return res.data;
    })
    .catch((err) => {
      logToConsole(err.response);
      // return err
    });
}
export function handleProfileUpdate(values) {
  return axiosInstance
    .patch(`/auth/profile/`, toFormData(values), formTokenConfig())
    .then(async (res) => {
      logToConsole("data received", res);
      logToConsole("response", res);
      return res.data;
    })
    .catch((err) => {
      if (err.response) {
        logToConsole(err.response.data);
      }
      logToConsole(JSON.stringify(err, null, 4));
      return err;
    });
}

export function login(values, showPhone) {
  return axiosInstance
    .post(`/auth/login/`, values)
    .then(async (res) => {
      logToConsole("data received", res);
      const userPayload = parseJwt(res.data.token.refresh);
      logToConsole("user payload", userPayload);
      const roles = userPayload.role;
      localStorage.removeItem("darasa_auth_roles");
      addArrayToLocalStorage("darasa_auth_roles", roles);
      // eslint-disable-next-line no-unused-vars

      var payload = {};

      let extraPayloadData = {
        token: res.data.token,
      };
      // hashPassword(values.password_confirm);
      // eslint-disable-next-line no-unused-vars
      payload = { ...payload, ...extraPayloadData };
      await addObjectToLocalStorageObject("darasa_auth_payload", payload);

      if (typeof window !== "undefined") {
        await localStorage.setItem("access_token", `${res.data.token.access}`);
        await localStorage.setItem(
          "refresh_token",
          `${res.data.token.refresh}`
        );

        // closeModal();
      }
      // CHECK TOKEN & LOAD USER
      await await new Promise((resolve) => setTimeout(resolve, 3000));
      logToConsole("response", res);
      return res;
    })
    .catch((err) => {
      let cleaned_err;
      if (err.response) {
        cleaned_err =
          err.response.data.detail === "Login or password invalid."
            ? {
                password: `Incorrect password or ${
                  showPhone ? "phone" : "email"
                }`,
              }
            : {
                password: err.response.data.detail,
              };
      } else {
        cleaned_err = err;
      }
      return cleaned_err;
    });
}

export function getProfile() {
  axiosInstance
    .get(`/auth/profile/`, tokenConfig())
    .then(async (res) => {
      let auth_profile = res.data;
      addObjectToLocalStorageObject("darasa_auth_profile", auth_profile);
      return auth_profile;
    })
    .catch((err) => {
      logToConsole(err.response.status);
      return err;
    });
}
