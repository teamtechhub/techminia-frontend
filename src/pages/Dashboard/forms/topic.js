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

export default function Topic(props) {
  const { selectedSyllabus, topicChange } = props;
  const alert = useAlert();
  const [initialValues, setInitialValues] = useState({});
  const [editting, setEditting] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState([]);
  const [creating, setCreating] = useState(false);
  const [activeTopic, setActiveTopic] = useState();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    topicChange(activeTopic);
    if (activeTopic) {
      setInitialValues(activeTopic);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTopic]);

  useEffect(() => {
    if (selectedSyllabus) {
      try {
        axiosInstance
          .get(
            `/curriculum/topic/?syllabus=${selectedSyllabus.id}`,
            tokenConfig()
          )
          .then((res) => {
            console.log("res", res.data);
            setTopic(res.data.results);
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
  }, [update, selectedSyllabus]);

  const topicValidationSchema = Yup.object({
    name: Yup.string().required("Required"),
    description_json: Yup.mixed().required("Required"),
  });

  function handleTrue() {
    setCreating(true);
  }
  function handleEdit() {
    setActiveTopic(false);
    setEditting(true);
    setCreating(true);
  }
  function handleFalse() {
    setCreating(false);
  }

  const onAddSubmit = (values, { setErrors, setSubmitting }) => {
    if (selectedSyllabus) {
      setSubmitting(true);
      setLoading(true);
      const { background_image, description_json, name } = values;
      let formData = new FormData();
      formData.append("syllabus", selectedSyllabus.id);
      formData.append("name", name);
      if (typeof background_image !== "string") {
        formData.append("background_image", background_image);
      }
      formData.append("description_json", JSON.stringify(description_json));
      console.log(values);

      try {
        axiosInstance
          .post(`/curriculum/topic/`, formData, formTokenConfig())
          .then((res) => {
            console.log("res", res.data);
            setInitialValues(res.data);
            setActiveTopic(res.data);
            alert.success(`${res.data.name} Created Successfully ✔`);
            setEditting(true);
            setInitialValues(res.data);
            addObjectToLocalStorageObject("darasa_topic_profile", res.data);
            setSubmitting(false);
            setLoading(false);
          })
          .catch((err) => {
            console.log("res errors", err.response.data);
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
            console.log(err.response.data);
            setSubmitting(false);
            setLoading(false);
          });
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    } else {
      alert.info("Select or add Syllabus");
    }
  };
  const onChangeSubmit = async (values, { setErrors, setSubmitting }) => {
    if (selectedSyllabus) {
      setSubmitting(true);
      setLoading(true);
      const { background_image, description_json, name } = values;
      let formData = new FormData();

      formData.append("syllabus", selectedSyllabus.id);
      formData.append("name", name);
      console.log(typeof background_image);
      if (typeof background_image !== "string") {
        formData.append("background_image", background_image);
      }
      formData.append("description_json", JSON.stringify(description_json));
      console.log(values);
      try {
        axiosInstance
          .patch(
            `/curriculum/topic/${initialValues.id}/`,
            formData,
            formTokenConfig()
          )
          .then((res) => {
            setSubmitting(false);
            setLoading(false);
            setInitialValues(res.data);
            setActiveTopic(res.data);
            alert.success(`${res.data.name} Updated Successfully ✔`);
            addObjectToLocalStorageObject("darasa_topic_profile", res.data);
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
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    } else {
      alert.info("Select or add Syllabus");
    }
  };
  const handleUpdate = () => {
    setUpdate(!update);
  };
  if (error) {
    return <Error500 err={error} />;
  }

  return (
    <div>
      {creating ? (
        <Formik
          initialValues={initialValues}
          validationSchema={topicValidationSchema}
          onSubmit={editting ? onChangeSubmit : onAddSubmit}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form style={{ display: "flex", flexWrap: "wrap" }}>
                <WizardLeftSideCard>
                  <WizardCard>
                    <ProfileCardHead className="card-topline">
                      <header>Create Topic</header>
                    </ProfileCardHead>
                    <ProfileCardBody>
                      <FormikControl
                        control="input"
                        type="text"
                        label="Topic Name"
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
                        label={`Background Image For Topic`}
                        name="background_image"
                      />
                    </ProfileCardBody>
                  </WizardCard>
                </WizardLeftSideCard>
                <ProfileContent>
                  <WizardCard>
                    <ProfileCardHead className="card-topline">
                      <header>About the topic</header>
                      <Button
                        size="small"
                        title={"Select Existing Topic"}
                        style={{ float: "right", fontSize: 15, color: "#fff" }}
                        onClick={handleFalse}
                      />
                    </ProfileCardHead>
                    <ProfileCardBody>
                      <FormikControl
                        control="textarea"
                        label="About the topic"
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
                        title={editting ? `Edit Topic` : "Create Topic"}
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
                <header>Select a Sub topic</header>
              </ProfileCardHead>
              <ProfileCardBody>
                <AutoCompleteSelectField
                  label="Sub topic"
                  name="name"
                  data={topic}
                  autofield={true}
                  apipath={`/curriculum/topic/`}
                  handleUpdate={handleUpdate}
                  arguements={{
                    syllabus: selectedSyllabus ? selectedSyllabus.id : null,
                  }}
                  handleChange={setActiveTopic}
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
                  title={"Create A New Detailed Topic"}
                  onClick={handleTrue}
                />
                {activeTopic ? (
                  <Button
                    style={{ width: "100%", margin: "10px 0" }}
                    title={"Edit Selected Topic"}
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
