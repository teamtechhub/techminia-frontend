/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext } from "react";
import {
  axiosInstance,
  // tokenConfig,
} from "utils/axios";
import Error500 from "components/Error/Error500";
import { tokenConfig } from "utils/axios";
import AutoCompleteSelectField from "containers/FormikContainer/MultiAutocompleteSelectField/AutoCompleteSelectField";
import { WizardCard, WizardRightSideCard } from "../Dashboard.style";
import {
  ProfileContent,
  ProfileCardBody,
  ProfileCardHead,
} from "../../Profile/Profile.style";
import { AuthContext } from "contexts/auth/auth.context";

export default function Subject(props) {
  const {
    authState: { extendedProfile },
  } = useContext(AuthContext);
  const { classChange, subjectChange } = props;
  const [error, setError] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [update, setUpdate] = useState(false);
  const [activeClass, setActiveClass] = useState(false);
  const [activeSubject, setActiveSubject] = useState(false);

  useEffect(() => {
    classChange(activeClass);
    subjectChange(activeSubject);
    if (update) {
      axiosInstance
        .patch(`/curriculum/class/${activeClass.id}/`, {
          teachers: [extendedProfile.id],
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
    if (activeSubject) {
      axiosInstance
        .patch(`/curriculum/subject/${activeSubject.id}/`, {
          classes: [activeClass.id],
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeClass, activeSubject]);

  useEffect(() => {
    try {
      axiosInstance
        .get(`/curriculum/subject/`, tokenConfig())
        .then((res) => {
          console.log("res", res.data);
          setSubjects(res.data.results);
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data) {
              if (err.response.data.user) {
                setError(err.response.data);
              }
              setError(err.response.data);
            }
          } else {
            setError(err);
          }
        });
    } catch (error) {
      console.log(error);
    }
    try {
      axiosInstance
        .get(`/curriculum/class/`, tokenConfig())
        .then((res) => {
          console.log("res", res.data);
          setClasses(res.data.results);
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data.user) {
              setError(err.response.data);
            }
            setError(err.response.data);
          } else {
            setError(err);
          }
        });
    } catch (error) {
      console.log(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeClass, activeSubject, update]);

  const handleUpdate = () => {
    setUpdate(!update);
  };
  if (error) {
    return <Error500 err={error} />;
  }

  return (
    <div>
      <WizardRightSideCard>
        <WizardCard>
          <ProfileCardHead className="card-topline">
            <header>Select Class</header>
          </ProfileCardHead>
          <ProfileCardBody>
            <AutoCompleteSelectField
              control="select"
              label="Class"
              name="class"
              data={classes}
              collection={["title", "year"]}
              autofield={true}
              apipath={`/curriculum/class/`}
              handleUpdate={handleUpdate}
              handleChange={setActiveClass}
              arguements={{}}
              buttonStyle={{
                height: "100px",
                fontSize: "50px",
              }}
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
              fields={[
                {
                  name: "title",
                  type: "select",
                  control: "select",
                  label: null,
                  options: [
                    { value: "", key: "Select Type" },
                    { value: "Year", key: "Year" },
                    { value: "Class", key: "Class" },
                    { value: "Grade", key: "Grade" },
                    { value: "Form", key: "Form" },
                  ],
                  styles: { ">label": { display: "none" }, height: "30px" },
                },
                {
                  name: "year",
                  label: "Year",
                  type: "number",
                  control: "input",
                  styles: { height: "30px" },
                },
              ]}
            />
          </ProfileCardBody>
        </WizardCard>
      </WizardRightSideCard>

      <ProfileContent>
        <WizardCard>
          <ProfileCardHead className="card-topline">
            <header>Select Subject</header>
          </ProfileCardHead>
          <ProfileCardBody>
            <AutoCompleteSelectField
              label="Type Subject"
              name="name"
              data={subjects}
              autofield={true}
              apipath={`/curriculum/subject/`}
              handleUpdate={handleUpdate}
              handleChange={setActiveSubject}
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

      {/* <FormikControl options={["yes","no"]} control="toggle" label="Subject" name="se" /> */}
    </div>
  );
}
