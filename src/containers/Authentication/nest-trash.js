import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "containers/FormikContainer/FormikControl";
import Button from "components/Button/Button";
import { useAlert } from "react-alert";
import StepWizard from "containers/Multistep/Multistep";

export default function Nest() {
  const alert = useAlert();
  const [initialValues, setInitialValues] = useState({});
  const [state, setState] = useState({
    isAnswer: false,
    transitions: {
      enterRight: `animated enterRight`,
      enterLeft: `animated enterLeft`,
      exitRight: `animated exitRight`,
      exitLeft: `animated exitLeft`,
      intro: `animated intro`,
    },
  });
  useEffect(() => {
    setInitialValues({
      one: "",
      two: {
        three: "",
        four: "",
      },
    });
  }, []);
  const validationSchema = Yup.object({
    one: Yup.string().min(3, "one").max(100).required("three"),

    two: Yup.object({
      three: Yup.string().min(3, "one").max(100).email("two").required("three"),

      four: Yup.string().min(3, "ficev").max(100).required("six"),
    }),
  });
  const onSubmit = (values, { setSubmitting }) => {
    alert.show(JSON.stringify(values));
    console.log(values);
    alert.show("submitting");
  };
  const setInstance = (SW) => {
    setState({
      ...state,
      SW,
    });
  };
  const { SW } = state;

  return (
    <div style={{ padding: "100px" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <StepWizard isHashEnabled={true} instance={setInstance}>
                <div name={`profile-details`}>
                  <FormikControl
                    control="input"
                    type="text"
                    label="one"
                    name="one"
                  />{" "}
                </div>
                <div name={`teacher-details`}>
                  <FormikControl
                    control="input"
                    type="text"
                    label="three"
                    name="two.three"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label="four"
                    name="two.four"
                  />
                </div>
              </StepWizard>
              {SW && (
                <>
                  {SW.currentStep === SW.totalSteps ? (
                    <>
                      <Button
                        style={{ float: "left" }}
                        title={`< Check Profile`}
                        onClick={() => {
                          SW.previousStep();
                        }}
                      />
                      <Button
                        title={`login`}
                        type="submit"
                        // disabled={!formik.isValid}
                      />
                    </>
                  ) : (
                    <Button
                      style={{ float: "right" }}
                      title={`Teacher Details`}
                      onClick={() => {
                        SW.nextStep();
                      }}
                    />
                  )}
                </>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
