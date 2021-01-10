/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "containers/FormikContainer/FormikControl";
import { axiosInstance } from "utils/axios";
import { addObjectToLocalStorageObject } from "utils";
import Button from "components/Button/Button";
import { Br } from "styles/pages.style";
import Error500 from "components/Error/Error500";

export default function TeacherForm({ profile, handleModal }) {
  const [initialTeacherValues, setInitialTeacherValues] = useState();
  const [editting, setEditting] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const teacherValidationSchema = Yup.object({
    honorific_title: Yup.string().required("Required"),
    id_number: Yup.number()
      .max(2147483647, "Id Number too long")
      .min(10101010, "Id Number is invalid")
      .required("Required"),
    tsc_id: Yup.string().required("Required"),
  });
  const honorificTitleOptions = [
    { value: "", key: "Select Title" },
    { value: "Mr", key: "Mr" },
    { value: "Mrs", key: "Mrs" },
    { value: "Ms", key: "Ms" },
    { value: "Dr", key: "Dr" },
  ];

  useEffect(() => {
    if (localStorage.getItem("darasa_teacher_profile")) {
      setInitialTeacherValues(
        JSON.parse(localStorage.getItem("darasa_teacher_profile"))
      );
      console.log(
        "teacher initial values",
        JSON.parse(localStorage.getItem("darasa_teacher_profile"))
      );
      setEditting(true);
    } else {
      setInitialTeacherValues({
        national_id: "",
        tsc_id: "",
        honorofic_title: "",
        user: localStorage.getItem("darasa_auth_profile") ? profile.id : "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTeacherAddSubmit = async (values, { setErrors, setSubmitting }) => {
    setSubmitting(true);
    try {
      axiosInstance
        .post(`/teachers/`, values)
        .then((res) => {
          setSubmitting(false);
          console.log("res", res.data);
          handleModal("Profile Updated Successfully ✔", "");
          addObjectToLocalStorageObject("darasa_teacher_profile", res.data);
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
  const onTeacherChangeSubmit = (values, { setErrors, setSubmitting }) => {
    setSubmitting(true);
    setLoading(true);
    try {
      axiosInstance
        .patch(`/teachers/profile/`, values)
        .then((res) => {
          setSubmitting(false);
          console.log("res", res.data);
          handleModal("Profile Created Successfully ✔", "");
          addObjectToLocalStorageObject("darasa_teacher_profile", res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("res errors", err.response.data);
          if (err.response) {
            if (err.response.data.user) {
              if (err.response.data.user[0] === "This field must be unique.") {
                handleModal(
                  "You Already registered a company under your account",
                  `(Only one teacher can be registered under an account)`
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
  if (error) {
    return <Error500 err={error} />;
  }
  return (
    <div>
      <Formik
        initialValues={initialTeacherValues}
        validationSchema={teacherValidationSchema}
        onSubmit={editting ? onTeacherChangeSubmit : onTeacherAddSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <FormikControl
                control="select"
                label="Honorific Title"
                name="honorific_title"
                options={honorificTitleOptions}
              />
              <FormikControl
                control="input"
                type="text"
                label="ID Number"
                name="national_id"
              />
              <FormikControl
                control="input"
                type="text"
                label="TSC Number"
                name="tsc_id"
              />
              <Br />
              <Br />
              <Button
                type="submit"
                size="small"
                isLoading={loading}
                title={formik.isSubmitting ? "Adding... " : "Done"}
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
