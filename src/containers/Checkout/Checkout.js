import React, { useContext, useState, useEffect } from "react";
import Button from "components/Button/Button";
import RadioCard from "components/RadioCard/RadioCard";
import RadioGroup from "components/RadioGroup/RadioGroup";
import PaymentGroup from "components/PaymentGroup/PaymentGroup";
import Loader from "components/Loader/Loader";
import { useMutation } from "@apollo/react-hooks";
import CheckoutWrapper, {
  CheckoutContainer,
  OrderSummary,
  OrderSummaryItem,
  OrderLabel,
  OrderAmount,
  Heading,
  ButtonGroup,
  Contact,
  PaymentOption,
  CheckoutSubmit,
  CouponBoxWrapper,
  ErrorMsg,
} from "./Checkout.style";

import CouponBox, { CouponDisplay } from "components/CouponBox/CouponBox";
import { ProfileContext } from "contexts/profile/profile.context";
import { useCart } from "contexts/cart/use-cart";
import { APPLY_COUPON } from "graphql/mutation/coupon";
import { useHistory } from "react-router-dom";

// The type of props Checkout Form receives

const Checkout = ({ token, deviceType }) => {
  const history = useHistory();
  const {
    removeCoupon,
    coupon,
    applyCoupon,
    clearCart,
    cartItemsCount,
    calculatePrice,
    calculateDiscount,
    calculateSubTotalPrice,
  } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setError] = useState("");
  const { state, dispatch } = useContext(ProfileContext);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const { address, contact, card, schedules } = state;

  const [appliedCoupon] = useMutation(APPLY_COUPON);

  const handleSubmit = async () => {
    setLoading(true);
    if (isValid) {
      clearCart();
      history.push("/order-received");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (
      calculatePrice() > 0 &&
      cartItemsCount > 0 &&
      address.length &&
      contact.length &&
      card.length &&
      schedules.length
    ) {
      setIsValid(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleApplyCoupon = async () => {
    const { data } = await appliedCoupon({
      variables: { code: couponCode },
    });
    if (data.applyCoupon && data.applyCoupon.discountInPercent) {
      applyCoupon(data.applyCoupon);
      setCouponCode("");
    } else {
      setError("Invalid Coupon");
    }
  };
  const handleOnUpdate = (couponCode) => {
    setCouponCode(couponCode);
  };

  return (
    <form>
      <CheckoutWrapper>
        <CheckoutContainer>
          <OrderSummary>
            <OrderSummaryItem style={{ marginBottom: 15 }}>
              <OrderLabel>Subtotal ({cartItemsCount} items)</OrderLabel>
              <OrderAmount>Ksh. {calculateSubTotalPrice()}</OrderAmount>
            </OrderSummaryItem>

            <OrderSummaryItem
              style={{ marginBottom: 30 }}
              className="voucherWrapper"
            >
              <OrderLabel>Voucher</OrderLabel>
              {coupon ? (
                <CouponDisplay
                  code={coupon.code}
                  sign="-"
                  currency="$"
                  price={calculateDiscount()}
                  onClick={(e) => {
                    e.preventDefault();
                    removeCoupon();
                  }}
                />
              ) : (
                <>
                  <CouponBoxWrapper>
                    <CouponBox
                      buttonTitle="Apply"
                      intlCouponBoxPlaceholder="couponPlaceholder"
                      onClick={handleApplyCoupon}
                      value={couponCode}
                      onUpdate={handleOnUpdate}
                      style={{ maxWidth: 350, height: 50 }}
                      intlCouponApplyButton="voucherApply"
                    />
                    {couponError && <ErrorMsg>{couponError}</ErrorMsg>}
                  </CouponBoxWrapper>
                </>
              )}
            </OrderSummaryItem>

            <OrderSummaryItem>
              <OrderLabel>Total</OrderLabel>
              <OrderAmount>Ksh. {calculatePrice()}</OrderAmount>
            </OrderSummaryItem>
          </OrderSummary>

          <Contact>
            <Heading>Mpesa and Contact Number</Heading>
            <ButtonGroup>
              <RadioGroup
                items={contact}
                component={(item) => (
                  <RadioCard
                    id={item.id}
                    key={item.id}
                    title={item.type}
                    content={item.number}
                    checked={item.type === "primary"}
                    onChange={() =>
                      dispatch({
                        type: "SET_PRIMARY_CONTACT",
                        payload: item.id.toString(),
                      })
                    }
                    name="contact"
                  />
                )}
              />
            </ButtonGroup>
          </Contact>
          {/* PaymentOption */}
          <PaymentOption>
            <Heading>Select Payment Option</Heading>
            <PaymentGroup name="payment" deviceType={deviceType} items={card} />
          </PaymentOption>
          {/* CheckoutSubmit */}
          <CheckoutSubmit>
            <Button
              onClick={handleSubmit}
              type="button"
              disabled={!isValid}
              title="Proceed to Checkout"
              // size='small'
              intlButtonId="proceesCheckout"
              loader={<Loader />}
              isLoading={loading}
            />
          </CheckoutSubmit>
        </CheckoutContainer>
      </CheckoutWrapper>
    </form>
  );
};

export default Checkout;
