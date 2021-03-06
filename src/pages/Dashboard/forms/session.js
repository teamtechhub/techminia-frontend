/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext, useMemo } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import FormikControl from "containers/FormikContainer/FormikControl";
import { axiosInstance } from "utils/axios";
import { addObjectToLocalStorageObject } from "utils";
import Button from "components/Button/Button";
import { Br } from "styles/pages.style";
import Error500 from "components/Error/Error500";
import { useAlert } from "react-alert";
import { WizardCard, WizardLeftSideCard, Btn } from "../Dashboard.style";
import {
  ProfileContent,
  ProfileCardBody,
  ProfileCardHead,
} from "../../Profile/Profile.style";
import { formTokenConfig } from "utils/axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "contexts/auth/auth.context";
import { slugify } from "utils";
import { apiErrorHandler } from "utils";
import { openModal, closeModal } from "@redq/reuse-modal";
import { logToConsole } from "utils/logging";


export default function Session(props) {
  const {
    selectedTopic,
    sessionChange,
    selectedSubject,
    selectedClass,
  } = props;
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const history = useHistory();
  const alert = useAlert();
  const [initialValues, setInitialValues] = useState({});
  const [editting, setEditting] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allSessions, setAllSessions] = useState([]);
  const [addLesson, setAddLesson] = useState(false);
  const [activeSession, setActiveSession] = useState(false);
  useEffect(() => {
    sessionChange(activeSession);
    if (activeSession) {
      setInitialValues(activeSession);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSession]);

  useEffect(() => {
    if (selectedTopic) {
      axiosInstance
        .get(`/curriculum/session/?topic=${selectedTopic.id}`)
        .then((res) => {
          if (res.data.results.length > 0) {
            setAddLesson(false);
          }
          setAllSessions(res.data.results);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTopic, activeSession]);

  useEffect(() => {
    setEditting(false);
    setInitialValues({
      description: "",
      notes: null,
      name: "",
      is_video_link: false,
      video_url: "",
      documents: [],
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    logToConsole("session reload");
    logToConsole("new sessions", allSessions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSessions]);

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

  const handleViewLesson = (sess) => {
    if (sess) {
      history.push(
        `/dashboard/classes/${selectedClass.id}/${selectedSubject.id}/${profile.extended_profile.id}/${selectedTopic.id}/${sess.id}/`
      );
    } else {
      history.push(
        `/dashboard/classes/${selectedClass.id}/${selectedSubject.id}/${profile.extended_profile.id}/${selectedTopic.id}/${activeSession.id}/`
      );
    }
  };

  const onAddSubmit = async (values, { setErrors, setSubmitting }) => {
    setSubmitting(true);
    setLoading(true);
    logToConsole(values);
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
    logToConsole(docs);

    formData.append("topic", selectedTopic ? selectedTopic.id : null);
    formData.append("video_url", video_url);
    formData.append("name", name);
    formData.append("notes", JSON.stringify(notes));

    axiosInstance
      .post(`/curriculum/session/`, formData, formTokenConfig())
      .then((res) => {
        logToConsole("res", res.data);
        if (docs.length && docs.length > 0) {
          for (let i = 0; i < docs.length; i++) {
            let docsFormData = new FormData();
            const element = docs[i];
            docsFormData.append("session", res.data.id);
            docsFormData.append("title", element.title);
            docsFormData.append("saved_file", element.saved_file);
            axiosInstance
              .post(`/curriculum/files/`, docsFormData, formTokenConfig())
              .then((res) => logToConsole("files ----", res.data));
          }
        }
        const tpcslg = slugify(selectedSubject.name + " " + selectedClass.name);
        logToConsole(tpcslg);
        axiosInstance
          .post(`/forums/threads/`, {
            content: `${res.data.name}`,
            topic_slug: `${tpcslg}`,
            title: `${res.data.name}`,
          })
          .then((results) => {
            axiosInstance.patch(`curriculum/session/${res.data.id}/`, {
              forum: results.data.id,
            });
          });
        setInitialValues({
          description: "",
          notes: null,
          name: "",
          is_video_link: false,
          video_url: "",
          documents: [],
        });
        setActiveSession(res.data);
        alert.success(`Lesson Created Successfully ???`);
        setEditting(false);
        addObjectToLocalStorageObject("darasa_session_profile", res.data);
        setSubmitting(false);
        setLoading(false);
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
        } else {
          setError(err);
        }
        setSubmitting(false);
        setLoading(false);
      });
  };
  const onChangeSubmit = async (values, { setErrors, setSubmitting }) => {
    setSubmitting(true);
    setLoading(true);
    logToConsole(values);
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
      : null;
    logToConsole(docs);

    formData.append("name", name);
    formData.append("video_url", video_url);
    formData.append("notes", JSON.stringify(notes));
    // formData.append("documents", JSON.stringify(docs));
    logToConsole("form data --------: ", [...formData]);

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
              .then((res) => logToConsole("files ----", res.data));
          }
        }
        setSubmitting(false);
        setLoading(false);
        setEditting(false);
        setInitialValues(res.data);
        setActiveSession(res.data);
        alert.success(`Updated Successfully ???`);
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
          logToConsole("errors za data");
        } else {
          setError(err);
          logToConsole("errors general");
        }
        logToConsole(err.response.data);
        setSubmitting(false);
        setLoading(false);
      });
  };
  const deleteSession = (s) => {
    axiosInstance
      .delete(`/curriculum/session/${s.id}/`)
      .then((res) => {
        let qs = allSessions;
        qs.splice(qs.indexOf(s), 1);
        setAllSessions([...qs]);
        alert.info(`${res.data.name} Deleted`);
      })
      .catch((err) => {
        alert.error(`${apiErrorHandler(err)}`);
      });
  };
  const confirmDeleteSession = (sess) => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: () => <ConfirmDeleteSessionModal sess={sess} />,
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

  const ConfirmDeleteSessionModal = ({ sess }) => (
    <div className=" w-full h-full m-0 p-0 text-center bg-white shadow-2xl flex flex-col pb-10 rounded-lg">
      <h4 className="font-bold p-5">
        Are you sure you want to delete the session
      </h4>
      <div className="flex flex-row justify-around">
        <button
          className=" rounded-2xl px-8 py-1 outline-none bg-red-600 focus:outline-none hover:bg-red-400 text-white font-bold"
          onClick={() => {
            deleteSession(sess);
            closeModal();
          }}
        >
          yes
        </button>
        <button
          className=" rounded-2xl px-8 py-1 bg-green-600 outline-none focus:outline-none hover:bg-green-400 text-white font-bold"
          onClick={function () {
            closeModal();
          }}
        >
          cancel
        </button>
      </div>
    </div>
  );

  if (error) {
    return <Error500 err={error} />;
  }

  //removed the usememo hook to fix the addlesson button bug
  //Todo check why use memo hook causes the state addlesson not to update after button click

  return (
    <div>
      {allSessions.length > 0
        ? allSessions.map((sess, i) => {
            return (
              <ProfileContent key={i} style={{ width: "100%" }}>
                <WizardCard style={{ minHeight: 0 }}>
                  <ProfileCardHead className="card-topline">
                    {i + 1}.{" "}
                    <header>
                      {sess.name} - {sess.video_url}
                    </header>
                    <Btn
                      style={{
                        background: "#ef592b",
                        margin: "5px",
                        height: "25px",
                        padding: "0 10px",
                      }}
                      onClick={() => {
                        setInitialValues({ ...sess });
                        setEditting(true);
                      }}
                      title="Edit"
                    />
                    <Btn
                      style={{
                        background: "#e90b0bbf",
                        margin: "5px",
                        height: "25px",
                        padding: "0 10px",
                      }}
                      onClick={() => confirmDeleteSession(sess)}
                      title="Delete "
                    />
                    <Btn
                      style={{
                        background: "##652e8d",
                        margin: "5px",
                        height: "25px",
                        padding: "0 10px",
                      }}
                      onClick={() => handleViewLesson(sess)}
                      title="View Lesson"
                    />
                  </ProfileCardHead>
                </WizardCard>
              </ProfileContent>
            );
          })
        : null}
      {addLesson ? (
        <Formik
          initialValues={initialValues}
          validationSchema={sessionValidationSchema}
          enableReinitialize
          onSubmit={editting ? onChangeSubmit : onAddSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <WizardLeftSideCard>
                  <WizardCard>
                    <ProfileCardHead className="card-topline">
                      <header>Add Video URL/Link For your lesson</header>
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
                      <FormikControl
                        control="textarea"
                        name="notes"
                        rte={true}
                      />
                      <Br />
                      <Br />
                      <Button
                        type="submit"
                        size="small"
                        fullWidth
                        isLoading={loading}
                        title={editting ? `Edit Lesson` : "Create Lesson"}
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
      ) : (
        <Button
          size="small"
          onClick={() => {
            logToConsole("button clickedto add video");
            setAddLesson((l) => true);
            logToConsole(`the value of add lesson is ${addLesson}`);
          }}
          title={"Add Lesson"}
          style={{ width: "100%", fontSize: 15, color: "#fff" }}
          //   disabled={!formik.isValid}
        />
      )}
    </div>
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
}
