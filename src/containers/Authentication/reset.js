import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
import { logToConsole } from "utils/logging";

function PasswordReset() {
  const location = useLocation();
  const [reset, setReset] = useState();
  const [count, SetCount] = useState(5);
  const counter = useTimer(count);
  const [params, setParams] = useState({});
  const { authDispatch } = useContext(AuthContext);
  const alert = useAlert();

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

  const toggleSignInForm = () => {
    authDispatch({
      type: "SIGNIN",
    });
  };

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    logToConsole("the values hapa: ", values);
    try {
      axiosInstance
        .post(`/auth/reset-password/`, { password: values.password, ...params })
        .then(async (res) => {
          logToConsole("email verification data", res.data);
          setReset("Password Changed Successfully ✔");
          alert.success("Password Changed Successfully ✔");
          setSubmitting(false);
          await SetCount(5);
          await new Promise((resolve) => setTimeout(resolve, 1000 * count));

          toggleSignInForm();
        })
        .catch((err) => {
          setReset(null);
          setErrors(err.response.data);
          logToConsole("error", err);
          setSubmitting(false);
        });
    } catch (error) {
      logToConsole("catch error", error);
      setSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <Container>
        <Heading>Reset Password</Heading>
        <SubHeading
          style={{
            color:
              reset === undefined || reset === "Password Changed Successfully ✔"
                ? "green"
                : "red",
          }}
        >
          {reset ? null : (
            <>
              <>{reset}</>
              <h5>redirecting in {counter}...</h5>
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
                  style={{ color: "#ffffff" }}
                />
              </Form>
            );
          }}
        </Formik>
      </Container>
    </Wrapper>
  );
}

export default PasswordReset;
