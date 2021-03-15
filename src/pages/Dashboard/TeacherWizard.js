import StepWizard from "containers/Multistep/Multistep";
import React, { useEffect, useState } from "react";
// import Nav from "./nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./wizard.scss";
import "./transitions.scss";
import Subject from "./forms/subject";
import Syllabus from "./forms/syllabus";
import Session from "./forms/session";
import {
  ProfileContent,
  ProfileCardBody,
  ProfileCardHead,
} from "pages/Profile/Profile.style";
import { WizardCard } from "./Dashboard.style";
import Button from "components/Button/Button";
import Topic from "./forms/topic";
import { axiosInstance, tokenConfig } from "utils/axios";
import { useHistory } from "react-router-dom";
import { faBook, faPlayCircle } from "@fortawesome/fontawesome-free-solid";

export default function TeacherWizard() {
  const [state, updateState] = useState({
    form: {},
    transitions: {
      enterRight: `animated enterRight`,
      enterLeft: `animated enterLeft`,
      exitRight: `animated exitRight`,
      exitLeft: `animated exitLeft`,
      intro: `animated intro`,
    },
  });
  const [subject, setSubject] = useState(false);
  const [teacherClass, setTeacherClass] = useState(false);
  const [syllabus, setSyllabus] = useState(false);
  const [topic, setTopic] = useState(false);
  const [session, setSession] = useState(false);
  const [globalState, setGlobalState] = useState({});

  useEffect(() => {
    setGlobalState({
      subject: subject,
      class: teacherClass,
      syllabus: syllabus,
      topics: topic,
      session: session,
    });
  }, [subject, teacherClass, syllabus, topic, session]);

  // Do something on step change
  const onStepChange = (stats) => {
    // console.log(stats);
  };
  console.log("global state", globalState);

  const setInstance = (SW) => {
    updateState({
      ...state,
      SW,
    });
  };
  const nextStep = (check) => {
    if (check) {
      alert.info(`Select Required Field to proceed`);
    } else {
      return false;
    }
  };

  const { SW } = state;

  return (
    <div>
      <StepWizard
        onStepChange={onStepChange}
        // isHashEnabled={true}
        // nav={<Nav />}
        instance={setInstance}
      >
        <Subject
          name={"Subject and Class"}
          globalState={globalState}
          subjectChange={setSubject}
          classChange={setTeacherClass}
          Icon={<FontAwesomeIcon icon={faBook} className="icon" />}
        />
        <Syllabus
          name={"Syllabus"}
          syllabusChange={setSyllabus}
          selectedClass={teacherClass}
          selectedSubject={subject}
          Icon={<FontAwesomeIcon icon={faPlayCircle} className="icon" />}
        />
        <Topic
          name={"Topic"}
          topicChange={setTopic}
          selectedSyllabus={syllabus}
          Icon={<FontAwesomeIcon icon={faPlayCircle} className="icon" />}
        />
        <Session
          name={"Lesson"}
          sessionChange={setSession}
          selectedClass={teacherClass}
          selectedSyllabus={syllabus}
          selectedSubject={subject}
          selectedTopic={topic}
          Icon={<FontAwesomeIcon icon={faPlayCircle} className="icon" />}
        />
      </StepWizard>
      <br />
      <br />
      {SW && (
        <WizardController
          nextStepState={nextStep}
          globalState={globalState}
          SW={SW}
        />
      )}
    </div>
  );
}

/** Demo of using instance */
const WizardController = ({ SW, globalState }) => {
  const history = useHistory();
  function createForm() {
    console.log("the button was pressd-- for adding assessment")
    axiosInstance.post(`/form/`, {}, tokenConfig()).then((res) => {
      axiosInstance
        .patch(
          `/curriculum/syllabus/${globalState.syllabus.id}/`,
          {
            assessments: [res.data.id],
          },
          tokenConfig()
        )
        .then((response) => {
          if (response.status === 200) {
            history.push(`/dashboard/form/${res.data.uuid}/edit`);
          } else {
          }
        });
    });
  }
  return (
    <ProfileContent style={{ width: "100%" }}>
      <WizardCard>
        <ProfileCardHead
          className="card-topline"
          style={{ textAlign: "center" }}
        >
          {SW.currentStep === 1 ? null : (
            <Button
              style={{
                width: "100%",
                maxWidth: "200px",
                borderRadius: "30px 5px ",
              }}
              title={`< ${SW.previousStepName}`}
              onClick={SW.previousStep}
            />
          )}

          <header>Continue to Next step</header>

          {SW.currentStep === SW.totalSteps ? null : (
            <Button
              style={{
                width: "100%",
                maxWidth: "200px",
                borderRadius: "5px 30px ",
              }}
              title={`${SW.nextStepName} >`}
              onClick={SW.nextStep}
            />
          )}
        </ProfileCardHead>
        <ProfileCardBody style={{ textAlign: "center" }}>
          {globalState ? (
            globalState.subject ? (
              <h4 style={{ color: "#22c622", textDecoration: "underline" }}>
                {globalState.subject.name} ✔
              </h4>
            ) : (
              <h5 style={{ color: "#cacaca" }}>Subject Not Set</h5>
            )
          ) : null}
          {globalState ? (
            globalState.class ? (
              <h4 style={{ color: "#22c622", textDecoration: "underline" }}>
                {globalState.class.title} {globalState.class.year} ✔
              </h4>
            ) : (
              <h5 style={{ color: "#cacaca" }}>Class Not Set </h5>
            )
          ) : null}
          {globalState ? (
            globalState.syllabus ? (
              <>
                <h4 style={{ color: "#22c622", textDecoration: "underline" }}>
                  {globalState.syllabus.name} ✔
                </h4>
                <Button onClick={createForm} title={`Add Assesment / Quiz`} />
              </>
            ) : (
              <h5 style={{ color: "#cacaca" }}> Syllabus Not Set </h5>
            )
          ) : null}
          {globalState ? (
            globalState.topics ? (
              <h4 style={{ color: "#22c622", textDecoration: "underline" }}>
                {globalState.topics.name} ✔
              </h4>
            ) : (
              <h5 style={{ color: "#cacaca" }}> Topics Not Set </h5>
            )
          ) : null}
          {globalState ? (
            globalState.session ? (
              <h4 style={{ color: "#22c622", textDecoration: "underline" }}>
                {globalState.session.video_url} ✔
              </h4>
            ) : (
              <h5 style={{ color: "#cacaca" }}>Lesson Not Added </h5>
            )
          ) : null}
          &nbsp;
        </ProfileCardBody>
      </WizardCard>
    </ProfileContent>
  );
};
