import React, { useContext } from "react";
import {
  A,
  Amount,
  Container,
  Wrapper,
  Row,
  Column,
  Card,
  PaymentButton,
  // Arrow,
} from "./PaymentPlan.style";
import { AreaHeading } from "./LandingPage.style";
import { AuthContext } from "contexts/auth/auth.context";
import { useHistory } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { openModal, closeModal } from "@redq/reuse-modal";
import AuthenticationForm from "containers/Authentication/Form";

const cards = [
  {
    id: 1,
    type: "Monthly",
    amount: 999,
    save: 0,
    color: "#ac3581",
  },
  {
    id: 2,
    type: "6 months",
    amount: 5000,
    save: 1000,
    color: "#ed145b",
  },
  {
    id: 3,
    type: "12 months",
    amount: 10000,
    save: 2000,
    color: "#ef5927",
  },
];
function PaymentPlan(deviceType) {
  const history = useHistory();

  const {
    authState: { isAuthenticated },
    authDispatch,
  } = useContext(AuthContext);
  const handleJoin = () => {
    authDispatch({
      type: "SIGNIN",
    });

    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: false,
      component: AuthenticationForm,
      componentProps: { deviceType, closeModal },
      closeComponent: "div",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: 458,
        height: "auto",
      },
    });
  };

  function cardNavigation(isAuthenticated) {
    isAuthenticated ? history.push("/dashboard/payment") : handleJoin();
  }
  return (
    <Container>
      <AreaHeading>
        <h3>Choose the plan that's right for you</h3>
        <p>You can change these options any time</p>
      </AreaHeading>
      <Wrapper>
        <Row>
          {cards.map((card, index) => (
            <Fade key={index} bottom duration={800} delay={index * 100}>
              <Column
                onClick={() => cardNavigation(isAuthenticated)}
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.3)",
                  transition: "box-shadow 0.5s",
                  willChange: "transform",
                  borderRadius: "6px",
                }}
              >
                <Card style={{ background: card.color, color: card.color }}>
                  <A>
                    <Amount>
                      <h1>{card.amount.toLocaleString()}</h1>
                      {card.save > 0 ? (
                        <p>Save {card.save.toLocaleString("en")}</p>
                      ) : null}
                    </Amount>
                    <PaymentButton style={{ color: card.color }}>
                      {/* <Arrow style={{ backgroundColor: card.color }}></Arrow> */}
                      {card.type}
                    </PaymentButton>
                  </A>
                </Card>
              </Column>
            </Fade>
          ))}
        </Row>
      </Wrapper>
    </Container>
  );
}

export default PaymentPlan;
