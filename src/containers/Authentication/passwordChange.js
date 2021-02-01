import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Container, SubHeading, Wrapper } from "./SignInOutForm.style";
import FormikControl from "../FormikContainer/FormikControl";
import { axiosInstance } from "utils/axios";

function PasswordChange() {
  const [reset, setReset] = useState();
  const passwordNotLongEnough = "password must be at least 8 characters";
  const passwordDoNotMatch = "passwords must match";
  const fieldRequired = "This field is required";

  const initialValues = {
    old_password: "",
    password: "",
    password_confirm: "",
  };

  const validationSchema = Yup.object({
    old_password: Yup.string()
      .min(8, passwordNotLongEnough)
      .max(100)
      .required(fieldRequired),
    password: Yup.string()
      .min(8, passwordNotLongEnough)
      .max(100)
      .required(fieldRequired),
    password_confirm: Yup.string()
      .oneOf([Yup.ref("password"), null], passwordDoNotMatch)
      .required(fieldRequired),
  });

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("the values hapa: ", values);
    try {
      axiosInstance
        .post(`/auth/change-password/`, values)
        .then(async (res) => {
          console.log("email verification data", res.data);
          setReset("Password Changed Successfully ✔");
          alert.success("Password Changed Successfully ✔");

          setSubmitting(false);
          await new Promise((resolve) => setTimeout(resolve, 1000));
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
    <Wrapper
      style={{
        maxWidth: "500px",
        position: "relative",
      }}
    >
      <Container>
        <SubHeading
          style={{
            color:
              reset === undefined || reset === "Password Changed Successfully ✔"
                ? "green"
                : "red",
          }}
        >
          {reset === undefined ? (
            <h6 style={{ color: "red" }}>
              Warning! Careful When Changing Password
            </h6>
          ) : (
            reset
          )}
        </SubHeading>

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
                  label="Old Password"
                  name="old_password"
                />
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
                  name="password_confirm"
                />

                <Button
                  type="submit"
                  disabled={!formik.isValid && formik.isSubmitting}
                  isSubmitting={formik.isSubmitting}
                  fullwidth
                  title={
                    formik.isSubmitting ? "Changing ..." : "Change Password"
                  }
                  style={{ color: "#ffffff", maxWidth: "400px" }}
                />
              </Form>
            );
          }}
        </Formik>
      </Container>
    </Wrapper>
  );
}

export default PasswordChange;
