import { closeModal } from "@redq/reuse-modal";
import // Facebook,

// Google
"components/AllSvgIcon";
import Error500 from "components/Error/Error500";
import Loader from "components/Loader/Loader";
import { TERMS_CONDITIONS } from "constants/routes.constants";
import FormikControl from "containers/FormikContainer/FormikControl";
import { AuthContext } from "contexts/auth/auth.context";
import firebase from "firebase/app";
import "firebase/auth";
import { Form, Formik } from "formik";
import StudentForm from "pages/Profile/StudentForm";
import TeacherForm from "pages/Profile/TeacherForm";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  addArrayToLocalStorage,
  addObjectToLocalStorageObject,
  parseJwt,
} from "utils";
import { axiosInstance } from "utils/axios";
import * as Yup from "yup";
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

export default function SignOutModal() {
  const { state, authDispatch } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [verifyOTP, setVerifyOTP] = useState(false);
  const [otp, setOtp] = useState(false);
  const [loginValues, setLoginValues] = useState({});
  const [phoneValues, setPhoneValues] = useState({});
  const [validating, setValidating] = useState(Boolean());
  const [confirmationResult, setConfirmationResult] = useState({});
  const [isTeacher, setIsTeacher] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [userForm, setUserForm] = useState(false);
  const history = useHistory();
  const captchaRef = React.useRef(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (redirect) {
      authDispatch({
        type: "EMAILCONFIRM",
      });
      authDispatch({
        type: "SIGNUP_SUCCESS",
      });
      history.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirect]);

  const handleRedirect = () => {
    setRedirect(!redirect);
  };

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
    email: "",
    password: "",
    password_confirm: "",
    phone_number: "",
    gender: "",
    surname: "",
    other_names: "",
    is_student: "",
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
    is_student: Yup.bool()
      .required("Select User Type.")
      .oneOf([true, false], "Select an Option"),
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
        handleLogin();

        await new Promise((resolve) => setTimeout(resolve, 3000));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleLogin = () => {
    console.log("login values", loginValues);
    axiosInstance
      .post(`/auth/login/`, loginValues)
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
        addObjectToLocalStorageObject("darasa_auth_payload", payload);

        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", res.data.token.access);
          localStorage.setItem("refresh_token", res.data.token.refresh);

          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("response", res);
      })
      .catch((err) => {
        console.log(err.response);
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
        setSubmitting(false);
        setValidating(false);
        setUserForm(true);
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

  const onSubmit = async (values, { props, setErrors, setSubmitting }) => {
    setSubmitting(true);
    setValidating(true);
    recaptcha();

    const body = values;
    body["is_teacher"] =
      body.is_student === "true" || body.is_student === true ? false : true;
    body["is_student"] = !body.is_teacher;
    body["phone_number"] = `+${body.phone_number}`;

    setLoginValues({ login: body.phone_number, password: body.password });
    setPhoneValues({ phone_number: body.phone_number, email: body.email });

    axiosInstance
      .post(`/auth/register/`, body)
      .then(async (res) => {
        console.log("data received", res);
        if (res.data.is_teacher) {
          setIsTeacher(true);
        }
        if (res.data.is_student) {
          setIsStudent(true);
        }
        setUserProfile(res.data);

        authDispatch({
          type: "REGUPDATE",
          payload: {
            ...state,
            profile: res.data,
          },
        });

        await setOtp(true);
        await sendOTP(values.phone_number);

        console.log("response", res);
        setValidating(false);
        setSubmitting(false);
      })
      .catch((err) => {
        if (err.response) {
          setErrors(err.response.data);
          console.log(err.response.data);
        } else {
          setError(err);
        }
        console.log(JSON.stringify(err, null, 4));
        setLoading(false);
        setValidating(false);
        setSubmitting(false);
      });
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
              <Loader />
            ) : (
              <>
                <SubHeading>Every fill is required in sign up</SubHeading>
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
                        {/* <span>Teacher</span>
                        <FormikControl
                          style={{
                            ".toggle-switch": { width: "100px" },
                            ".toggle-switch-switch": {
                              right: "75px",
                            },
                          }}
                          options={["T", "S"]}
                          control="toggle"
                          name="is_student"
                        />
                        <span>Student</span> */}

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
                          type="email"
                          label="Email"
                          name="email"
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
                          label="Password"
                          name="password"
                        />
                        <FormikControl
                          control="input"
                          type="password"
                          label="Confirm Password"
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
        {userForm && (
          <>
            {isTeacher && (
              <TeacherForm
                profile={userProfile}
                handleRedirect={handleRedirect}
              />
            )}
            {isStudent && (
              <StudentForm
                profile={userProfile}
                handleRedirect={handleRedirect}
              />
            )}
          </>
        )}
      </Container>
    </Wrapper>
  );
}
