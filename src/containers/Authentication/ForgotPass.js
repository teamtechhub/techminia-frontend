import React, { useContext, useState } from "react";
import FormikControl from "containers/FormikContainer/FormikControl";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Wrapper,
  Container,
  Heading,
  SubHeading,
  Button,
  LinkButton,
  Offer,
} from "./SignInOutForm.style";
import { AuthContext } from "contexts/auth/auth.context";
import { axiosInstance } from "utils/axios";
import { logToConsole } from "utils/logging";

import { useAlert } from "react-alert";

export default function ForgotPassModal() {
  const { authDispatch } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const alert = useAlert();

  const emailNotLongEnough = "email must be at least 3 characters";
  const emailRequired = "Please enter an email address";
  const invalidEmail = "email must be a valid email";
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .min(3, emailNotLongEnough)
      .max(100)
      .email(invalidEmail)
      .required(emailRequired),
  });
  const submitApplication = (values, { setErrors, setSubmitting }) => {
    setSubmitting(true);
    const { email } = values;
    const body = {
      login: email,
      ga: false,
    };
    try {
      axiosInstance
        .post(`/auth/send-reset-password-link/`, body)
        .then((res) => {
          logToConsole("email verification data", res.data);
          alert.success("Email Sent ✔");
          setSuccess(true);
          setSubmitting(false);
        })
        .catch((err) => {
          logToConsole("error", err.response);
          alert.error(err.response.data.detail);

          setSubmitting(false);
        });
    } catch (error) {
      logToConsole("catch error", error);
      setSubmitting(false);
    }
  };
  const toggleSignInForm = () => {
    authDispatch({
      type: "SIGNIN",
    });
  };
  return (
    <Wrapper>
      <Container style={{ paddingBottom: 30 }}>
        {!success ? (
          <>
            <Heading>Forgot Password</Heading>

            <SubHeading>
              We'll send you a link to reset your password"
            </SubHeading>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={submitApplication}
            >
              {(formik) => {
                return (
                  <Form>
                    <FormikControl
                      control="input"
                      type="email"
                      label="Email Address"
                      name="email"
                    />

                    <Button
                      type="submit"
                      size="small"
                      title={formik.isSubmitting ? "Sending... " : "Send"}
                      style={{ fontSize: 15, color: "#fff" }}
                      disabled={!formik.isValid}
                    />
                  </Form>
                );
              }}
            </Formik>
          </>
        ) : (
          <>
            <Heading>Email Sent ✔</Heading>
            <SubHeading>Check your email to confirm</SubHeading>
          </>
        )}
        <Offer style={{ padding: "20px 0 0" }}>
          Back to" <LinkButton onClick={toggleSignInForm}>Login</LinkButton>
        </Offer>
      </Container>
    </Wrapper>
  );
}
