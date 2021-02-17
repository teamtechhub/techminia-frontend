/*
 * NewThreadPage
 */

import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";

import { Helmet } from "react-helmet";
import { CenteredSection, Section } from "./styles";
import Button from "components/Button/Button";
import { Plus } from "components/AllSvgIcon";
import { newThreadCall } from "./services";
import { getTopic } from "../Topics/services";
import { apiErrorHandler } from "utils";
import { useAlert } from "react-alert";

export function NewThreadPage({ setNewThread }) {
  const match = useRouteMatch();
  const alert = useAlert();
  const [topic, setTopic] = useState({});
  const [initialValues, setInitialValues] = useState({
    title: "",
    content: "",
    topic_slug: match.params.topicSlug,
  });

  useEffect(() => {
    // load topic if we navigate url by reloading page
    getTopic(match.params.topicSlug)
      .then((res) => setTopic(res.data))
      .catch((err) => {
        alert.error(`${apiErrorHandler(err)}`);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (values, { setErrors, setSubmitting }) => {
    newThreadCall(values)
      .then((res) => {
        setInitialValues(res.data);
        if (setNewThread) {
          setNewThread(res.data);
        }
        alert.success(`${res.data.title} Added`);
      })
      .catch((err) => {
        alert.error(`${apiErrorHandler(err)}`);
      });
  };

  // const markdownConverter = new Showdown.Converter({
  //   tables: true,
  //   simplifiedAutoLink: true,
  //   strikethrough: true,
  //   tasklists: true,
  // })

  /* TODO create this form based on OPTION API call */
  /* TODO add validation errors info */

  return (
    <article>
      <Helmet>
        <title>New Thread</title>
        <meta name="description" content="Djeddit react newThread page" />
      </Helmet>
      <div>
        <CenteredSection>
          <h2>Create new thread on the {topic.title}</h2>
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
                  <div>
                    <label>Content</label>
                    <FormikControl
                      control="content"
                      type="textarea"
                      name="content"
                      label={"Description"}
                      style={{
                        background: "#fff",
                      }}
                    />
                  </div>

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
