import LoadingIndicator from "components/LoadingIndicator";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { axiosInstance, tokenConfig } from "utils/axios";
import { FormHeader } from "./df.style";
import { ProfileContent, ProfileCardHead } from "pages/Profile/Profile.style";
import { WizardCard } from "pages/Dashboard/Dashboard.style";
import Button from "components/Button/Button";
import { AuthContext } from "contexts/auth/auth.context";
import QuestionTabWizard from "./QuestionTabMultiStep";
import PaymentModal from "components/PaymentModal";
import { logToConsole } from "utils/logging";

export default function ViewForm() {
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const history = useHistory();
  const match = useRouteMatch();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/form/${match.params.formID}`, tokenConfig())
      .then(async (res) => {
        await setForm(res.data);
        setLoading(false);
      });
  }, [match.params.formID]);
  logToConsole(form);

  function editForm() {
    history.push(`/dashboard/form/${match.params.formID}/edit`);
  }

  return (
    <div style={{ alignItems: "center", margin: "0 auto" }}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <ProfileContent style={{ width: "100%" }}>
            <WizardCard style={{ minHeight: 0 }}>
              <ProfileCardHead
                className="card-topline"
                style={{ textAlign: "center" }}
              >
                <header>{form.title}</header>
                {profile.is_teacher && profile.id === form.creator ? (
                  <Button
                    onClick={editForm}
                    style={{ float: "right", margin: "5px" }}
                    title={`Edit`}
                  />
                ) : null}
              </ProfileCardHead>
            </WizardCard>
          </ProfileContent>
          <div
            style={{
              display: "table",
              margin: "0 auto",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormHeader
              style={{
                backgroundColor: form.background_color,
                backgroundImage: `url(${
                  form.background_image ||
                  "https://lh3.googleusercontent.com/A45mBe_6UR6DnieoI4xZvX6oImdxRaaugLOTgaU0h77OSFPc1Q0R_h2HTdbfLIpAM6TQ_iAcEe4E7hDPsvMFlVmFHIqV2VXmZIroZQ3POBofXMBr7y8Xz08PMt9YXBb00quDYCyh92KqY9Zk"
                })`,
              }}
            />
            {profile.is_teacher ? (
              <QuestionTabWizard form={form} />
            ) : profile.subscription &&
              profile.subscription.state.toString() === "1" ? (
              <QuestionTabWizard form={form} />
            ) : (
              PaymentModal
            )}
          </div>
        </>
      )}
    </div>
  );
}
