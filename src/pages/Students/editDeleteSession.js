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
import { useAlert } from "react-alert";
import {
  WizardCard,
  WizardLeftSideCard,
  Btn,
} from "../Dashboard/Dashboard.style";
import {
  ProfileContent,
  ProfileCardBody,
  ProfileCardHead,
} from "../Profile/Profile.style";
import { formTokenConfig } from "utils/axios";
import { AuthContext } from "contexts/auth/auth.context";
import { apiErrorHandler } from "utils";
import { useHistory } from "react-router-dom";

export default function EditDeleteSession({ session, setEdit }) {
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const history = useHistory();
  const alert = useAlert();
  const [initialValues, setInitialValues] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sess, setSess] = useState(session);
  const [confirmDelete, setConfirmDelete] = useState(false);
  console.log("check check", profile, profile.extended_profile);

  useEffect(() => {
    setSess(session);
    setInitialValues(session);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sessionValidationSchema = Yup.object({
    video_url: Yup.string()
      .url()
      .url("Please enter a valid URL, http:// or https://", {
        allowLocal: true,
      })
      .required("Required"),
    notes: Yup.mixed().required("Required"),
    name: Yup.string().required("Required"),
  });

  const onChangeSubmit = async (values, { setErrors, setSubmitting }) => {
    setSubmitting(true);
    setLoading(true);
    console.log(values);
    const { name, notes, video_url, documents } = values;

    let formData = new FormData();

    const docs = documents
      ? await documents.reduce((acc, d) => {
          acc.push({
            title: d.name
              .replace(".docx", "")
              .replace(".doc", "")
              .replace(".pdf", ""),
            saved_file: d,
          });
          return acc;
        }, [])
      : [];
    console.log(docs);

    formData.append("name", name);
    formData.append("video_url", video_url);
    formData.append("notes", JSON.stringify(notes));
    // formData.append("documents", JSON.stringify(docs));
    console.log("form data --------: ", [...formData]);

    axiosInstance
      .patch(
        `/curriculum/session/${initialValues.id}/`,
        formData,
        formTokenConfig()
      )
      .then(async (res) => {
        if (docs.length > 0) {
          for (let i = 0; i < docs.length; i++) {
            let docsFormData = new FormData();
            const element = docs[i];
            docsFormData.append("session", res.data.id);
            docsFormData.append("title", element.title);
            docsFormData.append("saved_file", element.saved_file);
            await axiosInstance
              .post(`/curriculum/files/`, docsFormData, formTokenConfig())
              .then((res) => console.log("files ----", res.data));
          }
        }
        setSubmitting(false);
        setLoading(false);
        setInitialValues(res.data);
        alert.success(`Updated Successfully ✔`);
        addObjectToLocalStorageObject("darasa_session_profile", res.data);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data) {
            if (err.response.data.message) {
              alert.error(err.response.data.message);
            } else {
              setErrors(err.response.data);
            }
          }
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
  const deleteSession = (s) => {
    axiosInstance
      .delete(`/curriculum/session/${s.id}/`)
      .then((res) => {
        alert.info(`${res.data.name} Deleted`);
        console.log(res.data);
        history.push(`/dashboard`);
      })
      .catch((err) => {
        alert.error(`${apiErrorHandler(err)}`);
      });
  };

  const confirmDeleteSession = async (sess) => {
    if (confirmDelete) {
      console.log("should delete session");
      return;
    } else {
      console.log("delete denied");
      return;
    }
  };

  if (error) {
    return <Error500 err={error} />;
  }

  return (
    <>
      <ProfileContent style={{ width: "100%" }}>
        <WizardCard style={{ minHeight: 0 }}>
          <ProfileCardHead className="card-topline">
            <header style={{ cursor: "pointer" }}>
              {sess.name} ~ {sess.video_url}
            </header>
            <Btn
              style={{
                background: "#e90b0bbf",
                margin: "5px",
                height: "25px",
                padding: "0 10px",
              }}
              onClick={() => confirmDeleteSession(sess)}
              title="Delete"
            />
            <Btn
              style={{
                background: "##652e8d",
                margin: "5px",
                height: "25px",
                padding: "0 10px",
              }}
              onClick={() => setEdit(false)}
              title="View Lesson"
            />
          </ProfileCardHead>
        </WizardCard>
      </ProfileContent>
      <Formik
        initialValues={initialValues}
        validationSchema={sessionValidationSchema}
        enableReinitialize
        onSubmit={onChangeSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <WizardLeftSideCard>
                <WizardCard>
                  <ProfileCardHead className="card-topline">
                    <header>Add Video URL/ Link For your lesson</header>
                  </ProfileCardHead>
                  <ProfileCardBody>
                    <FormikControl
                      control="input"
                      type="text"
                      label="Lesson Name"
                      name="name"
                      style={{
                        height: "50px",
                        borderRight: "transparent",
                        borderLeft: "transparent",
                        borderTop: "transparent",
                        fontWeight: "50px",
                        fontSize: "20px",
                        borderBottom: "10px black",
                      }}
                    />
                    <FormikControl
                      control="input"
                      type="text"
                      label="Copy Video Link Here"
                      name="video_url"
                      style={{
                        height: "50px",
                        borderRight: "transparent",
                        borderLeft: "transparent",
                        borderTop: "transparent",
                        fontWeight: "50px",
                        fontSize: "20px",
                        borderBottom: "10px black",
                      }}
                    />

                    <FormikControl
                      control="input"
                      type="file"
                      doc={true}
                      multiple={true}
                      label="Lesson Documents"
                      name="documents"
                    />
                  </ProfileCardBody>
                </WizardCard>
              </WizardLeftSideCard>
              <ProfileContent>
                <WizardCard>
                  <ProfileCardHead className="card-topline">
                    <header>Lesson Summary Notes</header>
                  </ProfileCardHead>
                  <ProfileCardBody>
                    <FormikControl control="textarea" name="notes" rte={true} />
                    <Br />
                    <Br />
                    <Button
                      type="submit"
                      size="small"
                      fullWidth
                      isLoading={loading}
                      title={`Edit Lesson`}
                      style={{ width: "100%", fontSize: 15, color: "#fff" }}
                      //   disabled={!formik.isValid}
                    />
                  </ProfileCardBody>
                </WizardCard>
              </ProfileContent>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
