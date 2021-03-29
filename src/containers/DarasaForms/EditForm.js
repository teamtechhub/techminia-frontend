import React, { useState } from "react";
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
import { useAlert } from "react-alert";
import { toFormData } from "utils";
import { logToConsole } from "utils/logging";

export default function EditForm({ formDetails }) {
  const alert = useAlert();
  const [initialValues, setInitialValues] = useState(formDetails);

  async function onSubmit(values, { setErrors, setSubmitting }) {
    const the_code =
      formDetails.code === null ? { code: formDetails.id } : null;
    const all_data = { ...values, ...the_code };

    await axiosInstance
      .patch(
        `/form/${formDetails.uuid}/`,
        toFormData({ old: initialValues, new: all_data }),
        formTokenConfig()
      )
      .then((res) => {
        logToConsole(res);
        alert.success(`${res.data.title} Updated Successfully`);
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
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundImage: `url(${
                        formik.values.background_image ||
                        "https://lh3.googleusercontent.com/A45mBe_6UR6DnieoI4xZvX6oImdxRaaugLOTgaU0h77OSFPc1Q0R_h2HTdbfLIpAM6TQ_iAcEe4E7hDPsvMFlVmFHIqV2VXmZIroZQ3POBofXMBr7y8Xz08PMt9YXBb00quDYCyh92KqY9Zk"
                      })`,
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
                            formik.isSubmitting ? "Saving... " : "Save Form"
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
