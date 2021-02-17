/*
 * NewTopicPage
 */

import React, { useState } from "react";
import { Formik, Form } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { CenteredSection, Section } from "./styles";
import Button from "components/Button/Button";
import { Plus } from "components/AllSvgIcon";
import { newTopicCall } from "./services";
import { apiErrorHandler } from "utils";
import { useAlert } from "react-alert";

export function NewTopicPage({ setNewTopic }) {
  const alert = useAlert();
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = (values, { setErrors, setSubmitting }) => {
    newTopicCall(values)
      .then((res) => {
        setInitialValues(res.data);
        if (setNewTopic) {
          setNewTopic(res.data);
        }
        alert.success(`${res.data.title} Added`);
      })
      .catch((err) => {
        err = apiErrorHandler(err);
      });
  };

  /* TODO create this form based on OPTION API call */
  /* TODO add validation errors info */

  return (
    <article>
      <Helmet>
        <title>New topic</title>
        <meta name="description" content="Djeddit react newtopic page" />
      </Helmet>
      <div>
        <CenteredSection>
          <h2>Create New Topic</h2>
        </CenteredSection>
        <Section>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {(formik) => {
              return (
                <Form
                  style={{ display: "block", alignItems: "center", zIndex: 10 }}
                >
                  <FormikControl
                    control="input"
                    type="text"
                    name={"title"}
                    label={"Title"}
                    style={{
                      background: "#fff",
                    }}
                  />
                  <FormikControl
                    control="textarea"
                    type="textarea"
                    name="description"
                    label={"Description"}
                    style={{
                      background: "#fff",
                    }}
                  />

                  <Button
                    type="submit"
                    size="small"
                    isLoading={formik.isSubmitting}
                    style={{
                      margin: "10px 0",
                      fontSize: 15,
                      height: "30px",
                      padding: "10px",
                    }}
                    icon={<Plus color="#fff" />}
                    title={`Create`}
                    disabled={!formik.isValid}
                  />
                </Form>
              );
            }}
          </Formik>
        </Section>
      </div>
    </article>
  );
}

NewTopicPage.propTypes = {
  newTopicActions: PropTypes.shape({
    newTopic: PropTypes.func.isRequired,
  }).isRequired,
  signedInUser: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};
