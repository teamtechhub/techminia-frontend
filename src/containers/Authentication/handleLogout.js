/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "contexts/auth/auth.context";

function handleLogout() {
  const { authDispatch } = useContext(AuthContext);
  const history = useHistory();
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("darasa_auth_profile");
      localStorage.removeItem("darasa_auth_payload");
      localStorage.removeItem("darasa_auth_roles");
      localStorage.removeItem("darasa_applications");
      localStorage.removeItem("darasa_org_profile");
      localStorage.removeItem("darasa_individual_profile");
      authDispatch({ type: "SIGN_OUT" });
      history.push("/");
    }
  };
  return { handleLogout };
}

export default handleLogout;
