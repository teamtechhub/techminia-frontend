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
import { useAlert } from "react-alert";
import { CurriculumContext } from "contexts/curriculum/curriculum.context";

export default function Subject(props) {
  const alert = useAlert();
  const { curriculumState, curriculumDispatch } = useContext(CurriculumContext);
  const [initialValues, setInitialValues] = useState({});
  const [editting, setEditting] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    try {
      axiosInstance
        .get(`/curriculum/subject/`, tokenConfig())
        .then((res) => {
          console.log("res", res.data);
          setSubjects(res.data.results);
          setLoading(false);
        })
        .catch((err) => {
          console.log("res errors", err.response.data);
          if (err.response) {
            if (err.response.data.user) {
              setError(err.response.data);
            }
            setError(err.response.data);
          } else {
            setError(err);
          }
          console.log(err.response.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
    setEditting(false);
    console.log("not happening");
    setInitialValues({
      name: "",
      description: "",
      description_json: {},
      background_image: null,
      background_image_alt: "",
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const studentValidationSchema = Yup.object({
    name: Yup.string().required("Required"),
    description_json: Yup.mixed().required("Required"),
  });

  const onAddSubmit = (values, { setErrors, setSubmitting }) => {
    setSubmitting(true);
    setLoading(true);
    const { background_image, description_json, name } = values;
    let formData = new FormData();
    formData.append("name", name);
    if (typeof background_image !== "string") {
      formData.append("background_image", background_image);
    }
    formData.append("description_json", description_json);
    console.log(values);

    try {
      axiosInstance
        .post(`/curriculum/subject/`, formData, tokenConfig())
        .then((res) => {
          console.log("res", res.data);
          setInitialValues(res.data);
          alert.success(`${res.data.name} Edited Successfully ✔`);
          //   addObjectToLocalStorageObject("darasa_student_profile", res.data);
          setSubmitting(false);
          setLoading(false);
        })
        .catch((err) => {
          console.log("res errors", err.response.data);
          if (err.response) {
            if (err.response.data.user) {
              if (err.response.data.user[0] === "This field must be unique.") {
                alert.success(
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
      setLoading(false);
    }
  };
  const onChangeSubmit = async (values, { setErrors, setSubmitting }) => {
    setSubmitting(true);
    setLoading(true);
    try {
      axiosInstance
        .patch(`/curriculum/subject/`, values, tokenConfig())
        .then((res) => {
          setSubmitting(false);
          setLoading(false);
          console.log("res", res.data);
          alert.success("Subject Updated Successfully ✔", "");
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
          setLoading(false);
        });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  if (error) {
    return <Error500 err={error} />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={studentValidationSchema}
      onSubmit={editting ? onChangeSubmit : onAddSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              control="input"
              type="file"
              setFieldValue={formik.setFieldValue}
              label={`Background Image For Subject`}
              name="background_image"
            />
            <FormikControl
              control="input"
              type="text"
              label="Subject Name"
              name="name"
              style={{
                height: "100px",
                background: "transparent",
                borderRight: "transparent",
                borderLeft: "transparent",
                borderTop: "transparent",
                fontWeight: "100px",
                fontSize: "50px",
                borderBottom: "10px",
              }}
            />
            <FormikControl
              control="textarea"
              label="About the subject"
              name="description_json"
              rte={true}
              fullWidth
            />
            <Br />
            <Br />
            <Button
              type="submit"
              size="small"
              // isLoading={formik.isSubmitting}
              isLoading={loading}
              title={
                formik.isSubmitting ? "Creating Subject... " : "Create Subject"
              }
              style={{ fontSize: 15, color: "#fff" }}
              //   disabled={!formik.isValid}
            />
          </Form>
        );
      }}
    </Formik>
  );
}
