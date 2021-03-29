import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import AllClasses from "./AllClasses";
import Class from "./Class";
import Session from "./Session";
import { logToConsole } from "utils/logging";

export default function Classes() {
  const match = useRouteMatch();
  const [view, setView] = useState(false);
  const [RenderView, setComponent] = useState(<Class />);

  const classID = match.params.classID;
  const subjectID = match.params.subjectID;
  const teacherID = match.params.teacherID;
  const topicID = match.params.topicID;
  const sessionID = match.params.sessionID;

  useEffect(() => {
    if (sessionID) {
      setView("session");
      setComponent(<Session view={view} />);
    }
    if (!sessionID && topicID) {
      setView("topic");
      setComponent(<Session view={view} />);
    }
    if (!sessionID && !teacherID && subjectID) {
      setView("subject");
      setComponent(<Session view={view} />);
    }
    if (!classID) {
      setView("classes");
      setComponent(<AllClasses view={view} />);
    }
    if (!sessionID && !teacherID && !subjectID && classID) {
      setView("class");
      setComponent(<Class view={view} />);
    }
  }, [view, classID, subjectID, teacherID, topicID, sessionID]);
  logToConsole(view);

  return RenderView;
}
