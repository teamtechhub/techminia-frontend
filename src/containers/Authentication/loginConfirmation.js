import React, { useContext } from "react";
import {
  Wrapper,
  Container,
  Heading,
  SubHeading,
  LinkButton,
  Offer,
} from "./SignInOutForm.style";
import { AuthContext } from "contexts/auth/auth.context";

export default function LoginSuccessModal() {
  const { authDispatch } = useContext(AuthContext);
  const toggleSignInForm = () => {
    authDispatch({
      type: "SIGNIN",
    });
  };
  return (
    <Wrapper>
      <Container style={{ paddingBottom: 30 }}>
        <Heading>Login Successful ✔</Heading>

        <SubHeading>Welcome to Darasa</SubHeading>

        <Offer style={{ padding: "20px 0 0" }}>
          Back to" <LinkButton onClick={toggleSignInForm}>Logout</LinkButton>
        </Offer>
      </Container>
    </Wrapper>
  );
}
