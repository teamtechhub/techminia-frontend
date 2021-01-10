import React from "react";
import Card from "./Card";
import { CloseIcon } from "../AllSvgIcon";
import { DeleteButton, Wrapper } from "./PaymentCard.style";

const PaymentCard = ({
  className,
  onChange,
  onDelete,
  name,
  id,
  type,
  color,
}) => {
  function handleChange() {
    onChange();
  }
  function handleDelete() {
    onDelete();
  }
  return (
    <Wrapper
      htmlFor={`payment-card-${id}`}
      className={`payment-card-radio ${className ? className : ""}`}
    >
      <input
        type="radio"
        id={`payment-card-${id}`}
        name={name}
        value={`payment-card-${id}`}
        onChange={handleChange}
        checked={type === "primary"}
      />

      <Card id={`card-${id}`} color={color} name={name} />

      <DeleteButton
        // type="submit"
        onClick={handleDelete}
        className="card-remove-btn"
      >
        <CloseIcon />
      </DeleteButton>
    </Wrapper>
  );
};

export default PaymentCard;
