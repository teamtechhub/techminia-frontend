/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useState, useEffect, useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import moment from "moment";
import {
  CardWrapper,
  FormWrapper,
  ProfileCard,
  ProfileCardBody,
  ProfileSidebar,
} from "./Profile.style";
import FormikControl from "containers/FormikContainer/FormikControl";
import { useStickyDispatch } from "contexts/app/app.provider";
import { useAppState } from "contexts/app/app.provider";
import {
  axiosInstance,
  formTokenConfig,
  // tokenConfig,
} from "utils/axios";
import { addObjectToLocalStorageObject } from "utils";
import Button from "components/Button/Button";
import { AuthContext } from "contexts/auth/auth.context";
// import LogoImage from "images/logo.png";
import { openModal } from "@redq/reuse-modal";
import EmailVerificationModal from "containers/Authentication/emailVerificationModal";
import LoadingIndicator from "components/LoadingIndicator";
import Error500 from "components/Error/Error500";
import ProfileView from "./ProfileView";
import { Br } from "styles/pages.style";
import { useAlert } from "react-alert";
import TeacherForm from "./TeacherForm";
import StudentForm from "./StudentForm";
import { logToConsole } from "utils/logging";

function Profile() {
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const [initialValues, setInitialValues] = useState();
  const useDispatch = useStickyDispatch();
  const setView = useCallback(() => useDispatch({ type: "VIEW" }), [
    useDispatch,
  ]);
  const setEdit = useCallback(() => useDispatch({ type: "EDIT" }), [
    useDispatch,
  ]);
  const currentForm = useAppState("currentForm");
  const isEdit = currentForm === "edit";
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const alert = useAlert();
  useEffect(() => {
    setView();

    setTimeout(() => {
      setInitialValues({
        avatar: profile.avatar,
        date_of_birth: profile.date_of_birth,
        email: profile.email,
        gender: profile.gender,
        other_names: profile.other_names,
        phone_number: profile.phone_number,
        surname: profile.surname,
        about: profile.about,
      });

      setLoading(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const genderOptions = [
    { value: "", key: "Select Gender" },
    { value: "Male", key: "Male" },
    { value: "Female", key: "Female" },
  ];

  const emailNotLongEnough = "email must be at least 3 characters";
  const emailRequired = "Please enter an email address";
  const invalidEmail = "email must be a valid email";

  const validationSchema = Yup.object({
    surname: Yup.string().required("Required"),
    other_names: Yup.string().required("Required"),
    email: Yup.string()
      .min(3, emailNotLongEnough)
      .max(100)
      .email(invalidEmail)
      .required(emailRequired),
    gender: Yup.mixed().required("Required"),
    about: Yup.mixed().required("Required"),
    avatar: Yup.mixed()
      // .test("should not be blank", " Should not be blank", function (value) {
      //   if (
      //     typeof value !== "string" &&
      //     typeof value !== undefined &&
      //     value !== null
      //   ) {
      //     return true;
      //   }
      //   return false;
      // })
      .required("Profile Image is Required"),
    date_of_birth: Yup.date()
      .test(
        "Date of Birth",
        "Should be greather than 13 years",
        function (value) {
          return moment().diff(moment(value), "years") >= 13;
        }
      )
      .required("Required")
      .nullable(),
    phone_number: Yup.string()
      .max(15, "Phone Number too long")
      .min(12, "Phone Number is invalid")
      .required("Phone Number is Required"),
  });

  const handleModal = (text, subtext) => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: () => EmailVerificationModal(text, subtext),
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: 458,
        height: "auto",
      },
    });
  };

  const onSubmit = (values, { setErrors, setSubmitting }) => {
    logToConsole(values);
    const {
      avatar,
      date_of_birth,
      email,
      gender,
      other_names,
      phone_number,
      surname,
      about,
    } = values;
    let formData = new FormData();
    logToConsole("type of image", typeof avatar);

    formData.append("avatar", avatar);
    formData.append("surname", surname);
    formData.append("other_names", other_names);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("about", JSON.stringify(about));
    formData.append(
      "date_of_birth",
      moment(date_of_birth).format("YYYY-MM-DD")
    );
    formData.append(
      "phone_number",
      phone_number.replace(/[*?^${}()]|[-]|[ ]/g, "")
    );

    logToConsole("body values ", formData, values);

    setSubmitting(true);
    setLoading(true);
    try {
      axiosInstance
        .patch(`/auth/profile/`, formData, formTokenConfig())
        .then((res) => {
          setSubmitting(false);
          logToConsole("res", res.data);
          logToConsole("res", res.data.about);
          addObjectToLocalStorageObject("darasa_auth_profile", res.data);
          // handleModal("Profile Edited Successfully ✔", "");
          alert.success("Profile Edited Successfully ✔");
          setLoading(false);
        })
        .catch((err) => {
          if (err.response) {
            setErrors(err.response.data);
          } else {
            setError(err);
          }
          logToConsole(JSON.stringify(err, 4, null));
          setSubmitting(false);
          setLoading(false);
        });
    } catch (error) {
      setError(error);
    }
  };

  if (error) {
    return <Error500 err={error} />;
  }

  return (
    <>
      <CardWrapper>
        <h4>
          Profile{" "}
          <Button
            onClick={isEdit ? setView : setEdit}
            size="small"
            title={isEdit ? `View Profile` : `Edit Profile`}
            style={{
              fontSize: 15,
              color: "#652e8d",
              backgroundColor: "#ec7623",
              float: "right",
            }}
          />
        </h4>
      </CardWrapper>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          {currentForm === "edit" && (
            <>
              <ProfileSidebar>
                <ProfileCard className="card-topline">
                  <ProfileCardBody>
                    <FormWrapper>
                      {profile.is_teacher && (
                        <TeacherForm
                          profile={profile}
                          handleModal={handleModal}
                        />
                      )}
                      {profile.is_student && (
                        <StudentForm
                          profile={profile}
                          handleModal={handleModal}
                        />
                      )}
                    </FormWrapper>
                  </ProfileCardBody>
                </ProfileCard>
              </ProfileSidebar>

              <ProfileCard className="card-topline">
                <ProfileCardBody>
                  <FormWrapper>
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
                              label="Email"
                              name="email"
                              onClick={
                                profile.is_email_verified
                                  ? () =>
                                      handleModal(
                                        "Oops!",
                                        "Sorry, cant edit email after verification"
                                      )
                                  : null
                              }
                              readOnly={
                                profile.is_email_verified ? true : false
                              }
                            />

                            <FormikControl
                              control="input"
                              type="text"
                              label="Surname"
                              name="surname"
                            />
                            <FormikControl
                              control="input"
                              type="text"
                              label="Other Names"
                              name="other_names"
                            />
                            <FormikControl
                              control="date"
                              label="Birth Date"
                              name="date_of_birth"
                              type="date"
                              // setFieldValue={formik.setFieldValue}
                            />
                            <FormikControl
                              control="select"
                              label="Gender"
                              name="gender"
                              options={genderOptions}
                            />
                            <FormikControl
                              control="input"
                              type="phone"
                              label="Phone Number"
                              placeholder="e.g. +254 722-123123"
                              name="phone_number"
                              onClick={
                                profile.is_phone_verified
                                  ? () =>
                                      handleModal(
                                        "Oops!",
                                        "Sorry, cant edit phone after verification"
                                      )
                                  : null
                              }
                              readOnly={
                                profile.is_phone_verified ? true : false
                              }
                            />

                            <FormikControl
                              control="input"
                              type="file"
                              setFieldValue={formik.setFieldValue}
                              label="Profile Image"
                              name="avatar"
                            />
                            <FormikControl
                              control="textarea"
                              label="About Yourself"
                              name="about"
                              rte={true}
                              fullWidth
                            />

                            <Br />
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
                              // disabled={!formik.isValid}
                            />
                          </Form>
                        );
                      }}
                    </Formik>
                  </FormWrapper>
                </ProfileCardBody>
              </ProfileCard>
            </>
          )}
        </>
      )}
      {currentForm === "view" && <ProfileView profileID={profile.id} />}
    </>
  );
}
export default Profile;
