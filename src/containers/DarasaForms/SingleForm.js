import LoadingIndicator from "components/LoadingIndicator";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useRouteMatch } from "react-router-dom";
import { axiosInstance, tokenConfig } from "utils/axios";
import EditForm from "./EditForm";
import ViewForm from "./ViewForm";
import { AuthContext } from "contexts/auth/auth.context";
import { logToConsole } from "utils/logging";

export default function SingleForm() {
  const match = useRouteMatch();
  const location = useLocation();
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const [formDetails, setFormDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const path = location.pathname.replace(/\/+$/, "");
  const pathname = path[0] === "/" ? path.substr(1) : path;
  const isEditPage =
    pathname.substring(pathname.lastIndexOf("/") + 1) === "edit";

  useEffect(() => {
    setLoading(true);
    var formId = match.params.formID;
    if (formId !== undefined) {
      axiosInstance.get(`/form/${match.params.formID}/`, tokenConfig()).then(
        async (data) => {
          // logToConsole(data);
          await setFormDetails(data.data);
          setLoading(false);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          logToConsole(resMessage);
        }
      );
    }
  }, [match.params.formID]);

  if (formDetails.length) {
    return <LoadingIndicator />;
  }
  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : isEditPage && profile.id === formDetails.creator ? (
        <EditForm formDetails={formDetails} />
      ) : (
        <ViewForm formDetails={formDetails} />
      )}
    </>
  );
}
