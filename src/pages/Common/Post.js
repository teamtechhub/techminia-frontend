/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useContext, useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CardWrapper, FormWrapper } from "./style";
import FormikControl from "containers/FormikContainer/FormikControl";
import axios from "axios";
import { BASE_URL } from "constants/constants";
import { tokenConfig } from "helpers";
import Button from "components/Button/Button";
import { AuthContext } from "contexts/auth/auth.context";
import { Industries } from "pages/common/industry";
import { useHistory } from "react-router-dom";
import { useStickyDispatch } from "contexts/app/app.provider";
import { openModal } from "@redq/reuse-modal";
import EmailVerificationModal from "containers/SignInOutForm/emailVerificationModal";
import Error500 from "components/Error/Error500";
import Loader from "components/Loader/Loader";

function Post({ type, name, isBusiness, isIndividual }) {
  const history = useHistory();
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const [industry] = useState(Industries);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!profile.is_verified) {
      history.push(`/dashboard/jobs`);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dropdownOptions = [
    { value: "", key: "Select  Type" },
    { value: "fulltime", key: "Full-Time" },
    { value: "parttime", key: "Part-Time" },
    { value: "volunteering", key: "Volunteering" },
  ];
  const minQualificationsOptions = [
    { value: "", key: "Select your Qualification" },
    { value: "none", key: "None" },
    { value: "pri", key: "Primary" },
    { value: "sec", key: "Secondary" },
    { value: "cert", key: "Certificate" },
    { value: "dip", key: "Diploma" },
    { value: "bsc", key: "BSc" },
    { value: "msc", key: "MSc" },
    { value: "phd", key: "PhD" },
  ];
  const experienceOptions = [
    { value: "", key: "Select Years of experience" },
    { value: "entry", key: "Entry Level" },
    { value: "1-2", key: "1-2 years" },
    { value: "3-5", key: "3-5 years" },
    { value: "6-10", key: "6-10 years" },
    { value: "above 10", key: "Above 10 years" },
  ];

  const initialValues = {
    creator: localStorage.getItem("thedb_auth_profile") ? profile.id : "",
    title: "",
    industry: "",
    location: "",
    salary: "",
    description: "",
    job_type: "",
    years_of_exp: "",
    min_qualification: "",
    courseDate: null,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    industry: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    salary: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    job_type: Yup.string().required("Required"),
    years_of_exp: Yup.string().required("Required"),
    min_qualification: Yup.string().required("Required"),
    // courseDate: Yup.date().required("Required").nullable(),
  });
  const handleModal = (text, subtext) => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: () => EmailVerificationModal(text, subtext),
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: 458,
        height: "auto",
      },
    });
  };
  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    console.log("val8es fdsf ", values);
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    axios
      .post(`${BASE_URL}/jobs/`, values, tokenConfig())
      .then((res) => {
        setSubmitting(false);
        console.log("res", res.data);
        handleModal(
          " Created Successfully ✔",
          `${res.data.title} - ${res.data.location} @ ${res.data.salary}`
        );
        setTimeout(() => {
          setLoading(false);
          history.push(`/dashboard/jobs/${res.data.title}`);
        }, 2000);
      })
      .catch((err) => {
        if (err.response) {
          setErrors(err.response.data);
        } else {
          setError(err);
        }
        console.log(err.response.status);
        setSubmitting(false);
        setLoading(false);
      });
  };
  const useDispatch = useStickyDispatch();
  const setForm = useCallback(() => useDispatch({ type: "VIEW" }), [
    useDispatch,
  ]);
  const toggleView = () => {
    setForm();
  };
  if (error) {
    return <Error500 err={error} />;
  }
  return (
    <CardWrapper>
      <h4>
        Post A
        <Button
          onClick={() => toggleView()}
          size="small"
          title="Listings"
          style={{
            fontSize: 15,
            color: "#652e8d",
            backgroundColor: "#ec7623",
            float: "right",
          }}
        />
      </h4>
      <>
        {loading ? (
          <Loader />
        ) : (
          <FormWrapper>
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
                      type="text"
                      label="Title"
                      name="title"
                    />
                    <FormikControl
                      control="input"
                      type="text"
                      label="Salary"
                      name="salary"
                    />
                    <FormikControl
                      control="input"
                      type="text"
                      label="Location"
                      name="location"
                    />
                    <FormikControl
                      control="select"
                      label="Industry"
                      name="industry"
                      options={industry}
                    />
                    <FormikControl
                      control="select"
                      label=" Type"
                      name="job_type"
                      options={dropdownOptions}
                    />
                    <FormikControl
                      control="select"
                      label="Qualification"
                      name="min_qualification"
                      options={minQualificationsOptions}
                    />
                    <FormikControl
                      control="select"
                      label="Experience"
                      name="years_of_exp"
                      options={experienceOptions}
                    />
                    <FormikControl
                      control="textarea"
                      label="Description"
                      name="description"
                      rte={true}
                    />
                    <Button
                      type="submit"
                      size="small"
                      title={formik.isSubmitting ? "Submitting... " : "Submit"}
                      style={{ fontSize: 15, color: "#fff" }}
                      disabled={!formik.isValid}
                    />
                  </Form>
                );
              }}
            </Formik>
          </FormWrapper>
        )}
      </>
    </CardWrapper>
  );
}

export default Post;
