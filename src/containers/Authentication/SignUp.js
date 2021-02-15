import Error500 from "components/Error/Error500";
import LoadingIndicator from "components/LoadingIndicator";
import { TERMS_CONDITIONS } from "constants/routes.constants";
import FormikControl from "containers/FormikContainer/FormikControl";
import StepWizard from "containers/Multistep/Multistep";
import { AuthContext } from "contexts/auth/auth.context";
import firebase from "firebase/app";
import "firebase/auth";
import { Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
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
import { signupValidationSchema } from "./validation.schema";
import signupImg from "images/signup.jpg";
import studentsignup from "images/studentsignup.jpg";
import { tokenConfig } from "utils/axios";

export default function SignOutModal() {
  const { authState, authDispatch } = useContext(AuthContext);
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
  const [switchTab, setSwitchTab] = useState(true);
  const [classes, setClasses] = useState([]);
  const [state, setState] = useState({
    isAnswer: false,
    transitions: {
      enterRight: `animated enterRight`,
      enterLeft: `animated enterLeft`,
      exitRight: `animated exitRight`,
      exitLeft: `animated exitLeft`,
      intro: `animated intro`,
    },
  });
  const setInstance = (SW) => {
    setState({
      ...state,
      SW,
    });
  };
  const { SW } = state;
  const match = useRouteMatch();
  const history = useHistory();
  const captchaRef = React.useRef(null);

  useEffect(() => {
    console.log(match.params.userType);
    setLoading(false);
    if (match.params.userType) {
      setSwitchTab(false);
      if (match.params.userType === "teacher") {
        setIsTeacher(true);
        setIsStudent(false);
      } else if (match.params.userType === "student") {
        axiosInstance.get(`/curriculum/class`).then((res) => {
          const all_classes = res.data.results.reduce((arr, val) => {
            arr.push({
              value: val.name,
              key: val.name,
            });
            return arr;
          }, []);
          setClasses([{ value: "", key: "Choose Class" }, ...all_classes]);
        });
        setIsTeacher(false);
        setIsStudent(true);
      }
    } else {
      setSwitchTab(true);
    }
  }, [match.params.userType]);

  // useEffect(() => {
  //   if (redirect) {
  //     authDispatch({
  //       type: "EMAILCONFIRM",
  //     });
  //     authDispatch({
  //       type: "SIGNUP_SUCCESS",
  //     });
  //     history.push("/dashboard");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [redirect]);

  // const handleRedirect = () => {
  //   setRedirect(!redirect);
  // };

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

  const fieldRequired = "This field is required";

  const initialValues = {
    email: "",
    password: "",
    password_confirm: "",
    phone_number: "",
    gender: "",
    surname: "",
    other_names: "",
    extended_user: isTeacher
      ? {
          document_id: "",
          tsc_id: "",
          honorofic_title: "",
        }
      : {
          // hobbies: [],
          class_level: "",
          student_id: "",
        },
  };
  const otpInitialValues = {
    code: "",
  };
  const honorificTitleOptions = [
    { value: "", key: "Select Title" },
    { value: "Mr", key: "Mr" },
    { value: "Mrs", key: "Mrs" },
    { value: "Ms", key: "Ms" },
    { value: "Dr", key: "Dr" },
  ];

  const genderOptions = [
    { value: "", key: "Select Gender" },
    { value: "Male", key: "Male" },
    { value: "Female", key: "Female" },
  ];
  const otpValidationSchema = Yup.object().shape({
    code: Yup.number().min(6, "code is too short").required(fieldRequired),
  });

  const toggleSignInForm = () => {
    setSwitchTab(true);
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
        // CHECK TOKEN & LOAD USER
        await axiosInstance
          .get(`/auth/profile/`, tokenConfig())
          .then(async (r) => {
            let auth_profile = r.data;
            addObjectToLocalStorageObject("darasa_auth_profile", auth_profile);
            alert.success("Redirecting ...");
            authDispatch({
              type: "UPDATE",
              payload: {
                ...state,
                profile: auth_profile,
              },
            });
            await new Promise((resolve) => setTimeout(resolve, 1000));
          });
        console.log("response", r);
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

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    setSubmitting(true);
    setValidating(true);
    recaptcha();

    const body = values;
    if (isTeacher) {
      body["is_teacher"] = true;
    } else if (isStudent) {
      body["is_student"] = true;
    }
    body["phone_number"] = `+${body.phone_number.replace(
      /[*?^+${}()]|[-]|[ ]/g,
      ""
    )}`;
    console.log(body);

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

        authDispatch({
          type: "REGUPDATE",
          payload: {
            ...authState,
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
      {switchTab ? (
        <div style={{ display: "block", margin: "5px" }}>
          <h5 style={{ color: "#f1592a" }}>
            Hey there, I'm <strong style={{ color: "#652e8d" }}>Arif</strong>
          </h5>
          <h6 style={{ color: "#f1592a" }}>here to help.</h6>

          <div>
            <img src={signupImg} alt="signup" />
          </div>
          <p>Select an option so I can get you started.</p>
          <div style={{ display: "flex", margin: "5px" }}>
            <Button
              style={{ margin: "15px", width: "100%" }}
              title={`Teacher`}
              onClick={() => history.push(`/auth/teacher`)}
            />
            <Button
              style={{ margin: "15px", width: "100%" }}
              title={`Student`}
              onClick={() => history.push(`/auth/student`)}
            />
          </div>
        </div>
      ) : (
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
                  <img
                    style={{ height: "100px", borderRadius: "50%" }}
                    src={studentsignup}
                    alt="tsignup"
                  />
                  {isStudent ? (
                    <p>Great! another mind eager to learn.</p>
                  ) : (
                    <p>Ready to help these kids learn ...</p>
                  )}
                  <SubHeading>Every fill is required in sign up</SubHeading>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={() => signupValidationSchema(isTeacher)}
                    onSubmit={onSubmit}
                  >
                    {(formik) => {
                      return (
                        <Form>
                          <div></div>
                          <StepWizard
                            isHashEnabled={true}
                            instance={setInstance}
                          >
                            <div name="user-profile">
                              {/* <FormikControl
                              control="radio"
                              label="Register as:"
                              name="is_student"
                              options={options}
                            /> */}
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
                              {SW && (
                                <>
                                  {SW.currentStep === SW.totalSteps ? null : (
                                    <Button
                                      style={{ float: "right" }}
                                      title={`Next >`}
                                      onClick={() => {
                                        SW.nextStep();
                                      }}
                                    />
                                  )}
                                </>
                              )}
                            </div>

                            <div
                              name={`${
                                isTeacher ? "Teacher" : "Student"
                              } profile`}
                            >
                              {SW && (
                                <>
                                  {SW.currentStep === SW.totalSteps ? (
                                    <HelperText
                                      type="button"
                                      style={{ padding: "20px 0 30px" }}
                                    >
                                      {formik.isValid ? null : (
                                        <strong style={{ color: "orange" }}>
                                          Check previous step. Form not valid
                                        </strong>
                                      )}
                                      <br />
                                      <strong
                                        style={{
                                          color: "#652e8d",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          SW.previousStep();
                                        }}
                                      >
                                        {"<< "}Edit your {match.params.userType}{" "}
                                        profile
                                      </strong>
                                    </HelperText>
                                  ) : null}
                                </>
                              )}

                              {isStudent && (
                                <>
                                  <FormikControl
                                    control="select"
                                    label="Class"
                                    name="extended_user.class_level"
                                    options={classes}
                                  />
                                  <FormikControl
                                    control="input"
                                    type="text"
                                    label="NEMIS Number"
                                    name="extended_user.student_id"
                                  />
                                </>
                              )}
                              {isTeacher && (
                                <>
                                  <FormikControl
                                    control="select"
                                    label="Honorific Title"
                                    name="extended_user.honorofic_title"
                                    options={honorificTitleOptions}
                                  />
                                  <FormikControl
                                    control="input"
                                    type="text"
                                    label="National Document ID"
                                    name="extended_user.document_id"
                                  />
                                  <FormikControl
                                    control="input"
                                    type="text"
                                    label="TSC Number"
                                    name="extended_user.tsc_id"
                                  />
                                </>
                              )}
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
                                  validating
                                    ? "Creating account... "
                                    : "Finish Sign Up"
                                }
                                style={{ color: "#ffffff" }}
                              />
                            </div>
                          </StepWizard>
                          <br />

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
        </Container>
      )}
    </Wrapper>
  );
}
