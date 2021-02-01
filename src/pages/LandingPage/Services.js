import React from "react";
import { Card, Container, Row, Wrapper, Column } from "./Services.style";
import Fade from "react-reveal/Fade";
import Img from "images/login-1.png";
import { AreaHeading } from "./LandingPage.style";
const services = [
  {
    title: "Expolore",
    description: "Video Lessons",
    image: Img,
  },
  {
    title: "Two Title",
    description: "breif description two",
    image: Img,
  },
  {
    title: "Three Title",
    description: "breif description three",
    image: Img,
  },
  {
    title: "Four Title",
    description: "breif description four",
    image: Img,
  },
];
function Services() {
  return (
    <Container>
      <AreaHeading></AreaHeading>
      <Wrapper>
        <Row>
          {services.map((service, index) => (
            <Fade key={index} bottom duration={800} delay={index * 100}>
              <Column>
                <Card>
                  <div className="cards card__service">
                    <img
                      src={service.image}
                      className="img-responsive"
                      alt="img"
                    />
                    <span className="card__service__rect-1">
                      <span className="shadow-1"></span>
                      <p>{service.description}</p>
                    </span>
                    <span className="card__service__rect-2">
                      <span className="shadow-2"></span>
                    </span>
                    <span className="card__service__circle"></span>
                    <ul className="card__service__list">
                      <li>
                        <h5>{service.title}</h5>
                      </li>
                    </ul>
                  </div>
                </Card>
              </Column>
            </Fade>
          ))}
        </Row>
      </Wrapper>
    </Container>
  );
}
export default Services;
