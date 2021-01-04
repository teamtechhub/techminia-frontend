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

export default function EmailConfirmationModal() {
  const { authDispatch } = useContext(AuthContext);
  const toggleSignInForm = () => {
    authDispatch({
      type: "SIGNIN",
    });
  };
  return (
    <Wrapper>
      <Container style={{ paddingBottom: 30 }}>
        <Heading>Registration Successful ✔</Heading>

        {/* <SubHeading>Check your email for email confirmation</SubHeading> */}
        <SubHeading>Log in to use Darasa</SubHeading>

        <Offer style={{ padding: "20px 0 0" }}>
          Back to" <LinkButton onClick={toggleSignInForm}>Login</LinkButton>
        </Offer>
      </Container>
    </Wrapper>
  );
}
