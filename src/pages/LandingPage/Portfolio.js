import React from "react";
import {
  Section,
  Container,
  Row,
  ColLeft,
  ImgBox,
  ImgBoxBorder,
  Img,
  Box2,
  ColRight,
  Content,
} from "./Portfolio.style";
import { AreaHeading } from "./LandingPage.style";
import IMG from "images/login-1.png";
import Button from "components/Button/Button";
import Fade from "react-reveal/Fade";

function Portfolio() {
  return (
    <Section>
      <Container>
        <AreaHeading>
          <h3>Get to Know us</h3>
        </AreaHeading>
        <Row>
          <ColLeft>
            <ImgBox>
              <Fade left duration={800} delay={100}>
                <ImgBoxBorder>
                  <Img
                    classname="styleBox-img1"
                    src={IMG}
                    alt=""
                    data-pagespeed-url-hash="1954519329"
                    onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
                  />
                </ImgBoxBorder>
              </Fade>
              <Fade left duration={600} delay={300}>
                <Box2>
                  <span>Darasa</span>
                  <p>e-learning</p>
                </Box2>
              </Fade>
            </ImgBox>
          </ColLeft>
          <ColRight>
            <Content>
              <Fade right duration={800} delay={300}>
                <h4>🧐Explore with us!🤔</h4>
              </Fade>
              <Fade right duration={800} delay={400}>
                <p>
                  If you are looking at blank cassettes on the web lorem ipsum
                  dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam. Eiusmod tempor incididunt ut labore et dolore
                  magna aliqua consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Fade>
              <Button
                title="Get Started"
                style={{
                  fontWeight: "500",
                  fontSize: 15,
                  color: "#fff",
                  background:
                    "linear-gradient(90deg, rgba(236,118,35,1) 0%, rgba(101,46,141,1) 100%)",
                }}
              />
            </Content>
          </ColRight>
        </Row>
      </Container>
    </Section>
  );
}

export default Portfolio;
