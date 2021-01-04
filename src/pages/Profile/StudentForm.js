/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
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

export default function StudentForm(profile, handleModal) {
  const [initialStudentValues, setInitialStudentValues] = useState();
  const [editting, setEditting] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const studentValidationSchema = Yup.object({
    grade_level: Yup.string().required("Required"),
    student_id: Yup.string().required("Required"),
  });
  const gradeLevelOptions = [
    { value: "", key: "Select Options" },
    { value: 1, key: "1" },
    { value: 2, key: "2" },
    { value: 3, key: "3" },
    { value: 4, key: "4" },
    { value: 5, key: "5" },
    { value: 6, key: "6" },
    { value: 7, key: "7" },
    { value: 8, key: "8" },
    { value: 9, key: "9" },
    { value: 10, key: "10" },
    { value: 11, key: "11" },
    { value: 12, key: "12" },
  ];
  useEffect(() => {
    if (localStorage.getItem("darasa_student_profile")) {
      setInitialStudentValues(
        JSON.parse(localStorage.getItem("darasa_student_profile"))
      );
      console.log(
        "student initial values",
        JSON.parse(localStorage.getItem("darasa_student_profile"))
      );
      setEditting(true);
    } else {
      setInitialStudentValues({
        hobby: [],
        grade_level: "",
        student_id: "",
        user: profile.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onStudentAddSubmit = (values, { setErrors, setSubmitting }) => {
    setSubmitting(true);
    setLoading(true);
    try {
      axiosInstance
        .post(`/students/`, values)
        .then((res) => {
          setSubmitting(false);
          console.log("res", res.data);
          handleModal("Profile Created Successfully ✔", "");
          addObjectToLocalStorageObject("darasa_student_profile", res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("res errors", err.response.data);
          if (err.response) {
            if (err.response.data.user) {
              if (err.response.data.user[0] === "This field must be unique.") {
                handleModal(
                  "You Already registered a company under your account",
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
    } catch (error) {
      setError(error);
    }
  };
  const onStudentChangeSubmit = async (
    values,
    { setErrors, setSubmitting }
  ) => {
    setSubmitting(true);
    try {
      axiosInstance
        .patch(`/students/profile/`, values)
        .then((res) => {
          setSubmitting(false);
          console.log("res", res.data);
          handleModal("Profile Updated Successfully ✔", "");
          addObjectToLocalStorageObject("darasa_student_profile", res.data);
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
        });
    } catch (error) {
      setError(error);
    }
  };
  if (error) {
    return <Error500 err={error} />;
  }

  return (
    <div>
      <Formik
        initialValues={initialStudentValues}
        validationSchema={studentValidationSchema}
        onSubmit={editting ? onStudentChangeSubmit : onStudentAddSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <FormikControl
                control="select"
                label="Grade Level"
                name="grade_level"
                options={gradeLevelOptions}
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
                isLoading={loading}
                title={formik.isSubmitting ? "Creating Profile... " : "Done"}
                style={{ fontSize: 15, color: "#fff" }}
                disabled={!formik.isValid}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
