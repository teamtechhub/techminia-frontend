import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Blank, Wrapper, Title, Header } from "./styles";
import { Link } from "components/Link";
import { H5 } from "components/H5";
import { Button } from "components/Button";
import FormikControl from "../FormikContainer/FormikControl";
import { useMutation } from "@apollo/react-hooks";
import { SEND_PASSWORD_RESET_EMAIL } from "./mutations";
import { normalizeErrors } from "utils";
import Loader from "components/Loader";

function PasswordResetEmail() {
  const [reset, setReset] = useState();
  const [sendResetLink] = useMutation(SEND_PASSWORD_RESET_EMAIL);

  const emailNotLongEnough = "email must be at least 3 characters";
  const emailRequired = "Please enter an email address";
  const invalidEmail = "email must be a valid email";
  const getToken = () => {
    const pureJSON = localStorage.getItem("darasa_auth_profile");
    const accessToken = JSON.parse(pureJSON);
    if (accessToken === null || accessToken === undefined) {
      return false;
    } else {
      return accessToken.email;
    }
  };
  const initialValues = {
    email: !getToken() ? "" : getToken(),
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .min(3, emailNotLongEnough)
      .max(100)
      .email(invalidEmail)
      .required(emailRequired),
  });

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const { data, loading, errors } = await sendResetLink({
        variables: values,
      });

      // console.log("data: ", data, "loading : ", loading, "errors : ", errors);
      if (loading) return <p>Loading ...</p>;
      if (errors) {
        console.log(errors);
        console.log("errors from function:", errors.message);
        return errors;
      }
      if (data) {
        if (data.sendPasswordResetEmail.success) {
          setReset("Email Sent Successfully ✔");
          setSubmitting(false);
        } else {
          setReset(null);
          setErrors(normalizeErrors(data.sendPasswordResetEmail.errors));
          setSubmitting(false);
        }
      }
      return null;
    } catch (error) {
      console.log("catch errors: ", JSON.stringify(error));
    }
  };

  return (
    <>
      <Title>
        <H5>
          <Link to="/">{"<"} Home</Link>
        </H5>
      </Title>
      <Wrapper>
        <Header>
          <h1>Reset Password</h1>
          <h3
            style={{
              color:
                reset === undefined || reset === "Email Sent Successfully ✔"
                  ? "green"
                  : "red",
            }}
          >
            {reset === undefined ? null : (
              <>
                <>{reset}</>
                <h4> Check your email for the link</h4>
              </>
            )}
          </h3>
          <h5>Enter your email to receive a password-reset link</h5>
        </Header>
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
                  type="email"
                  label="Email"
                  name="email"
                />

                <Blank />
                <Button type="submit" disabled={!formik.isValid}>
                  {formik.isSubmitting ? <Loader /> : "Send Email"}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Wrapper>
    </>
  );
}

export default PasswordResetEmail;
