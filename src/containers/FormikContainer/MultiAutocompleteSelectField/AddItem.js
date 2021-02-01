import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import _ from "lodash";
import FormikControl from "containers/FormikContainer/FormikControl";
import {
  axiosInstance,
  // tokenConfig,
} from "utils/axios";
import Button from "components/Button/Button";
import { tokenConfig } from "utils/axios";
import { useAlert } from "react-alert";
import { Plus } from "components/AllSvgIcon";

function getNameString(args, val) {
  var combo_name = "";
  for (let i = 0; i < args.length; i++) {
    const element = args[i];

    combo_name = combo_name + ` ${_.get(val, element, null)}`;
  }
  return combo_name;
}
export default function AddItem(props) {
  console.log(props);
  const {
    apipath,
    title,
    handleUpdate,
    fields,
    arguements,
    collection,
    inputValue,
    // setnewvalue,
  } = props;
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const alert = useAlert();
  useEffect(() => {
    if (fields) {
      setInitialValues({});
    } else {
      setInitialValues({ [title]: inputValue });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields, inputValue]);

  const validationSchema = Yup.object(
    fields
      ? fields.reduce((acc, val) => {
          acc[val.name] = Yup.string().required("Required");
          return acc;
        }, {})
      : { [title]: Yup.string().required("Required") }
  );

  const addNewItem = (values, { setErrors, setSubmitting }) => {
    console.log("loggin");
    console.log("the values", values);
    setSubmitting(true);
    setLoading(true);
    const data = arguements ? { ...arguements, ...values } : values;

    axiosInstance
      .post(apipath, data, tokenConfig())
      .then(async (res) => {
        console.log("res", res.data);
        await alert.success(
          `${
            collection
              ? getNameString(collection, res.data)
              : _.get(res.data, title, null)
          } Added Successfully ✔`
        );
        handleUpdate((val) => !val);
        // setnewvalue(
        //   collection
        //     ? getNameString(collection, res.data)
        //     : _.get(res.data, title, null)
        // );
        setSubmitting(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log("res errors", err);
        if (err.response) {
          if (err.response.data) {
            setErrors(err.response.data);
            if (err.response.data.message) {
              alert.error(err.response.data.message);
            } else {
              if (
                err.response.data.non_field_errors &&
                err.response.data.non_field_errors[0]
              ) {
                alert.show(
                  `${_.get(
                    data,
                    title,
                    getNameString(collection, data)
                  )} already added`
                );
              }
              if (err.response.data[0]) {
                alert.error(`${err.response.data[0]}`);
              }
              if (err.response.data.name) {
                alert.error(`${err.response.data.name}`);
              }
            }
          }
        }

        setSubmitting(false);
        setLoading(false);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={addNewItem}
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form style={{ display: "flex", zIndex: 10 }}>
            {fields ? (
              fields.map((field, index) => (
                <FormikControl
                  key={index}
                  style={field.styles}
                  control={field.control}
                  type={field.type}
                  name={field.name}
                  label={field.label}
                  options={field.options}
                />
              ))
            ) : (
              <FormikControl
                control="input"
                type="text"
                name={title}
                label={title}
                {...props}
              />
            )}

            <Button
              type="submit"
              size="small"
              isLoading={loading}
              //   title={formik.isSubmitting ? "Adding... " : "Add"}
              style={{
                margin: "10px 0",
                fontSize: 15,
                color: "#fff",
                height: "30px",
                padding: "10px",
                background: "transparent",
              }}
              icon={<Plus />}
              disabled={!formik.isValid}
              // onClick={(e) => AddNewItem(e, formik)}
            />
          </Form>
        );
      }}
    </Formik>
  );
}
