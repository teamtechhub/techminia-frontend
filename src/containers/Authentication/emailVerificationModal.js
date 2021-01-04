import React from "react";
import { Wrapper, Container, Heading, SubHeading } from "./SignInOutForm.style";

export default function EmailVerificationModal(text, subtext, fx) {
  console.log("text", text);
  return (
    <Wrapper>
      <Container style={{ paddingBottom: 30 }}>
        {text ? (
          <>
            <Heading>{text}</Heading>
            {subtext ? <SubHeading>{subtext}</SubHeading> : null}
            {fx ? <SubHeading>{fx}</SubHeading> : null}
          </>
        ) : (
          <Heading>Check your email for Verification</Heading>
        )}
      </Container>
    </Wrapper>
  );
}
