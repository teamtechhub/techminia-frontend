/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import FormikControl from "containers/FormikContainer/FormikControl";
import {
  axiosInstance,
  // tokenConfig,
} from "utils/axios";
import { addObjectToLocalStorageObject } from "utils";
import Button from "components/Button/Button";
import { Br } from "styles/pages.style";
import Error500 from "components/Error/Error500";
import { tokenConfig } from "utils/axios";
import { AuthContext } from "contexts/auth/auth.context";
import { useAlert } from "react-alert";

export default function StudentForm({ profile, handleRedirect }) {
  const { authState, authDispatch } = useContext(AuthContext);
  const [initialStudentValues, setInitialStudentValues] = useState({});
  const [editting, setEditting] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const alert = useAlert();

  useEffect(() => {
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
    if (authState.extendedProfile.length > 0) {
      console.log("happening");
      setInitialStudentValues(authState.extendedProfile);

      console.log(authState.extendedProfile);
      setEditting(true);
    } else {
      console.log("not happening");
      setInitialStudentValues({
        hobbies: [],
        class_level: "",
        student_id: "",
        user: profile.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const studentValidationSchema = Yup.object({
    class_level: Yup.string().required("Required"),
    student_id: Yup.string().required("Required"),
  });

  const onStudentAddSubmit = (values, { setErrors, setSubmitting }) => {
    setSubmitting(true);
    setLoading(true);
    values["user"] = localStorage.getItem("darasa_auth_profile")
      ? profile.id
      : "";
    axiosInstance
      .post(`/account/students/`, values, tokenConfig())
      .then((res) => {
        console.log("res", res.data);
        setInitialStudentValues(res.data);
        alert.success("Profile Created Successfully ✔", "");
        addObjectToLocalStorageObject("darasa_student_profile", res.data);
        setSubmitting(false);
        setLoading(false);
        handleRedirect();
      })
      .catch((err) => {
        console.log("res errors", err.response.data);
        if (err.response) {
          if (err.response.data.user) {
            if (err.response.data.user[0] === "This field must be unique.") {
              alert.info(
                "You Already registered a Student under your account",
                `(Only one student can be registered under an account)`
              );
            } else {
              setErrors(err.response.data);
            }
          }
          setErrors(err.response.data);
        } else {
          setError(err);
        }
        console.log(err.response.data);
        setSubmitting(false);
        setLoading(false);
      });
  };
  const onStudentChangeSubmit = async (
    values,
    { setErrors, setSubmitting }
  ) => {
    setSubmitting(true);
    setLoading(true);
    axiosInstance
      .patch(`/account/students/profile/`, values, tokenConfig())
      .then((res) => {
        setSubmitting(false);
        setLoading(false);
        console.log("res", res.data);
        alert.success("Profile Updated Successfully ✔", "");
        addObjectToLocalStorageObject("darasa_student_profile", res.data);
        authDispatch({
          type: "UPDATE",
          payload: {
            ...authState,
            profile: { ...authState.profile, extendedProfile: res.data },
          },
        });
      })
      .catch((err) => {
        if (err.response) {
          setErrors(err.response.data);
          console.log("errors za data");
        } else {
          setError(err);
          console.log("errors general");
        }
        console.log(err.response.data);
        setSubmitting(false);
        setLoading(false);
      });
  };
  if (error) {
    return <Error500 err={error} />;
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialStudentValues}
      validationSchema={studentValidationSchema}
      onSubmit={editting ? onStudentChangeSubmit : onStudentAddSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              control="select"
              label="Your Class"
              name="class_level"
              options={classes}
            />
            <FormikControl
              control="input"
              type="text"
              label="NEMIS Number"
              name="student_id"
            />
            <Br />
            <Br />
            <Button
              type="submit"
              size="small"
              // isLoading={formik.isSubmitting}
              isLoading={loading}
              title={formik.isSubmitting ? "Creating Profile... " : "Done"}
              style={{ fontSize: 15, color: "#fff" }}
              disabled={!formik.isValid}
            />
          </Form>
        );
      }}
    </Formik>
  );
}
