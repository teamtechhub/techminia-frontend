import React, { useContext } from "react";
import SignInForm from "./SignIn";
import SignOutForm from "./SignUp";
import ForgotPassForm from "./ForgotPass";
import { AuthContext } from "contexts/auth/auth.context";
import EmailConfirmationModal from "./emailConfirmation";
import LoginSuccessModal from "./loginConfirmation";
import { LeftPreview, ModalClose } from "./SignInOutForm.style";
import { CloseIcon } from "components/AllSvgIcon";
import { closeModal } from "@redq/reuse-modal";
import CompleteGoogleLogin from "./CompleteGoogleLogin";
import PasswordReset from "./passwordReset";
import PhoneVerification from "./PhoneVerification";
import { useLocation } from "react-router-dom";

export default function AuthenticationForm() {
  const { authState } = useContext(AuthContext);
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, "");
  const pathname = path[0] === "/" ? path.substr(1) : path;
  const isAuthPage = pathname === "auth";
  let RenderForm;

  if (authState.currentForm === "signIn") {
    RenderForm = SignInForm;
  }

  if (authState.currentForm === "signUp") {
    RenderForm = SignOutForm;
  }

  if (authState.currentForm === "forgotPass") {
    RenderForm = ForgotPassForm;
  }
  if (authState.currentForm === "resetPass") {
    RenderForm = PasswordReset;
  }
  if (authState.currentForm === "emailConfirm") {
    RenderForm = EmailConfirmationModal;
  }
  if (authState.currentForm === "loginSuccess") {
    RenderForm = LoginSuccessModal;
  }
  if (authState.currentForm === "completeGoogleLogin") {
    RenderForm = CompleteGoogleLogin;
  }
  if (authState.currentForm === "phoneVerification") {
    RenderForm = PhoneVerification;
  }

  return (
    <div style={{ display: "contents" }}>
      {isAuthPage ? null : (
        <ModalClose onClick={closeModal}>
          <CloseIcon />
        </ModalClose>
      )}

      <LeftPreview />
      <RenderForm />
    </div>
  );
}
