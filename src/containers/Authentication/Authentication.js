import React from "react";
import AuthenticationForm from "./Form";
import { AuthSection, AuthWrapper } from "./SignInOutForm.style";

const Authentication = () => {
  return (
    <AuthWrapper>
      <AuthSection>
        <AuthenticationForm />
      </AuthSection>
    </AuthWrapper>
  );
};

export default Authentication;
