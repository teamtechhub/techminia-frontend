import React from "react";
import MPesa from "./image/m-pesa.webp";
import {
  PaymentCardWrapper,
  CardLogo,
  CardNumber,
  CardNumTitle,
  Name,
} from "./PaymentCard.style";

const Card = ({ id, name, color }) => {
  const logo = MPesa;

  return (
    <PaymentCardWrapper className="payment-card" color={color}>
      <CardLogo>
        <img src={logo} alt={`card-${id}`} />
      </CardLogo>
      <CardNumTitle>MPesa Number</CardNumTitle>
      <CardNumber>
        <span>*</span>
        <span className="card-number">+254722000000</span>
        <span>*</span>
      </CardNumber>
      <Name>{name}</Name>
    </PaymentCardWrapper>
  );
};

export default Card;
