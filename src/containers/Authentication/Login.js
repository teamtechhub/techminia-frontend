import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Blank, Wrapper, Break, NewP, Title, Header } from "./styles";
import { Link } from "components/Link";
import { H5 } from "components/H5";
import { Button, InvertedButton } from "components/Button";
import FormikControl from "containers/FormikContainer/FormikControl";
import {
  unhashPassword,
  addObjectToLocalStorageObject,
  addToLocalStorageArray,
  normalizeErrors,
} from "utils";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_MUTATION } from "./mutations";

function LoginForm() {
  const emailNotLongEnough = "email must be at least 3 characters";
  const emailRequired = "Please enter an email address";
  const invalidEmail = "email must be a valid email";
  const passwordNotLongEnough = "password must be at least 3 characters";
  const fieldRequired = "This field is required";
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const location = useLocation();
  const [setLoginAuth] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    if (localStorage.getItem("darasa_auth_profile") !== null) {
      setInitialValues({
        email: JSON.parse(localStorage.getItem("darasa_auth_profile")).email,
        password: unhashPassword(),
      });
    }
  }, []);

  const fetchData = async (loginDetails) => {
    const { loading, data, errors } = await setLoginAuth({
      variables: loginDetails,
    });
    if (loading) return loading;
    if (errors) {
      console.log("Server Error kwa login", errors[0].message);
      return errors[0].message;
    }
    if (data) {
      if (data.tokenAuth.success) {
        var roles;
        if (!data.tokenAuth.user.isAdmin) {
          roles = "admin";
        }
        addToLocalStorageArray("darasa_auth_roles", roles);
        var payload = data.tokenAuth.payload;
        let extraPayloadData = {
          refreshToken: data.tokenAuth.refreshToken,
          refreshExpiresIn: data.tokenAuth.refreshExpiresIn,
          token: data.tokenAuth.token,
        };
        payload = { ...payload, ...extraPayloadData };
        addObjectToLocalStorageObject("darasa_auth_payload", payload);
        var profile = data.tokenAuth.user;
        delete profile.__typename;
        addObjectToLocalStorageObject("darasa_auth_profile", profile);
        if (location.state !== undefined) {
          history.push(location.state.referrer);
        } else {
          history.push("/app");
        }
      } else {
        normalizeErrors(data.tokenAuth.errors);
        return normalizeErrors(data.tokenAuth.errors);
      }
    }
    return { loading, data, errors };
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .min(3, emailNotLongEnough)
      .max(100)
      .email(invalidEmail)
      .required(emailRequired),

    password: Yup.string()
      .min(8, passwordNotLongEnough)
      .max(100)
      .required(fieldRequired),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      // call the login function
      // setLogin(true);
      // setLoginDetails(values);
      try {
        fetchData(values);
      } catch (error) {
        console.log("Catching Errors:", error);
      }
      var payload = {
        username: "hihihfisfihi",
        exp: 1591028890,
        origIat: 1591028590,
        user_id: "VXNlcjo3Mg==",
        is_staff: false,
        is_superuser: false,
      };
      let email = { email: values.email, secret: values.password };
      payload = { ...payload, ...email };
      addObjectToLocalStorageObject("darasa_auth_payload", payload);
    }, 500);
    setSubmitting(false);
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
          <h1>Welcome back</h1>
        </Header>
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
                  type="email"
                  label="Email"
                  name="email"
                />
                <FormikControl
                  control="input"
                  type="password"
                  label="Password"
                  name="password"
                />
                <Link to="/password-reset">
                  <NewP>Forgot Password</NewP>
                </Link>
                <Blank />
                <Button type="submit" disabled={!formik.isValid}>
                  Login
                </Button>

                <Break>
                  <hr />
                  ---------------------- or ----------------------
                  <hr />
                </Break>
                <Link to="/signup">
                  <InvertedButton>Sign Up</InvertedButton>
                </Link>
              </Form>
            );
          }}
        </Formik>
      </Wrapper>
    </>
  );
}
export default LoginForm;
