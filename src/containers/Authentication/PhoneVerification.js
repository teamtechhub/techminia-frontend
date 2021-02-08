import FormikControl from "containers/FormikContainer/FormikControl";
import { AuthContext } from "contexts/auth/auth.context";
import firebase from "firebase/app";
import "firebase/auth";
import { Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { axiosInstance } from "utils/axios";
import * as Yup from "yup";
import {
  Button,
  Container,
  Heading,
  LinkButton,
  Offer,
  SubHeading,
  Wrapper,
} from "./SignInOutForm.style";

export default function PhoneVerification() {
  const { authDispatch } = useContext(AuthContext);
  const [verifyOTP, setVerifyOTP] = useState(false);
  const [phoneValues, setPhoneValues] = useState({});
  const [validating, setValidating] = useState(Boolean());
  const [confirmationResult, setConfirmationResult] = useState({});

  const history = useHistory();
  const captchaRef = React.useRef(null);

  const recaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        // callback: function (response) {
        //   console.log("It works!");
        // },
      }
    );
    // window.recaptchaVerifier.render();
  };
  const emailNotLongEnough = "email must be at least 3 characters";
  const emailRequired = "Please enter an email address";
  const invalidEmail = "email must be a valid email";

  const initialValues = {
    phone_number: "",
    email: "",
  };
  const otpInitialValues = {
    code: "",
  };
  const otpValidationSchema = Yup.object().shape({
    code: Yup.number()
      .min(6, "code is too short")
      .required("This field is required"),
  });
  const validationSchema = Yup.object().shape({
    phone_number: Yup.string()
      .min(12, "Must have 12 numbers")
      .required("This field is required"),
    email: Yup.string()
      .min(3, emailNotLongEnough)
      .max(100)
      .email(invalidEmail)
      .required(emailRequired),
  });
  const toggleSignInForm = () => {
    authDispatch({
      type: "SIGNIN",
    });
    history.push("/auth");
  };

  const handlePhoneConfirm = () => {
    console.log("login values", phoneValues);
    axiosInstance
      .post(`/auth/verify-phone/`, phoneValues)
      .then(async (res) => {
        console.log("phone confirm res", res);
        handleLogin();

        await new Promise((resolve) => setTimeout(resolve, 3000));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleLogin = () => {
    authDispatch({
      type: "SIGNIN",
    });
    history.push("/auth");
  };

  const otpSubmit = async (values, { setErrors, setSubmitting }) => {
    setSubmitting(true);
    setValidating(true);
    console.log("otp values", values);
    const code = values.code;

    window.confirmationResult = confirmationResult;
    confirmationResult
      .confirm(code)
      .then(async (result) => {
        console.log("result after successful otp confirm: ", result);
        await handlePhoneConfirm();
        setSubmitting(false);
        setValidating(false);
      })
      .catch((error) => {
        console.log("error on otp submit: ", error);
        if ((error.code = "auth/invalid-verification-code")) {
          console.log("error code", error.code);
        } else {
          console.log("Something went wrong, Please check your connection");
        }
        setSubmitting(false);
        setValidating(false);
      });
  };

  const sendOTP = async (values, { setErrors, setSubmitting }) => {
    recaptcha();
    const phone_number = `+${values.phone_number.replace(
      /[*?^+${}()]|[-]|[ ]/g,
      ""
    )}`;
    setPhoneValues({ phone_number: phone_number, email: values.email });
    console.log("phone on sendotp", phone_number);
    try {
      console.log("trying to send number");
      const appVerifier = window.recaptchaVerifier;
      firebase
        .auth()
        .signInWithPhoneNumber(phone_number, appVerifier)
        .then(async (confirmationResult) => {
          setConfirmationResult(confirmationResult);
          console.log("confirmation result", confirmationResult);
          setVerifyOTP(true);
        });
    } catch (err) {
      console.log("not trying otp");
      console.log(err);
    }
  };
  return (
    <Wrapper>
      <Container>
        {verifyOTP ? (
          <>
            <Heading>Verify Phone Number</Heading>
            <SubHeading>Check your phone for the sent code</SubHeading>
            <Formik
              initialValues={otpInitialValues}
              validationSchema={otpValidationSchema}
              onSubmit={otpSubmit}
            >
              {(formik) => {
                return (
                  <Form>
                    <FormikControl
                      control="input"
                      type="code"
                      label="Confirmation Code"
                      name="code"
                    />
                    <Button
                      type="submit"
                      disabled={!formik.isValid && validating}
                      fullwidth
                      title={validating ? "Verifying Number... " : "Verify"}
                      style={{ color: "#ffffff" }}
                    />
                    <Offer style={{ padding: "20px 0" }}></Offer>
                    <div id="recaptcha-container" ref={captchaRef} />
                  </Form>
                );
              }}
            </Formik>
          </>
        ) : (
          <>
            <SubHeading>Enter your phone and email to confirm</SubHeading>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={sendOTP}
            >
              {(formik) => {
                return (
                  <Form>
                    <FormikControl
                      control="input"
                      type="phone"
                      label="Phone Number"
                      name="phone_number"
                    />
                    <FormikControl
                      control="input"
                      type="email"
                      label="Email"
                      name="email"
                    />
                    <Button
                      type="submit"
                      disabled={!formik.isValid && validating}
                      fullwidth
                      title={validating ? "Verifying... " : "Verify"}
                      style={{ color: "#ffffff" }}
                    />
                    <br />

                    <div id="recaptcha-container" ref={captchaRef} />
                    <Offer style={{ padding: "20px 0" }}>
                      Back to
                      <LinkButton onClick={toggleSignInForm}>Login</LinkButton>
                    </Offer>
                  </Form>
                );
              }}
            </Formik>
          </>
        )}
      </Container>
    </Wrapper>
  );
}
