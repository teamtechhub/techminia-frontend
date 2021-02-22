import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "components/Button/Button";
import { AuthContext } from "contexts/auth/auth.context";
import signupImg from "images/signup.jpg";

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
        onClick={() => history.push(`/dashboard/payment`)}
        title={`Make Payment`}
      />
    </div>
  );
}
