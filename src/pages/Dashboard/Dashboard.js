import React, { useContext } from "react";
import { AuthContext } from "contexts/auth/auth.context";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";

function Dashboard() {
  const {
    authState: { profile },
  } = useContext(AuthContext);
  return (
    <>
      {profile.is_student && <StudentDashboard profile={profile} />}
      {profile.is_teacher && <TeacherDashboard profile={profile} />}
    </>
  );
}

export default Dashboard;
