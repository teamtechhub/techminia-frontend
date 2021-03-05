import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
// import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import Section from "./Section";
import AwesomeSlider from "react-awesome-slider";
import styled from "styled-components";
import blob from "images/home_page/blob.png";
import { BannerWrapper, FloatingImage } from "./slider.style";
import CustomParticles from "./Particles";
import Button from "components/Button/Button";
// import boy from "images/guy-01.png";
import favboylap from "images/fav-lap.png";
import { themeGet } from "@styled-system/theme-get";
import { AuthContext } from "contexts/auth/auth.context";
import Sticky from "react-stickynode";

import lady from "images/lady.png";
import leafs from "images/home_page/leaves.png";
export const StyledAwesomeSlider = styled(AwesomeSlider)`
  height: 100vh;
  .awssld__controls__arrow-left:before,
  .awssld__controls__arrow-left:after,
  .awssld__controls__arrow-right:before,
  .awssld__controls__arrow-right:after {
    background-color: ${themeGet("colors.primary", "#652e8d")};
  }

  .awssld__content {
    background: transparent;
    > div {
      width: 100%;
    }
  }
  .awssld--organic-arrow-color {
    color: #ec7623;
  }
`;

// const AutoplaySlider = withAutoplay(StyledAwesomeSlider);

function Slider() {
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = useContext(AuthContext);

  const history = useHistory();
  const handleGetStarted = () => {
    if (!isAuthenticated) {
      authDispatch({
        type: "SIGNUP",
      });

      history.push("/auth/");
    } else {
      history.push("/dashboard/");
    }
  };
  const sections = [
    {
      heading: " The Coolest",
      subHeading: "Study Buddy!",
      bannerCaption: (
        <div>
          Darasa is the first of its kind in Kenya!
          <br />
          You deserve high-quality, affordable and easily accessible education
          <br /> to help you maximize your academic achievement <br />
          and be the very best you can be as you journey towards
          <br /> the future that awaits you beyond school.
        </div>
      ),
      cta: (
        <Button
          title="Get Started"
          onClick={handleGetStarted}
          className=" lg:ml-64"
          style={{
            fontWeight: "500",
            fontSize: 15,
            color: "#fff",
            background:
              "linear-gradient(90deg, rgba(236,118,35,1) 0%, rgba(101,46,141,1) 100%)",
          }}
        />
      ),
    },
  ];
  return (
    // <CustomParticles>
    <BannerWrapper
      style={{
        width: "100%",
        backgroundColor: "#d1eafd",
        backgroundImage: `linear-gradient(to right, #ffffff14, #ffffff14), url(${blob})`,
      }}
    >
      {/* <div style={{ position: "relative", bottom: "50px" }}>
          <FloatingImage src={favboylap} alt="pics" className="ml-32 lg:right-2/3" />
        </div> */}
      <Section
        heading={sections[0].heading}
        subHeading={sections[0].subHeading}
        bannerCaption={sections[0].bannerCaption}
        cta={sections[0].cta}
      />

      {/* <AutoplaySlider
          play={true}
          cancelOnInteraction={false} // should stop playing on user interaction
          interval={20000}
          style={{ width: "100%" }}
        >
          {sections.map((section, i) => (
            <div style={{ width: "100%" }} key={i}>
              <Section
                heading={section.heading}
                subHeading={section.subHeading}
                bannerCaption={section.bannerCaption}
                cta={section.cta}
              />
            </div>
          ))}
        </AutoplaySlider> */}
      <div
        style={{
          position: "absolute",
          left: "30px",
          top: "520px",
          zIndex: 9999,
        }}
      >
        <img
          src={lady}
          className="hidden  md:inline-block"
          height="220px"
          alt="lady  not found"
          width="150px"
        />
      </div>
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "540px",
          zIndex: 0,
        }}
      >
        <img src={leafs} alt="leafs  not found" height="150px" width="150px" />
      </div>
    </BannerWrapper>
    // </CustomParticles>
  );
}
export default Slider;
