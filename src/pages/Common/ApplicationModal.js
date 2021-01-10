/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useState, useCallback } from "react";
import FormikControl from "containers/FormikContainer/FormikControl";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { tokenConfig } from "helpers";
import Button from "components/Button/Button";
import {
  FormWrapper,
  Divider,
  Wrapper,
  Container,
  SubHeading,
  Heading,
} from "./style";
import { AuthContext } from "contexts/auth/auth.context";
import { BASE_URL } from "constants/constants";
import { addToLocalStorageArray } from "helpers";
import { openModal, closeModal } from "@redq/reuse-modal";
import EmailVerificationModal from "containers/SignInOutForm/emailVerificationModal";
import { useStickyDispatch } from "contexts/app/app.provider";
import { useHistory, useLocation } from "react-router-dom";
import { Center } from "styles/pages.style";

function ApplicationModal(jobId) {
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const [success, setSuccess] = useState(false);
  const useDispatch = useStickyDispatch();
  const setReload = useCallback(() => useDispatch({ type: "RELOAD" }), [
    useDispatch,
  ]);
  const isViewPage = location.pathname === `/dashboard/view/${jobId}`;
  const submitApplication = (values, { setErrors, setSubmitting }) => {
    setSubmitting(true);
    const { budget, comment } = values;
    const body = {
      applicant: profile.id,
      job: jobId,
      budget: budget,
      comment: comment,
    };
    axios
      .post(`${BASE_URL}/jobs/applications/`, body, tokenConfig())
      .then((res) => {
        console.log("applicant data", res.data);
        setSuccess(true);
        addToLocalStorageArray("thedb_applications", res.data.job);
        openModal({
          show: true,
          overlayClassName: "quick-view-overlay",
          closeOnClickOutside: true,
          component: () =>
            EmailVerificationModal(
              `Application Successful ✔`,
              "The employer has been notified and will review your application soon"
            ),
          closeComponent: "",
          config: {
            enableResizing: false,
            disableDragging: true,
            className: "quick-view-modal",
            width: 458,
            height: "auto",
          },
        });
        setReload();
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const initialValues = {
    applicant: localStorage.getItem("thedb_auth_profile") ? profile.id : "",
    job: jobId,
    resume: null,
    budget: "",
    comment: "",
    status: "Applied",
  };
  const validationSchema = Yup.object({
    budget: Yup.string().required("Required"),
    comment: Yup.string()
      .max(100, "Should not exceed 100 characters")
      .required("Required"),
  });
  return (
    <Wrapper>
      <Container style={{ paddingBottom: 30 }}>
        {!success ? (
          <>
            <Heading>Complete Application</Heading>
            {isViewPage ? null : (
              <Center>
                <SubHeading>View job for more details</SubHeading>
                <SubHeading>
                  <Button
                    onClick={() => {
                      history.push(`/dashboard/view/${jobId}`);
                      closeModal();
                    }}
                    size="small"
                    title={`View Job Details`}
                    style={{
                      fontSize: 15,
                      color: "#652e8d",
                      backgroundColor: "#ec7623",
                      float: "right",
                    }}
                  />
                </SubHeading>
                <Divider>
                  <span>or</span>
                </Divider>
              </Center>
            )}

            <SubHeading>Fill in the details to complete application</SubHeading>

            <FormWrapper>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitApplication}
              >
                {(formik) => {
                  // formik.setFieldValue("job", 1);
                  return (
                    <Form>
                      <FormikControl
                        control="input"
                        type="text"
                        label="Budget"
                        placeholder="e.g. 1,000"
                        name="budget"
                      />
                      <FormikControl
                        control="textarea"
                        label="comment"
                        placeholder="Brief statement about why you should be considered."
                        name="comment"
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
        ) : (
          <Heading>Application Successful ✔</Heading>
        )}{" "}
      </Container>
    </Wrapper>
  );
}

export default ApplicationModal;
