import {
  Container,
  CardTitle,
  CardBody,
  Wrapper,
  Row,
  Column,
  ImageContainer,
  ImageInnerConatiner,
  Ratio,
  RatioInner,
} from "./About.style";
import { AreaHeading } from "./LandingPage.style";
import React, { useRef, useState } from "react";
import { useSpring, animated } from "react-spring";
import Fade from "react-reveal/Fade";

const cards = [
  {
    title: "Animated Video Lessons",
    description:
      "Enjoy learning like you never have before with our video lessons and interactive animations featuring our certified expert teachers.",
    image: "https://6jlvz1j5q3.csb.app/undraw_collection.svg",
    imageRatio: 784 / 1016,
    bgColor:
      "linear-gradient(180deg, rgb(236, 118, 35) 0%, rgb(101, 46, 141) 100%)",
  },
  {
    title: "Personalized Learning",
    description:
      "Monitor your own path to academic excellence at your own pace and improve your grades with our fun and exciting module, which is structured to work for students with different strength levels and needs.",
    image: "https://6jlvz1j5q3.csb.app/undraw_upload.svg",
    imageRatio: 839 / 1133,
    bgColor:
      "linear-gradient(180deg, rgb(236, 118, 35) 0%, rgb(101, 46, 141) 100%)",
  },
  {
    title: "E-library",
    description:
      "Immerse yourself in our affordable online library filled with relevant curriculum books, fiction books and set books.",
    image: "https://6jlvz1j5q3.csb.app/undraw_static_assets.svg",
    imageRatio: 730 / 1030,
    bgColor:
      "linear-gradient(180deg, rgb(236, 118, 35) 0%, rgb(101, 46, 141) 100%)",
  },
  {
    title: "Tuition with expert teachers",
    description:
      "Our team of passionate and talented teachers are excited to give you a one on one learning experience to prepare you for examinations such as Mock Exams and KCSE exams.",
    image: "https://6jlvz1j5q3.csb.app/undraw_upload.svg",
    imageRatio: 839 / 1133,
    bgColor:
      "linear-gradient(180deg, rgb(236, 118, 35) 0%, rgb(101, 46, 141) 100%)",
  },
];

function Card({ children }) {
  // We add this ref to card element and use in onMouseMove event ...
  // ... to get element's offset and dimensions.
  const ref = useRef();

  // Keep track of whether card is hovered so we can increment ...
  // ... zIndex to ensure it shows up above other cards when animation causes overlap.
  const [isHovered, setHovered] = useState(false);

  const [animatedProps, setAnimatedProps] = useSpring(() => {
    return {
      // Array containing [rotateX, rotateY, and scale] values.
      // We store under a single key (xys) instead of separate keys ...
      // ... so that we can use animatedProps.xys.interpolate() to ...
      // ... easily generate the css transform value below.
      xys: [0, 0, 1],
      // Setup physics
      config: { mass: 10, tension: 400, friction: 40, precision: 0.00001 },
    };
  });

  return (
    <animated.div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={({ clientX, clientY }) => {
        // Get mouse x position within card
        const x =
          clientX -
          (ref.current.offsetLeft -
            (window.scrollX || window.pageXOffset || document.body.scrollLeft));

        // Get mouse y position within card
        const y =
          clientY -
          (ref.current.offsetTop -
            (window.scrollY || window.pageYOffset || document.body.scrollTop));

        // Set animated values based on mouse position and card dimensions
        const dampen = 50; // Lower the number the less rotation
        const xys = [
          -(y - ref.current.clientHeight / 2) / dampen, // rotateX
          (x - ref.current.clientWidth / 2) / dampen, // rotateY
          1.07, // Scale
        ];

        // Update values to animate to
        setAnimatedProps({ xys: xys });
      }}
      onMouseLeave={() => {
        setHovered(false);
        // Set xys back to original
        setAnimatedProps({ xys: [0, 0, 1] });
      }}
      style={{
        // If hovered we want it to overlap other cards when it scales up
        zIndex: isHovered ? 2 : 1,
        // Interpolate function to handle css changes
        // transform: animatedProps.xys.interpolate(
        //   (x, y, s) =>
        //     `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
        // ),
        transform: animatedProps.xys.interpolate(
          (x, y, s) => `perspective(600px) scale(${s})`
        ),
      }}
    >
      {children}
    </animated.div>
  );
}

function Image({ ratio, src }) {
  return (
    <ImageContainer>
      <ImageInnerConatiner>
        <Ratio
          style={{
            paddingTop: ratio * 100 + "%",
          }}
        >
          <RatioInner>
            <img src={src} alt="img" />
          </RatioInner>
        </Ratio>
      </ImageInnerConatiner>
    </ImageContainer>
  );
}
function About() {
  return (
    <Container>
      <AreaHeading>
        <h3>What we offer</h3>
      </AreaHeading>
      <Wrapper>
        <Row>
          {cards.map((card, index) => (
            <Fade key={index} bottom duration={800} delay={index * 100}>
              <Column
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  padding: "40px",
                  boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.3)",
                  transition: "box-shadow 0.5s",
                  willChange: "transform",
                  borderRadius: "6px",
                  background:
                    "linear-gradient(180deg, rgb(236, 118, 35) 0%, rgb(101, 46, 141) 100%)",
                }}
              >
                <Card>
                  <Image ratio={card.imageRatio} src={card.image} />
                  <CardTitle>{card.title}</CardTitle>
                  <CardBody>{card.description}</CardBody>
                </Card>
              </Column>
            </Fade>
          ))}
        </Row>
      </Wrapper>
    </Container>
  );
}

export default About;
