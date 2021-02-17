import { closeModal } from "@redq/reuse-modal";

import Error500 from "components/Error/Error500";
import LoadingIndicator from "components/LoadingIndicator";
import { TERMS_CONDITIONS } from "constants/routes.constants";
import FormikControl from "containers/FormikContainer/FormikControl";
import { AuthContext } from "contexts/auth/auth.context";
import firebase from "firebase/app";
import "firebase/auth";
import { Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { addArrayToLocalStorage } from "utils";
import { addObjectToLocalStorageObject } from "utils";
import { tokenConfig } from "utils/axios";
import { axiosInstance } from "utils/axios";
import * as Yup from "yup";
import StudentForm from "pages/Profile/StudentForm";
import TeacherForm from "pages/Profile/TeacherForm";
import {
  Button,
  Container,
  Heading,
  HelperText,
  // Divider,
  LinkButton,
  Offer,
  SubHeading,
  Wrapper,
} from "./SignInOutForm.style";

export default function CompleteGoogleLogin() {
  const history = useHistory();

  const captchaRef = React.useRef(null);

  const { state, authDispatch } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [verifyOTP, setVerifyOTP] = useState(false);
  const [otp, setOtp] = useState(false);
  const [phoneValues, setPhoneValues] = useState({});
  const [validating, setValidating] = useState(Boolean());
  const [confirmationResult, setConfirmationResult] = useState({});
  const [params, setParams] = useState({});
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState();
  const [isTeacher, setIsTeacher] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  // const [updateValues, setUpdateValues] = useState({});

  console.log("update", update);

  useEffect(() => {
    if (redirect) {
      authDispatch({
        type: "EMAILCONFIRM",
      });
      history.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirect]);

  const handleRedirect = () => {
    setRedirect(!redirect);
  };

  useEffect(() => {
    setName(localStorage.getItem("darasa_name"));
    const email = localStorage.getItem("darasa_email");
    axiosInstance
      .post(`/auth/send-reset-password-link/`, { ga: true, login: email })
      .then(async (res) => {
        console.log("google email reset", res);
        const url = new URL(res.data.detail);
        const query = new URLSearchParams(url.search);
        if (
          query.get("user_id") &&
          query.get("timestamp") &&
          query.get("signature")
        ) {
          setParams({
            user_id: query.get("user_id"),
            timestamp: query.get("timestamp"),
            signature: query.get("signature"),
          });

          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

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
  const nameNotLongEnough = "user's name must be at least 4 characters";
  const passwordNotLongEnough = "password must be at least 8 characters";
  const passwordDoNotMatch = "passwords must match";
  const fieldRequired = "This field is required";

  const initialValues = {
    email: localStorage.getItem("darasa_email"),
    password: "",
    password_confirm: "",
    phone_number: "",
    gender: "",
    surname: "",
    other_names: "",
    is_student: Boolean(),
  };
  const otpInitialValues = {
    code: "",
  };
  const options = [
    { key: "Student", value: true },
    { key: "Teacher", value: false },
  ];
  const genderOptions = [
    { value: "", key: "Select Gender" },
    { value: "Male", key: "Male" },
    { value: "Female", key: "Female" },
  ];
  const otpValidationSchema = Yup.object().shape({
    code: Yup.number().min(6, "code is too short").required(fieldRequired),
  });

  const validationSchema = Yup.object().shape({
    is_student: Yup.bool().oneOf([true], "Select an Option"),
    email: Yup.string()
      .min(3, emailNotLongEnough)
      .max(100)
      .email(invalidEmail)
      .required(emailRequired),
    other_names: Yup.string()
      .min(4, nameNotLongEnough)
      .max(100)
      .required(fieldRequired),
    phone_number: Yup.string()
      .min(12, "Must have 12 numbers")
      .required(fieldRequired),
    password: Yup.string()
      .min(8, passwordNotLongEnough)
      .matches(/^.*[a-zA-Z].*$/, "Must Contain One Letter")
      .matches(/^.*\d.*$/, "Must Contain One Number")
      .max(100)
      .required(fieldRequired),
    password_confirm: Yup.string()
      .oneOf([Yup.ref("password"), null], passwordDoNotMatch)
      .required(fieldRequired),
  });

  const toggleSignInForm = () => {
    authDispatch({
      type: "SIGNIN",
    });
  };

  const handlePhoneConfirm = () => {
    console.log("login values", phoneValues);
    axiosInstance
      .post(`/auth/verify-phone/`, phoneValues)
      .then(async (res) => {
        console.log("phone confirm res", res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleResetPassword = (password, phone_number) => {
    const body = { password: password, ...params };
    console.log("pass reset values", body);
    axiosInstance
      .post(`/auth/reset-password/`, body, tokenConfig())
      .then(async (res) => {
        console.log("reset password res", res);
        if (res.status === 200) {
          await setOtp(true);
          await sendOTP(phone_number);
          return true;
        }
      })
      .catch((err) => {
        console.log(err.response);
        return false;
      });
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
        setUpdate(true);
        setSubmitting(false);
        setValidating(false);
      })
      .catch((error) => {
        console.log("error on otp submit: ", error);
        if (error.code === "auth/code-expired") {
          console.log("used up code", error.message);
        }
        if ((error.code = "auth/invalid-verification-code")) {
          console.log("error code", error.code);
        } else {
          console.log("Something went wrong, Please check your connection");
        }
        setSubmitting(false);
        setValidating(false);
      });
  };
  // const handleProfileUpdate = (body) => {};

  const onSubmit = async (values, { props, setErrors, setSubmitting }) => {
    setSubmitting(true);
    setValidating(true);
    recaptcha();

    const body = values;
    body["is_teacher"] =
      body.is_student === "true" || body.is_student === true ? false : true;
    body["is_student"] = !body.is_teacher;
    body["phone_number"] = `+${body.phone_number}`;

    await setPhoneValues({
      phone_number: body.phone_number,
      email: body.email,
    });
    const process = await handleResetPassword(
      body.password,
      values.phone_number
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (process) {
      await axiosInstance
        .patch(
          `/auth/profile/`,
          {
            surname: body.surname,
            other_names: body.other_names,
            is_student: body.is_student,
            is_teacher: body.is_teacher,
            phone_number: body.phone_number,
          },
          tokenConfig()
        )
        .then(async (res) => {
          console.log("data received", res);
          setUserProfile(res.data);
          const roles = [];
          if (res.data.is_student) {
            roles.push("student");
            setIsStudent(true);
            localStorage.removeItem("darasa_auth_roles");
            addArrayToLocalStorage("darasa_auth_roles", roles);
          }
          if (res.data.is_publisher) {
            roles.push("publisher");
            localStorage.removeItem("darasa_auth_roles");
            addArrayToLocalStorage("darasa_auth_roles", roles);
          }
          if (res.data.is_teacher) {
            setIsTeacher(true);
            roles.push("teacher");
            localStorage.removeItem("darasa_auth_roles");
            addArrayToLocalStorage("darasa_auth_roles", roles);
          }
          addObjectToLocalStorageObject("darasa_auth_profile", res.data);

          authDispatch({
            type: "REGUPDATE",
            payload: {
              ...state,
              profile: res.data,
            },
          });
          console.log("response", res);
          setSubmitting(false);
          setValidating(false);
          localStorage.removeItem("darasa_name");
          localStorage.removeItem("darasa_name");
          history.push("/dashboard");
        })
        .catch((err) => {
          setSubmitting(false);
          setValidating(false);
          if (err.response) {
            console.log(err.response.data);
          } else {
            setError(err);
          }
          console.log(JSON.stringify(err, null, 4));
          setLoading(false);
        });
    }

    if (otp) {
      console.log("otp is true");
    }

    return null;
  };
  const handleTOS = () => {
    closeModal();
    history.push(`${TERMS_CONDITIONS}`);
  };
  if (error) {
    return <Error500 err={error} />;
  }
  const sendOTP = async (phone_number) => {
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
          setValidating(false);
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
            {loading ? (
              <LoadingIndicator />
            ) : (
              <>
                <Heading>Google Auth Successful ✔</Heading>
                <p>{name ? `Hello ${name}` : null}</p>
                <SubHeading>Complete profile to enjoy Darasa</SubHeading>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {(formik) => {
                    return (
                      <Form>
                        <FormikControl
                          control="radio"
                          label="Register as:"
                          name="is_student"
                          options={options}
                        />

                        <FormikControl
                          control="input"
                          type="text"
                          label="Surname"
                          name="surname"
                        />
                        <FormikControl
                          control="input"
                          type="text"
                          label="Other Names"
                          name="other_names"
                        />
                        <FormikControl
                          control="input"
                          type="phone"
                          label="Phone Number"
                          name="phone_number"
                        />
                        <FormikControl
                          control="select"
                          name="gender"
                          options={genderOptions}
                        />
                        <FormikControl
                          control="input"
                          type="password"
                          label="Confirm Google Password"
                          name="password"
                        />
                        <FormikControl
                          control="input"
                          type="password"
                          label="confirm above Password"
                          name="password_confirm"
                        />

                        <HelperText style={{ padding: "20px 0 30px" }}>
                          By signing up, you agree to Darasa's{" "}
                          <strong
                            style={{ color: "#652e8d" }}
                            onClick={handleTOS}
                          >
                            Terms &amp; Condtions
                          </strong>
                        </HelperText>

                        <Button
                          type="submit"
                          disabled={!formik.isValid && validating}
                          fullwidth
                          title={
                            validating ? "Creating account... " : "Sign Up"
                          }
                          style={{ color: "#ffffff" }}
                        />
                        <div id="recaptcha-container" ref={captchaRef} />
                        <Offer style={{ padding: "20px 0" }}>
                          Already have an account?{" "}
                          <LinkButton onClick={toggleSignInForm}>
                            Login
                          </LinkButton>
                        </Offer>
                      </Form>
                    );
                  }}
                </Formik>
              </>
            )}
          </>
        )}
        {isTeacher && (
          <TeacherForm profile={userProfile} handleRedirect={handleRedirect} />
        )}
        {isStudent && (
          <StudentForm profile={userProfile} handleRedirect={handleRedirect} />
        )}
      </Container>
    </Wrapper>
  );
}
