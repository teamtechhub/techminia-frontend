import React from "react";
import {
  P,
  H3,
  Container,
  FormSect,
  Wrapper,
  Content,
  SubscribeFooter,
  Section,
} from "./Subscribe.style";
import { AreaHeading } from "./LandingPage.style";
import { Formik, Form } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import * as Yup from "yup";
import Button from "components/Button/Button";
import Fade from "react-reveal/Fade";

function Subscribe() {
  const emailNotLongEnough = "email must be at least 3 characters";
  const emailRequired = "Please enter an email address";
  const invalidEmail = "email must be a valid email";

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .min(3, emailNotLongEnough)
      .max(100)
      .email(invalidEmail)
      .required(emailRequired),
  });
  const onSubmit = (values) => {
    console.log("Sorry", values.email, ", Subscription service is yet to run");
  };
  return (
    <Section>
      <Container>
        <Fade bottom duration={800} delay={100}>
          <AreaHeading>
            <h3>Join Our Email List</h3>
          </AreaHeading>
        </Fade>

        <SubscribeFooter>
          <Fade left duration={800} delay={200}>
            <Content>
              <H3>Like👍 our service? Subscribe👌</H3>
              <P>
                We have more than thousand of students and creative teachers and
                stat joining our e-learning platform
              </P>
            </Content>
          </Fade>
          <Fade right duration={800} delay={300}>
            <FormSect>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formik) => {
                  return (
                    <Form>
                      <FormikControl
                        control="input"
                        type="email"
                        label="Enter Email Address"
                        name="email"
                      />

                      <Button
                        type="submit"
                        disabled={!formik.isValid}
                        title={
                          formik.isSubmitting ? "Subscribing... " : "Subscribe"
                        }
                        style={{ top: "0", margin: "10px", color: "#ffffff" }}
                      />
                    </Form>
                  );
                }}
              </Formik>
            </FormSect>
          </Fade>
        </SubscribeFooter>

        <Wrapper></Wrapper>
      </Container>
    </Section>
  );
}
export default Subscribe;
