import React, { useContext, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import { axiosInstance } from "utils/axios";
import { tokenConfig } from "utils/axios";
import {
  ProfileContent,
  ProfileCardBody,
  ProfileCardHead,
} from "pages/Profile/Profile.style";
import { WizardCard } from "pages/Dashboard/Dashboard.style";
import Button from "components/Button/Button";
import SingleForm from "./SingleForm";
import "./style.scss";
import Loader from "components/Loader/Loader";
import { AuthContext } from "contexts/auth/auth.context";

export default function DarasaForms() {
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const history = useHistory();
  const match = useRouteMatch();
  const [loading, setLoading] = useState(true);

  const [forms, setForms] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance.get(`/form`, tokenConfig()).then(async (res) => {
      const data = res.data.results.filter(
        (fd) => fd.questions.length > 0 || fd.creator === profile.id
      );
      await setForms(data);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectForm = (selectedForm) => {
    history.push(`/dashboard/form/${selectedForm.uuid}`);
  };

  function createForm() {
    axiosInstance.post(`/form/`, {}, tokenConfig()).then((res) => {
      history.push(`/dashboard/form/${res.data.uuid}/edit`);
    });
  }

  if (match.params.formID) {
    return <SingleForm />;
  }
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <ProfileContent style={{ width: "100%", marginBottom: "75px" }}>
        <WizardCard>
          <ProfileCardHead
            className="card-topline"
            style={{ textAlign: "center" }}
          >
            Forms
          </ProfileCardHead>
          <ProfileCardBody style={{ textAlign: "center" }}>
            {profile.is_teacher ? (
              <Button
                onClick={createForm}
                title={forms.length > 0 ? `New Form` : `Add Form`}
              />
            ) : null}
            <br />
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {forms && forms.length > 0 ? (
                forms.map((singleForm, i) => {
                  return (
                    <div
                      onClick={() => {
                        handleSelectForm(singleForm);
                      }}
                    >
                      <div className="flip">
                        <div
                          className="front"
                          style={
                            singleForm.background_image
                              ? {
                                  backgroundImage: `url(${
                                    singleForm.background_image
                                      ? singleForm.background_image
                                      : "https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb"
                                  })`,
                                }
                              : { background: singleForm.background_color }
                          }
                        >
                          <h3 className="text-shadow">
                            {singleForm.title === "" ||
                            singleForm.title === null
                              ? "Untitled Form"
                              : singleForm.title}
                          </h3>
                        </div>
                        <div className="back">
                          <h6>
                            {singleForm.title === "" ||
                            singleForm.title === null
                              ? "Untitled Form"
                              : singleForm.title}
                          </h6>
                          <p>
                            {singleForm.description === ""
                              ? "No Description ..."
                              : singleForm.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : !forms ? (
                <Loader />
              ) : (
                <h5>Oops! You have No Questions Yet</h5>
              )}
              {}
            </div>
          </ProfileCardBody>
        </WizardCard>
      </ProfileContent>
    </>
  );
}
