/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  Heading,
  SubHeading,
  Wrapper,
} from "./SignInOutForm.style";
import FormikControl from "containers/FormikContainer/FormikControl";
import { useTimer } from "utils";
import { axiosInstance } from "utils/axios";
import { useAlert } from "react-alert";
import { AuthContext } from "contexts/auth/auth.context";

function PasswordReset() {
  const location = useLocation();
  const history = useHistory();
  const [reset, setReset] = useState();
  const [count, SetCount] = useState(10);
  const counter = useTimer(count);

  // if (count) {
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   useCallback(() => counter(count), [count]);
  // }

  const [params, setParams] = useState({});
  const { authDispatch } = useContext(AuthContext);
  const alert = useAlert();
  console.log("reset", reset);

  const passwordNotLongEnough = "password must be at least 8 characters";
  const passwordDoNotMatch = "passwords must match";
  const fieldRequired = "This field is required";
  const query = new URLSearchParams(location.search);

  useEffect(() => {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues = {
    password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, passwordNotLongEnough)
      .max(100)
      .required(fieldRequired),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], passwordDoNotMatch)
      .required(fieldRequired),
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const handleCounter = useCallback(() => counter(count), [count]);

  const toggleSignInForm = () => {
    authDispatch({
      type: "SIGNIN",
    });
    history.push(`/auth`);
  };

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("the values hapa: ", values);
    try {
      axiosInstance
        .post(`/auth/reset-password/`, { password: values.password, ...params })
        .then(async (res) => {
          console.log("email verification data", res.data);
          setReset("Password Reset Successfully ✔");
          alert.success("Password Reset Successfully ✔");

          setSubmitting(false);
          await SetCount(5);
          await new Promise((resolve) => setTimeout(resolve, 1000));

          toggleSignInForm();
        })
        .catch((err) => {
          setReset(null);
          setErrors(err.response.data);
          console.log("error", err);
          setSubmitting(false);
        });
    } catch (error) {
      console.log("catch error", error);
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        marginTop: "60px",
      }}
    >
      <Wrapper
        style={{
          maxWidth: "500px",
          position: "relative",
        }}
      >
        <Container>
          <Heading>Reset Password</Heading>
          <SubHeading
            style={{
              color:
                reset === undefined || reset === "Password Reset Successfully ✔"
                  ? "green"
                  : "red",
            }}
          >
            {reset === undefined ? null : (
              <>
                <>{reset}</>
                <h5>redirecting {counter}...</h5>
              </>
            )}
          </SubHeading>

          <h5>Input the new password</h5>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <FormikControl
                    control="input"
                    type="password"
                    label="New Password"
                    name="password"
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    label="Confirm New Password"
                    name="confirm_password"
                  />
                  <Button
                    type="submit"
                    disabled={!formik.isValid && formik.isSubmitting}
                    fullwidth
                    title={
                      formik.isSubmitting ? "Resetting ..." : "Reset Password"
                    }
                    style={{ color: "#ffffff", maxWidth: "400px" }}
                  />
                </Form>
              );
            }}
          </Formik>
        </Container>
      </Wrapper>
    </div>
  );
}

export default PasswordReset;
