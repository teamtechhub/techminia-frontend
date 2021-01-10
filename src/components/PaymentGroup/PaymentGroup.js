import React from "react";
import Carousel from "components/Carousel/Carousel";
import PaymentCard from "../PaymentCard/PaymentCard";
import {
  Header,
  PaymentCardList,
  SavedCard,
  OtherPayOption,
} from "./PaymentGroup.style";

const PaymentGroup = ({
  items,
  deviceType,
  className,
  name,
  onChange,
  onEditDeleteField,
  handleAddNewCard,
}) => {
  // RadioGroup State

  // Handle onChange Func
  const handleChange = (item) => {
    onChange(item);
  };
  return (
    <>
      {/* {deviceType === 'desktop' && ( */}
      <Header>
        {items.length !== 0 && <SavedCard>Saved Numbers</SavedCard>}
      </Header>
      <PaymentCardList>
        <Carousel
          deviceType={deviceType}
          autoPlay={false}
          infinite={false}
          data={items}
          component={(item) => (
            <PaymentCard
              key={item.id}
              onChange={() => handleChange(item)}
              onDelete={() => onEditDeleteField(item, "delete")}
              {...item}
            />
          )}
        />
      </PaymentCardList>

      <OtherPayOption>
        {/* Mobile Wallet */}
        {items.mobileWallet === true ? (
          <label
            htmlFor="mobile-wallet"
            key={`${name}-mobile-wa`}
            className="other-pay-radio"
          >
            <input
              type="radio"
              id="mobile-wallet"
              name={name}
              value="mobile-wallet"
              onChange={handleChange}
            />
            <span>Mobile Wallet</span>
          </label>
        ) : (
          ""
        )}

        {/* Cash On Delivery */}
        {items.cashOnDelivery === true ? (
          <label
            htmlFor="cash-on-delivery"
            key={`${name}-cash`}
            className="other-pay-radio cash-on-delivery"
          >
            <input
              type="radio"
              id="cash-on-delivery"
              name={name}
              value="cash-on-delivery"
              onChange={handleChange}
            />
            <span>Cash On Delivery</span>
          </label>
        ) : (
          ""
        )}
      </OtherPayOption>
    </>
  );
};

export default PaymentGroup;
