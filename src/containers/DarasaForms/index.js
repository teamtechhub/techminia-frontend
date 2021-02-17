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
import LoadingIndicator from "components/LoadingIndicator";
import { AuthContext } from "contexts/auth/auth.context";
import PaymentModal from "components/PaymentModal";
import { openModal } from "@redq/reuse-modal";

export default function DarasaForms() {
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const history = useHistory();
  const match = useRouteMatch();
  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState(3);

  const [forms, setForms] = useState([]);

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
    return <LoadingIndicator />;
  }

  let all_forms = null;

  if (forms.length > 0) {
    all_forms = forms.reduce((acc, p) => {
      const found = acc.find((a) => a.subject === p.subject_names);
      const value = { ...p };
      if (found === undefined) {
        acc.push({
          subject: p.subject_names,
          class: p.class_names,
          forms: [value],
        });
      } else {
        found.forms.push(value);
      }
      return acc;
    }, []);
  }

  const handleModal = () => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: PaymentModal,
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

  const renderCard = (singleForm) => {
    return (
      <div
        onClick={() => {
          handleSelectForm(singleForm);
        }}
        key={singleForm.id}
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
              {singleForm.title === "" || singleForm.title === null
                ? "Untitled Form"
                : singleForm.title}
            </h3>
          </div>
          <div className="back">
            <h6>
              {singleForm.title === "" || singleForm.title === null
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
  };

  return (
    <ProfileContent
      style={
        profile.is_teacher
          ? { width: "100%", marginBottom: "75px" }
          : profile.subscription &&
            profile.subscription.state.toString() === "1"
          ? { width: "100%", marginBottom: "75px" }
          : {
              width: "100%",
              marginBottom: "75px",
              pointerEvents: "none",
              cursor: "help",
            }
      }
      onClick={
        profile.is_teacher
          ? null
          : profile.subscription &&
            profile.subscription.state.toString() === "1"
          ? null
          : handleModal
      }
    >
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
              title={forms.length > 0 ? `New Assessment` : `Add Assessment`}
            />
          ) : null}
          <br />
          <br />

          {all_forms === null ? <LoadingIndicator /> : null}
          {all_forms !== null &&
            all_forms.map((subject_cat, _i) => {
              return (
                <div key={_i}>
                  <h4 style={{ float: "left", color: "#652e8d" }}>
                    {subject_cat.subject} ({subject_cat.class})
                  </h4>
                  <br />
                  <br />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    {subject_cat.forms.length > 0 ? (
                      <>
                        {subject_cat.forms
                          .slice(0, more)
                          .map((singleForm, i) => {
                            return renderCard(singleForm);
                          })}
                        {subject_cat.forms.length > more && (
                          <Button
                            style={{ margin: "auto 0" }}
                            onClick={() => setMore(more + 3)}
                            title={`View More`}
                          />
                        )}
                      </>
                    ) : (
                      <h5>Oops! No Assessments Yet</h5>
                    )}
                  </div>
                </div>
              );
            })}
        </ProfileCardBody>
      </WizardCard>
    </ProfileContent>
  );
}
