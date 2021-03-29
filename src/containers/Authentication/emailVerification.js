import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Wrapper, Container, Heading, SubHeading } from "./SignInOutForm.style";
import Error500 from "components/Error/Error500";
import LoadingIndicator from "components/LoadingIndicator";
import { openModal } from "@redq/reuse-modal";
import EmailVerificationModal from "./emailVerificationModal";
import SignInModal from "./SignIn";
import { axiosInstance } from "utils/axios";
import { logToConsole } from "utils/logging";

function EmailVerification() {
  let location = useLocation();
  let history = useHistory();
  logToConsole("the locatrion props: ", location);
  logToConsole("the history props: ", history);
  let query = new URLSearchParams(location.search);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleModal = (text, subtext) => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: () => EmailVerificationModal(text, subtext),
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
  const handleLogin = () => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: SignInModal,
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
  useEffect(() => {
    if (
      query.get("user_id") &&
      query.get("timestamp") &&
      query.get("signature")
    ) {
      const body = {
        user_id: query.get("user_id"),
        timestamp: query.get("timestamp"),
        signature: query.get("signature"),
      };
      try {
        axiosInstance
          .post(`/auth/verify-registration/`, body)
          .then(async (res) => {
            logToConsole("verification data", res.data);
            handleModal(
              "Verification Successful ✔",
              "Login to experience the full benefits of Darasa"
            );
            await new Promise((resolve) => setTimeout(resolve, 5000));
            handleLogin();
          })
          .catch((err) => {
            logToConsole(err);
            setError(err);
          });
      } catch (error) {
        logToConsole("catch errors: ", JSON.stringify(error));
      }
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <Error500 err={error} />;
  }
  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Wrapper style={{ paddingTop: "80px" }}>
      <Container>
        <Heading>Email Verification</Heading>

        <SubHeading>check your email for email confirmation</SubHeading>
      </Container>
    </Wrapper>
  );
}

export default EmailVerification;
