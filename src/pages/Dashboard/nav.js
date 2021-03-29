import React from "react";
/* eslint react/prop-types: 0 */
import "./nav.scss";
import { ProfileContent, ProfileCardBody } from "pages/Profile/Profile.style";
import { WizardCard } from "./Dashboard.style";
import { logToConsole } from "utils/logging";

const Nav = (props) => {
  logToConsole(props);
  const dots = [];
  logToConsole(props);
  for (let i = 1; i <= props.totalSteps; i += 1) {
    const isActive = props.currentStep === i;
    dots.push(
      <span
        key={`step-${i}`}
        className={`dot ${isActive ? "nav-active" : ""}`}
        onClick={() => props.goToStep(i)}
      >
        {isActive ? (
          props.currentIcon
        ) : props.icons[i - 1] ? (
          props.icons[i - 1]
        ) : (
          <>&bull;</>
        )}
      </span>
    );
  }

  return (
    <ProfileContent>
      <WizardCard style={{ minHeight: 0 }}>
        <ProfileCardBody>
          <div className={"nav"}>{dots}</div>
        </ProfileCardBody>
      </WizardCard>
    </ProfileContent>
  );
};

export default Nav;
