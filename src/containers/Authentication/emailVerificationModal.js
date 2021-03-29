import React from "react";
import { Wrapper, Container, Heading, SubHeading } from "./SignInOutForm.style";
import { logToConsole } from "utils/logging";

export default function EmailVerificationModal(text, subtext, fx) {
  logToConsole("text", text);
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
