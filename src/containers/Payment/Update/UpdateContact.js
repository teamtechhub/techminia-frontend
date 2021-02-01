import React, { useContext } from "react";
import FormikControl from "containers/FormikContainer/FormikControl";
import * as Yup from "yup";
import { closeModal } from "@redq/reuse-modal";
import { Formik, Form } from "formik";
import { ProfileContext } from "contexts/profile/profile.context";
import Button from "components/Button/Button";
import { FieldWrapper, Heading } from "./Update.style";
import { axiosInstance, tokenConfig } from "utils/axios";
import { useAlert } from "react-alert";

const ContactValidationSchema = Yup.object().shape({
  contact: Yup.string()
    .max(15, "Phone Number too long")
    .min(12, "Phone Number is invalid")
    .required("Phone Number is Required"),
});

const CreateOrUpdateContact = ({ item }) => {
  console.log(item);
  const initialValues = {
    id: item.id || null,
    name: item.name || "",
    contact: item.contact || "",
  };

  const { dispatch } = useContext(ProfileContext);
  const alert = useAlert();
  const handleSubmit = async (values, { setErrors, setSubmitting }) => {
    console.log(values);
    if (item !== "add-contact-modal") {
      console.log(item.length);
      await axiosInstance
        .put(
          `/account/contact/${item.id}/`,
          {
            name: values.name,
            contact: "+" + values.contact.replace(/[*?^${}()]|[-]|[ ]/g, ""),
          },
          tokenConfig()
        )
        .then((res) => {
          dispatch({ type: "ADD_OR_UPDATE_CONTACT", payload: res.data });
          alert.success("Contact Edited Successfully ✔");
          closeModal();
          setSubmitting(false);
        })
        .catch((err) => {
          if (err.response) {
            setErrors(err.response.data);
          }
          console.log(JSON.stringify(err, 4, null));
          setSubmitting(false);
        });
    } else {
      await axiosInstance
        .post(
          "/account/contact/",
          {
            name: values.name,
            contact: "+" + values.contact.replace(/[*?^${}()]|[-]|[ ]/g, ""),
          },
          tokenConfig()
        )
        .then((res) => {
          dispatch({ type: "ADD_OR_UPDATE_CONTACT", payload: res.data });
          alert.success("Contact Added Successfully ✔");
          closeModal();
          setSubmitting(false);
        })
        .catch((err) => {
          if (err.response) {
            setErrors(err.response.data);
          }
          console.log(JSON.stringify(err, 4, null));
          setSubmitting(false);
        });
    }

    console.log(values, "formik values");
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactValidationSchema}
    >
      {({ values, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <Heading>
            {item && item.id ? "Edit Contact" : "Add New Contact"}
          </Heading>
          <FieldWrapper>
            <FormikControl
              control="input"
              type="phone"
              label="Phone Number"
              placeholder="e.g. +254 722-123123"
              name="contact"
            />
            <FormikControl
              control="input"
              type="text"
              label="Name of Contact"
              placeholder="Mine / Mother / Father / Mr ..."
              name="name"
            />
          </FieldWrapper>

          <Button
            disabled={isSubmitting}
            type="submit"
            title="Save Contact"
            size="medium"
            fullwidth={true}
          />
        </Form>
      )}
    </Formik>
  );
};

export default CreateOrUpdateContact;
