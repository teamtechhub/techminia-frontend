/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "containers/FormikContainer/FormikControl";
import { axiosInstance } from "utils/axios";
import { addObjectToLocalStorageObject } from "utils";
import Button from "components/Button/Button";
import { Br } from "styles/pages.style";
import Error500 from "components/Error/Error500";
import { tokenConfig } from "utils/axios";
import { AuthContext } from "contexts/auth/auth.context";
import { useAlert } from "react-alert";

export default function TeacherForm({ profile, handleRedirect }) {
  const { authState, authDispatch } = useContext(AuthContext);
  const [initialTeacherValues, setInitialTeacherValues] = useState({});
  const [editting, setEditting] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const alert = useAlert();

  useEffect(() => {
    setTimeout(() => {
      if (authState.extendedProfile.length > 0) {
        console.log("happening");
        setInitialTeacherValues(authState.extendedProfile);

        console.log(authState.extendedProfile);
        setEditting(true);
      } else {
        console.log("not happening");
        setInitialTeacherValues({
          document_id: "",
          tsc_id: "",
          honorofic_title: "",
          user: localStorage.getItem("darasa_auth_profile") ? profile.id : "",
        });
      }
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const teacherValidationSchema = Yup.object({
    honorofic_title: Yup.string().required("Required"),
    document_id: Yup.string()
      .min(6, "Document Number is invalid")
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

  const onTeacherAddSubmit = async (values, { setErrors, setSubmitting }) => {
    setLoading(true);
    setSubmitting(true);
    console.log("ta values", values);
    values["user"] = localStorage.getItem("darasa_auth_profile")
      ? profile.id
      : "";
    axiosInstance
      .post(`/account/teachers/`, values, tokenConfig())
      .then((res) => {
        console.log("res", res.data);
        alert.success("Profile Updated Successfully ✔", "");
        addObjectToLocalStorageObject("darasa_teacher_profile", res.data);
        authDispatch({
          type: "UPDATE",
          payload: {
            ...authState,
            extendedProfile: res.data,
            profile: { ...authState.profile, extended_profile: res.data },
          },
        });

        setSubmitting(false);
        setLoading(false);
        handleRedirect();
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
  const onTeacherChangeSubmit = (values, { setErrors, setSubmitting }) => {
    setSubmitting(true);
    setLoading(true);
    axiosInstance
      .patch(`/account/teachers/profile/`, values, tokenConfig())
      .then((res) => {
        setSubmitting(false);
        console.log("res", res.data);
        authDispatch({
          type: "UPDATE",
          payload: {
            ...authState,
            extendedProfile: res.data,
            profile: { ...authState.profile, extended_profile: res.data },
          },
        });

        alert.success("Profile Created Successfully ✔", "");
        addObjectToLocalStorageObject("darasa_teacher_profile", res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("res errors", err.response.data);
        if (err.response) {
          if (err.response.data.user) {
            if (err.response.data.user[0] === "This field must be unique.") {
              alert.info(
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
  };
  if (error) {
    return <Error500 err={error} />;
  }
  return (
    <Formik
      enableReinitialize
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
              name="honorofic_title"
              options={honorificTitleOptions}
            />
            <FormikControl
              control="input"
              type="text"
              label="National Document ID"
              name="document_id"
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
              title={formik.isSubmitting ? "Creating Profile... " : "Done"}
              isSubmitting={formik.isSubmitting}
              style={{
                fontSize: 15,
                color: "#fff",
              }}
              disabled={!formik.isValid}
            />
          </Form>
        );
      }}
    </Formik>
  );
}
