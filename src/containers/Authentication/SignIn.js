import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { closeModal } from "@redq/reuse-modal";
import Error500 from "components/Error/Error500";
import FormikControl from "containers/FormikContainer/FormikControl";
import { AuthContext } from "contexts/auth/auth.context";
import { Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  addArrayToLocalStorage,
  addObjectToLocalStorageObject,
  parseJwt,
  unhashPassword,
} from "utils";
import { axiosInstance, tokenConfig } from "utils/axios";
import * as Yup from "yup";
import GoogleSocialAuth from "./GoogleSocialAuth";
import {
  Button,
  Container,
  Divider,
  LinkButton,
  Offer,
  OfferSection,
  Wrapper,
} from "./SignInOutForm.style";

export default function SignInModal() {
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, "");
  const pathname = path[0] === "/" ? path.substr(1) : path;

  const emailNotLongEnough = "email must be at least 3 characters";
  const emailRequired = "Please enter an email address";
  const invalidEmail = "email must be a valid email";
  const passwordNotLongEnough = "password must be at least 3 characters";
  const fieldRequired = "This field is required";
  const [initialValues, setInitialValues] = useState();
  const { state, authDispatch } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [showPhone, setShowPhone] = useState(Boolean());
  const [showEmail, setShowEmail] = useState(Boolean());
  const [isLoading, setIsLoading] = useState(Boolean());

  useEffect(() => {
    if (localStorage.getItem("darasa_auth_profile") !== null) {
      setInitialValues({
        login: JSON.parse(localStorage.getItem("darasa_auth_profile")).email,
        password: unhashPassword(),
      });
    } else {
      setInitialValues({
        login: "",
        password: "",
      });
    }
  }, []);
  const isAuthPage = pathname === "auth";

  const toggleSignUpForm = () => {
    authDispatch({
      type: "SIGNUP",
    });
    if (!isAuthPage) {
      closeModal();
      history.push("/auth");
    }
  };

  const toggleForgotPassForm = () => {
    authDispatch({
      type: "FORGOTPASS",
    });
  };

  const validationSchema = Yup.object({
    login: showPhone
      ? Yup.string().min(12, "Must have 12 numbers").required(fieldRequired)
      : Yup.string()
          .min(3, emailNotLongEnough)
          .max(100)
          .email(invalidEmail)
          .required(emailRequired),
    password: Yup.string()
      .min(8, passwordNotLongEnough)
      .max(100)
      .required(fieldRequired),
  });

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    setIsLoading(true);
    setSubmitting(true);
    const body = values;
    console.log("body", body);
    if (showPhone) {
      body["login"] = `+${body.login.replace("+", "")}`;
    }
    setTimeout(() => {
      // call the login function
      // setLogin(true);
      // setLoginDetails(values);
      try {
        axiosInstance
          .post(`/auth/login/`, body)
          .then(async (res) => {
            console.log("data received", res);

            const userPayload = parseJwt(res.data.token.refresh);
            console.log("user payload", userPayload);
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
              await localStorage.setItem(
                "access_token",
                `${res.data.token.access}`
              );
              await localStorage.setItem(
                "refresh_token",
                `${res.data.token.refresh}`
              );
              authDispatch({
                type: "LOGIN_SUCCESS",
              });

              // closeModal();
            }
            // CHECK TOKEN & LOAD USER
            await axiosInstance
              .get(`/auth/profile/`, tokenConfig())
              .then(async (res) => {
                let auth_profile = res.data;
                addObjectToLocalStorageObject(
                  "darasa_auth_profile",
                  auth_profile
                );
                authDispatch({
                  type: "UPDATE",
                  payload: {
                    ...state,
                    profile: auth_profile,
                  },
                });
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setSubmitting(false);
                setIsLoading(false);
              })
              .catch((err) => {
                if (err.response) {
                  setErrors(err.response.data);
                } else {
                  setError(err);
                }
                console.log(err.response.status);
                setSubmitting(false);
                setIsLoading(false);
              });

            await new Promise((resolve) => setTimeout(resolve, 3000));
            console.log("response", res);
            history.push("/dashboard");
          })
          .catch((err) => {
            if (err.response) {
              setErrors(
                err.response.data.detail === "Login or password invalid."
                  ? {
                      password: `Incorrect password or ${
                        showPhone ? "phone" : "email"
                      }`,
                    }
                  : {
                      password: err.response.data.detail,
                    }
              );
            } else {
              setError(err);
            }
            console.log(err);
            setSubmitting(false);
            setIsLoading(false);
          });
      } catch (error) {
        console.log("Catching Errors:", error);
        setError(error);
      }
      var payload = {};
      let email = { email: values.email, secret: values.password };
      payload = { ...payload, ...email };
      addObjectToLocalStorageObject("darasa_auth_payload", payload);
    }, 500);
  };

  if (error) {
    return <Error500 err={error} />;
  }

  const LoginForm = (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              control="input"
              type={showPhone ? "phone" : "email"}
              label={showPhone ? "Phone" : "Email"}
              name="login"
            />
            <FormikControl
              control="input"
              type="password"
              label="Password"
              name="password"
            />

            <Button
              type="submit"
              disabled={!formik.isValid}
              fullwidth
              isLoading={isLoading}
              title={formik.isSubmitting ? "Loging you in... " : "Log in"}
              style={{
                margin: "10px 0",
                background: showPhone ? "#ec7623" : "#652e8d",
                color: "#ffffff",
              }}
            />
          </Form>
        );
      }}
    </Formik>
  );

  const handlePhoneButtonClick = (e) => {
    e.preventDefault();

    setShowPhone(true);
    setShowEmail(false);
    setInitialValues({
      login: "",
      password: "",
    });
  };

  const handleEmailButtonClick = (e) => {
    e.preventDefault();

    setShowPhone(false);
    setShowEmail(true);
    setInitialValues({
      login: "",
      password: "",
    });
  };

  return (
    <Wrapper>
      <Container>
        {showPhone && LoginForm}
        {!showPhone && (
          <Button
            fullwidth
            title={
              <>
                <FontAwesomeIcon icon={"phone"} /> Log in using phone
              </>
            }
            onClick={handlePhoneButtonClick}
            style={{
              margin: "10px 0",
              background: "#ec7623",
              color: "#ffffff",
            }}
          />
        )}
        {showEmail && LoginForm}
        {!showEmail && (
          <Button
            fullwidth
            title={
              <>
                <FontAwesomeIcon icon={"envelope"} /> Log in using email
              </>
            }
            onClick={handleEmailButtonClick}
            style={{ margin: "10px 0", color: "#ffffff" }}
          />
        )}

        <Divider>
          <span>or</span>
        </Divider>

        <GoogleSocialAuth />

        <Offer style={{ padding: "20px 0" }}>
          Don't have any account?{" "}
          <LinkButton onClick={toggleSignUpForm}>Sign Up</LinkButton>
        </Offer>
        <OfferSection>
          <Offer>
            Forgot your password?{" "}
            <LinkButton onClick={toggleForgotPassForm}>Reset It</LinkButton>
          </Offer>
        </OfferSection>
      </Container>
    </Wrapper>
  );
}
