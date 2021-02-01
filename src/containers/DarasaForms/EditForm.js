import React, { useEffect, useState } from "react";
import {
  ProfileContent,
  ProfileCardBody,
  ProfileCardHead,
} from "pages/Profile/Profile.style";
import { WizardCard } from "pages/Dashboard/Dashboard.style";
import { Formik, Form } from "formik";
import QuestionTab from "./QuestionTab";
import {
  axiosInstance,
  formTokenConfig,
  // tokenConfig,
} from "utils/axios";
import FormikControl from "containers/FormikContainer/FormikControl";
import Button from "components/Button/Button";
import { FormWrapper } from "pages/Profile/Profile.style";
import { tokenConfig } from "utils/axios";
import { useRouteMatch } from "react-router-dom";
import { useAlert } from "react-alert";

export default function EditForm({ formDetails }) {
  const match = useRouteMatch();
  const alert = useAlert();
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    axiosInstance
      .get(`/form/${match.params.formID}`, tokenConfig())
      .then((res) => {
        setInitialValues(res.data);
      });
  }, [match.params.formID]);

  async function onSubmit(values, { setErrors, setSubmitting }) {
    console.log("values=========", values);

    const the_code =
      formDetails.code === null ? { code: formDetails.id } : null;
    const all_data = { ...values, ...the_code };

    let formData = new FormData();
    console.log("========apapa=======", Object.keys(values).length);
    for (let f = 0; f < Object.keys(values).length; f++) {
      await formData.append(
        `${Object.keys(all_data)[f]}`,
        Object.values(all_data)[f]
      );
    }
    console.log("=======ooo========", JSON.stringify(formData));
    await axiosInstance
      .put(`/form/${formDetails.uuid}/`, formData, formTokenConfig())
      .then((res) => {
        console.log(res);
        alert.success(`${res.data.title} Updates Successfully`);
        setInitialValues(res.data);
      });
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <ProfileContent style={{ width: "100%" }}>
                <WizardCard>
                  <ProfileCardHead
                    className="card-topline"
                    style={{ textAlign: "center" }}
                  >
                    <FormikControl
                      control="input"
                      type="text"
                      label={
                        formDetails.title === "" || formDetails.title === null
                          ? "Untitled Form"
                          : formDetails.title
                      }
                      name="title"
                    />
                    <FormikControl
                      control="color"
                      type="color"
                      label={`Background `}
                      name="background_color"
                    />
                    <FormikControl
                      control="color"
                      type="color"
                      label={`Text `}
                      name="text_color"
                    />
                    <span>Form as Quiz/Assessment</span>
                    <FormikControl
                      style={{ textAlign: "right" }}
                      options={["yes", "no"]}
                      control="toggle"
                      label="As Quiz/Assessment"
                      name="is_quiz"
                    />
                  </ProfileCardHead>
                  <ProfileCardBody
                    style={{
                      textAlign: "center",
                      background: formik.values.background_color,
                      color: formik.values.text_color,
                    }}
                  >
                    <FormWrapper
                      style={{
                        color: formik.values.text_color,
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      <div>
                        <FormikControl
                          control="input"
                          type="file"
                          // setFieldValue={formik.setFieldValue}
                          label="Background Image"
                          name="background_image"
                          minimal
                        />
                      </div>
                      <div style={{ display: "block" }}>
                        <FormikControl
                          control="textarea"
                          type="textarea"
                          label="Confirmation Message"
                          name="confirmation_message"
                        />

                        <FormikControl
                          control="textarea"
                          type="textarea"
                          label="Form Description"
                          name="description"
                        />
                        <br />
                        <br />
                        <Button
                          type="submit"
                          size="small"
                          title={
                            formik.isSubmitting ? "Changing... " : "Change"
                          }
                          isSubmitting={formik.isSubmitting}
                          style={{
                            fontSize: 15,
                            color: "#fff",
                          }}
                        />
                      </div>
                    </FormWrapper>
                  </ProfileCardBody>
                </WizardCard>
                <div
                  style={{
                    maxWidth: "950px",
                    alignItems: "center",
                    margin: "0 auto",
                  }}
                >
                  <QuestionTab formDetails={formDetails} />
                </div>
              </ProfileContent>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
