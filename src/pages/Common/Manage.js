/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CardWrapper, FormWrapper } from "./style";
import FormikControl from "containers/FormikContainer/FormikControl";
import axios from "axios";
import { BASE_URL } from "constants/constants";
import { tokenConfig } from "helpers";
import Button from "components/Button/Button";
import { useAppState } from "contexts/app/app.provider";
import { useRouteMatch } from "react-router-dom";
import { useStickyDispatch } from "contexts/app/app.provider";
import { Industries } from "pages/common/industry";
import Loader from "components/Loader/Loader";
import Error500 from "components/Error/Error500";
import { openModal } from "@redq/reuse-modal";
import EmailVerificationModal from "containers/SignInOutForm/emailVerificationModal";
import {
  ListingLogo,
  ListingTitle,
  ListingIcons,
  LeftContent,
  TypeList,
} from "styles/pages.style";
import ImageWrapper from "components/Image/Image";
import { RefundIcon } from "components/AllSvgIcon";
import ModalTemplate from "pages/common/ModalTemplate";
import { H3 } from "styles/pages.style";

function Manage({ type, name, isBusiness, isIndividual }) {
  const match = useRouteMatch();
  const industry = Industries;
  const [initialValues, setInitialValues] = useState();
  const useDispatch = useStickyDispatch();
  const setList = useCallback(() => useDispatch({ type: "MANAGE" }), [
    useDispatch,
  ]);
  const setForm = useCallback(() => useDispatch({ type: "EDIT" }), [
    useDispatch,
  ]);
  const currentForm = useAppState("currentForm");
  const isEdit = currentForm === "edit";
  const [applicants, setApplicants] = useState([
    {
      email: "demo@demo.com",
      full_name: "Tester User",
      id: 1,
      username: "1demo.com",
      salary: 5000,
    },
    {
      email: "admin@demo.com",
      full_name: "Only User",
      id: 2,
      username: "IDM",
      salary: 4000,
    },
  ]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setList();
    setTimeout(() => {
      try {
        axios
          .get(
            `${BASE_URL}/jobs/applications/?job_id=${match.params.jobID}`,
            tokenConfig()
          )
          .then((res) => {
            // const arr = res.data.results;
            // const result = arr.reduce((acc, d) => {
            //   acc.push({
            //     key: d.name,
            //     value: d.id,
            //   });
            //   return acc;
            // }, []);
            setApplicants(res.data.results);
            console.log("applicants", res.data.results);
          })
          .catch((err) => {
            setLoading(false);
            console.log("Catching Errors:", err);
            setError(err);
          });
        axios
          .get(`${BASE_URL}/jobs/${match.params.jobID}/`, tokenConfig())
          .then((res) => {
            const arr = res.data;
            console.log("array jobs", arr);
            // setJob(arr);
            setInitialValues(arr);
            setLoading(false);
          })
          .catch((err) => {
            console.log("Catching Errors:", error);
            setError(error);
            setLoading(false);
          });
      } catch (error) {
        console.log("Catching Errors:", error);
        setError(error);
        setLoading(false);
      }
    }, 2000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // const initialValues = {
  //   creator: localStorage.getItem("thedb_auth_profile") ? profile.id : "",
  //   title: "",
  //   industry: "",
  //   location: "",
  //   salary: "",
  //   description: "",
  //   job_type: "",
  //   experience: [],
  //   qualifications: [],
  //   courseDate: null,
  // };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    industry: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    salary: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    experience: Yup.string().required("Required"),
    qualifications: Yup.string().required("Required"),
    // courseDate: Yup.date().required("Required").nullable(),
  });

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    setLoading(true);
    console.log("val8es fdsf ", values);
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    axios
      .post(`${BASE_URL}/jobs/${match.params.jobID}/`, values, tokenConfig())
      .then((res) => {
        setSubmitting(false);
        console.log("res", res.data);
      })
      .catch((err) => {
        if (err.response.status > 199 && err.response.status < 300) {
          setErrors(err.response.data);
        } else {
          setError(err);
        }
        console.log(err.response.status);
        setSubmitting(false);
        setLoading(false);
      });
  };
  const closeApplications = () => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/jobs/${match.params.jobID}/`, tokenConfig())
      .then((res) => {
        openModal({
          show: true,
          overlayClassName: "quick-view-overlay",
          closeOnClickOutside: true,
          component: () => EmailVerificationModal("Applications halted!"),
          closeComponent: "",
          config: {
            enableResizing: false,
            disableDragging: true,
            className: "quick-view-modal",
            width: 458,
            height: "auto",
          },
        });
      })
      .catch((err) => {
        setError(err);
        console.log(err.response.status);
        setLoading(false);
      });
  };
  const deleteJob = (text) => {
    setLoading(true);
    axios
      .delete(`${BASE_URL}/jobs/${match.params.jobID}/`, tokenConfig())
      .then((res) => {
        setLoading(false);
        openModal({
          show: true,
          overlayClassName: "quick-view-overlay",
          closeOnClickOutside: true,
          component: () => EmailVerificationModal("Job deleted"),
          closeComponent: "",
          config: {
            enableResizing: false,
            disableDragging: true,
            className: "quick-view-modal",
            width: 458,
            height: "auto",
          },
        });
      })
      .catch((err) => {
        setError(err);
        console.log(err.response.status);
        setLoading(false);
      });
  };
  const selectApplicant = () => {
    const values = { status: "accepted" };
    axios
      .post(
        `${BASE_URL}/application/${match.params.jobID}/`,
        values,
        tokenConfig()
      )
      .then((res) => {
        setLoading(false);
        openModal({
          show: true,
          overlayClassName: "quick-view-overlay",
          closeOnClickOutside: true,
          component: () => EmailVerificationModal("Job deleted"),
          closeComponent: "",
          config: {
            enableResizing: false,
            disableDragging: true,
            className: "quick-view-modal",
            width: 458,
            height: "auto",
          },
        });
      })
      .catch((err) => {
        if (err.response.status > 199 && err.response.status < 300) {
        } else {
          setError(err);
        }
        console.log(err.response.status);
        setLoading(false);
      });
  };
  const applicantView = (profile) => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: () => ModalTemplate(profile),
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
  if (error) {
    return <Error500 err={error} />;
  }

  return (
    <CardWrapper>
      <h4>
        Manage
        <Button
          onClick={isEdit ? setList : setForm}
          size="small"
          title={isEdit ? `Manage Applications` : `Edit Post`}
          style={{
            fontSize: 15,
            color: "#652e8d",
            backgroundColor: "#ec7623",
            float: "right",
          }}
        />
      </h4>
      {loading ? (
        <Loader />
      ) : (
        <>
          {currentForm === "edit" && (
            <>
              <h4>
                .
                <Button
                  onClick={closeApplications}
                  size="small"
                  title={`Close Applications`}
                  style={{
                    fontSize: 15,
                    color: "#fff",
                    backgroundColor: "#c018e6",
                    float: "left",
                  }}
                />
                <Button
                  onClick={deleteJob}
                  size="small"
                  title={`Delete Job`}
                  style={{
                    fontSize: 15,
                    color: "#fff",
                    backgroundColor: "#e6183e",
                    float: "right",
                  }}
                />
              </h4>
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
                          control="select"
                          label="Industry"
                          name="industry"
                          options={industry}
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
                          label="Qualification"
                          name="qualifications"
                          options={minQualificationsOptions}
                        />
                        <FormikControl
                          control="select"
                          label="Experience"
                          name="experience"
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
                          title={
                            formik.isSubmitting ? "Submitting... " : "Submit"
                          }
                          style={{ fontSize: 15, color: "#fff" }}
                          disabled={!formik.isValid}
                        />
                      </Form>
                    );
                  }}
                </Formik>
              </FormWrapper>
            </>
          )}
          {currentForm === "manage" && (
            <LeftContent>
              <ul>
                {applicants.length > 0 ? (
                  <>
                    {applicants.map((applicant, index) => (
                      <li key={index}>
                        <section onClick={() => applicantView(applicant)}>
                          <ListingLogo>
                            <ImageWrapper
                              url={applicant.image}
                              alt={"company logo"}
                            />
                          </ListingLogo>
                          <ListingTitle>
                            <h3>
                              {applicant.full_name}
                              <TypeList>
                                <Button
                                  onClick={() => selectApplicant()}
                                  size="small"
                                  title={`Approve`}
                                  style={{
                                    fontSize: 15,
                                    color: "#fff",
                                    backgroundColor: "#652e8d",
                                    float: "right",
                                    height: "29px",
                                    margin: "0 0 0 10px",
                                  }}
                                />
                              </TypeList>
                            </h3>
                            <ListingIcons>
                              <li>
                                <RefundIcon />
                                {applicant.email}
                              </li>
                            </ListingIcons>
                          </ListingTitle>
                        </section>
                      </li>
                    ))}
                  </>
                ) : (
                  <H3>No Applications Yet</H3>
                )}
              </ul>
            </LeftContent>
          )}
        </>
      )}
    </CardWrapper>
  );
}

export default Manage;
