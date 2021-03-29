/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { logToConsole } from "utils/logging";

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
import {
  WizardCard,
  WizardLeftSideCard,
  WizardRightSideCard,
} from "../Dashboard.style";
import {
  ProfileContent,
  ProfileCardBody,
  ProfileCardHead,
} from "../../Profile/Profile.style";
import { formTokenConfig } from "utils/axios";
import AutoCompleteSelectField from "containers/FormikContainer/MultiAutocompleteSelectField/AutoCompleteSelectField";

export default function Syllabus(props) {
  const { selectedClass, selectedSubject, syllabusChange } = props;
  const alert = useAlert();
  const [initialValues, setInitialValues] = useState({});
  const [editting, setEditting] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [syllabus, setSyllabus] = useState([]);
  const [creating, setCreating] = useState(false);
  const [activeSyllabus, setActiveSyllabus] = useState();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    syllabusChange(activeSyllabus);
    if (activeSyllabus) {
      setInitialValues(activeSyllabus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSyllabus]);

  useEffect(() => {
    if (selectedSubject && selectedClass) {
      try {
        axiosInstance
          .get(
            `/curriculum/syllabus/?class=${selectedClass.id}&subject=${selectedSubject.id}`,
            tokenConfig()
          )
          .then((res) => {
            logToConsole("res", res.data);
            setSyllabus(res.data.results);
            setLoading(false);
          })
          .catch((err) => {
            logToConsole("res errors", err.response.data);
            if (err.response) {
              if (err.response.data.user) {
                setError(err.response.data);
              }
              setError(err.response.data);
            } else {
              setError(err);
            }
            logToConsole(err.response.data);
            setLoading(false);
          });
      } catch (error) {
        logToConsole(error);
      }
    }

    setEditting(false);
    logToConsole("not happening");
    setInitialValues({
      name: "",
      description: "",
      description_json: {},
      background_image: null,
      background_image_alt: "",
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update, selectedClass, selectedSubject]);

  const syllabusValidationSchema = Yup.object({
    name: Yup.string().required("Required"),
    description_json: Yup.mixed().required("Required"),
  });
  const handleUpdate = () => {
    setUpdate(!update);
  };

  function handleTrue() {
    setCreating(true);
  }
  function handleEdit() {
    setActiveSyllabus(false);
    setEditting(true);
    setCreating(true);
  }
  function handleFalse() {
    setCreating(false);
  }

  const onAddSubmit = (values, { setErrors, setSubmitting }) => {
    setSubmitting(true);
    setLoading(true);
    const { background_image, description_json, name } = values;
    let formData = new FormData();
    formData.append("name", name);
    if (typeof background_image !== "string") {
      formData.append("background_image", background_image);
    }
    formData.append("description_json", JSON.stringify(description_json));
    logToConsole(values);

    try {
      axiosInstance
        .post(`/curriculum/syllabus/`, formData, formTokenConfig())
        .then((res) => {
          logToConsole("res", res.data);
          setInitialValues(res.data);
          setActiveSyllabus(res.data);
          alert.success(`${res.data.name} Created Successfully ✔`);
          setEditting(true);
          setInitialValues(res.data);
          addObjectToLocalStorageObject("darasa_syllabus_profile", res.data);
          setSubmitting(false);
          setLoading(false);
        })
        .catch((err) => {
          logToConsole("res errors", err.response.data);
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
          logToConsole(err.response.data);
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
    const { background_image, description_json, name } = values;
    let formData = new FormData();

    formData.append("name", name);
    logToConsole(typeof background_image);
    if (typeof background_image !== "string") {
      formData.append("background_image", background_image);
    }
    formData.append("description_json", JSON.stringify(description_json));
    logToConsole(values);
    try {
      axiosInstance
        .patch(
          `/curriculum/syllabus/${initialValues.id}/`,
          formData,
          formTokenConfig()
        )
        .then((res) => {
          setSubmitting(false);
          setLoading(false);
          setInitialValues(res.data);
          setActiveSyllabus(res.data);
          alert.success(`${res.data.name} Updated Successfully ✔`);
          addObjectToLocalStorageObject("darasa_syllabus_profile", res.data);
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
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  if (error) {
    return <Error500 err={error} />;
  }

  return (
    <div>
      {creating ? (
        <Formik
          initialValues={initialValues}
          validationSchema={syllabusValidationSchema}
          onSubmit={editting ? onChangeSubmit : onAddSubmit}
        >
          {(formik) => {
            return (
              <Form style={{ display: "flex", flexWrap: "wrap" }}>
                <WizardLeftSideCard>
                  <WizardCard>
                    <ProfileCardHead className="card-topline">
                      <header>Create Syllabus</header>
                    </ProfileCardHead>
                    <ProfileCardBody>
                      <FormikControl
                        control="input"
                        type="text"
                        label="Syllabus Name"
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
                        type="file"
                        setFieldValue={formik.setFieldValue}
                        label={`Background Image For Syllabus`}
                        name="background_image"
                      />
                    </ProfileCardBody>
                  </WizardCard>
                </WizardLeftSideCard>
                <ProfileContent>
                  <WizardCard>
                    <ProfileCardHead className="card-topline">
                      <header>About the syllabus</header>
                      <Button
                        size="small"
                        title={"Select Existing Syllabus"}
                        style={{ float: "right", fontSize: 15, color: "#fff" }}
                        onClick={handleFalse}
                      />
                    </ProfileCardHead>
                    <ProfileCardBody>
                      <FormikControl
                        control="textarea"
                        label="About the syllabus"
                        name="description_json"
                        rte={true}
                        fullWidth
                      />
                      <Br />
                      <Br />
                      <Button
                        type="submit"
                        size="small"
                        fullWidth
                        isLoading={loading}
                        title={editting ? `Edit Syllabus` : "Create Syllabus"}
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
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <ProfileContent>
            <WizardCard>
              <ProfileCardHead className="card-topline">
                <header>Select a Unit/Chapter</header>
              </ProfileCardHead>
              <ProfileCardBody>
                <AutoCompleteSelectField
                  label="Type Unit/Chapter"
                  name="name"
                  data={syllabus}
                  autofield={true}
                  apipath={`/curriculum/syllabus/`}
                  handleUpdate={handleUpdate}
                  handleChange={setActiveSyllabus}
                  arguements={{
                    clss: selectedClass ? selectedClass.id : null,
                    subject: selectedSubject ? selectedSubject.id : null,
                  }}
                  inputStyle={{
                    height: "100px",
                    background: "transparent",
                    borderRight: "transparent",
                    borderLeft: "transparent",
                    borderTop: "transparent",
                    fontWeight: "100px",
                    fontSize: "50px",
                    borderBottom: "10px",
                  }}
                  buttonStyle={{
                    height: "100px",
                    fontSize: "50px",
                  }}
                />
              </ProfileCardBody>
            </WizardCard>
          </ProfileContent>
          <WizardRightSideCard>
            <WizardCard>
              <ProfileCardHead className="card-topline"></ProfileCardHead>
              <ProfileCardBody>
                <Button
                  style={{ width: "100%", margin: "10px 0" }}
                  title={"Create A New Syllabus"}
                  onClick={handleTrue}
                />
                {activeSyllabus ? (
                  <Button
                    style={{ width: "100%", margin: "10px 0" }}
                    title={"Edit Selected Syllabus"}
                    onClick={handleEdit}
                  />
                ) : null}
              </ProfileCardBody>
            </WizardCard>
          </WizardRightSideCard>
        </div>
      )}
    </div>
  );
}
