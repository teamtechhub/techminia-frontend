import React, { useEffect, useState } from "react";
import { axiosInstance, tokenConfig } from "utils/axios";
import TeacherClassses from "./TeacherClassses";
import TeacherWizard from "./TeacherWizard";

export default function TeacherDashboard({ profile }) {
  const [teacher, setTeacher] = useState({});
  const [viewClass, setViewClass] = useState(true);
  useEffect(() => {
    axiosInstance
      .get(`/account/teachers/profile`, tokenConfig())
      .then((res) => {
        setTeacher(res.data);
        console.log("==============ta", res.data);
        setViewClass(res.data.syllabus.length > 0);
      });
  }, []);
  return (
    <div>
      {viewClass ? (
        <TeacherClassses teacher={teacher} setView={setViewClass} />
      ) : (
        <TeacherWizard />
      )}
    </div>
  );
}
