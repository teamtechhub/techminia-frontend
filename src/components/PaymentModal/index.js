import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "components/Button/Button";
import { AuthContext } from "contexts/auth/auth.context";
import signupImg from "images/signup.jpg";
import { closeModal } from "@redq/reuse-modal";

export default function PaymentModal() {
  const history = useHistory();
  const {
    authState: { profile },
  } = useContext(AuthContext);
  return (
    <div
      style={{
        textAlign: "center",
        background: "#f7f7f7",
      }}
    >
      Hi <strong>{profile.surname}</strong>, Just one more step ...
      <br />
      Select a Subscription plan and pay to continue using Darasa."
      <br />
      <img
        style={{ height: "150px", borderRadius: "50%" }}
        src={signupImg}
        alt="tsignup"
      />
      <br />
      <Button
        onClick={() => {
          history.push(`/dashboard/payment`);
          closeModal();
        }}
        title={`Make Payment`}
      />
    </div>
  );
}
