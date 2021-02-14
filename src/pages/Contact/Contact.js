import Portfolio from "pages/LandingPage/Portfolio";
import Subscribe from "pages/LandingPage/Subscribe";
import FooterContainer from "containers/Footer/Footer";
import React from "react";
import { Site } from "pages/LandingPage/LandingPage.style";

export default function Contact() {
  return (
    <>
      <Site style={{ marginTop: "50px" }}>
        {/* <Portfolio /> */}
        <Subscribe />
      </Site>

      <FooterContainer />
    </>
  );
}
