import React from "react";
import { Site } from "./LandingPage.style";
import Slider from "./Slider";
import FooterContainer from "containers/Footer/Footer";
import About from "./About";
// import Services from "./Services";
// import Portfolio from "./Portfolio";
import VideoCarousel from "./VideoCarousel";
import PaymentPlan from "./PaymentPlan";

function LandingPage({ deviceType }) {
  return (
    <>
      <Slider />
      <Site>
        {/* <Services /> */}

        <About />
        <PaymentPlan />
        <VideoCarousel deviceType={deviceType} />
      </Site>
      <FooterContainer />
    </>
  );
}
export default LandingPage;
