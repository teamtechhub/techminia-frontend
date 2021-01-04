import React, { useState } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {
  CartPopupBody,
  PopupHeader,
  PopupItemCount,
  CloseButton,
  PromoCode,
  CheckoutButtonWrapper,
  CheckoutButton,
  Title,
  PriceBox,
  NoProductMsg,
  NoProductImg,
  ItemWrapper,
  CouponBoxWrapper,
  CouponCode,
  ErrorMsg,
} from "./Cart.style";
import { CURRENCY } from "constants/constants";
import CouponBox from "components/CouponBox/CouponBox";

import { Scrollbars } from "react-custom-scrollbars";
import { useCart } from "contexts/cart/use-cart";
import { CartItem } from "components/CartItem/CartItem";

import { NoCartBag, CloseIcon, ShoppingBagLarge } from "components/AllSvgIcon";

const APPLY_COUPON = gql`
  mutation applyCoupon($code: String!) {
    applyCoupon(code: $code) {
      id
      code
      discountInPercent
    }
  }
`;

const Cart = ({ style, className, onCloseBtnClick, scrollbarHeight }) => {
  const {
    items,
    coupon,
    addItem,
    removeItem,
    removeItemFromCart,
    cartItemsCount,
    calculatePrice,
    applyCoupon,
  } = useCart();
  const [couponText, setCoupon] = useState("");
  const [displayCoupon, showCoupon] = useState(false);
  const [error, setError] = useState("");
  const [appliedCoupon] = useMutation(APPLY_COUPON);

  const handleApplyCoupon = async () => {
    const { data } = await appliedCoupon({
      variables: { code: couponText },
    });
    if (data.applyCoupon && data.applyCoupon.discountInPercent) {
      setError("");
      applyCoupon(data.applyCoupon);
      setCoupon("");
    } else {
      setError("Invalid Coupon");
    }
  };

  const handleChange = (e) => {
    setCoupon(e.currentTarget.value);
  };

  const toggleCoupon = () => {
    showCoupon(true);
  };

  return (
    <CartPopupBody className={className} style={style}>
      <PopupHeader>
        <PopupItemCount>
          <ShoppingBagLarge width="19px" height="24px" />
          <span>
            {cartItemsCount}
            &nbsp;
            {cartItemsCount > 1 ? "items" : "item"}
          </span>
        </PopupItemCount>

        <CloseButton onClick={onCloseBtnClick}>
          <CloseIcon />
        </CloseButton>
      </PopupHeader>

      <Scrollbars
        universal
        autoHide
        autoHeight
        autoHeightMax={scrollbarHeight}
        renderView={(props) => (
          <div
            {...props}
            style={{
              ...props.style,
              marginLeft: 0,
              marginRight: props.style.marginRight,
            }}
          />
        )}
      >
        <ItemWrapper className="items-wrapper">
          {!!cartItemsCount ? (
            items.map((item) => (
              <CartItem
                key={`cartItem-${item.id}`}
                onIncrement={() => addItem(item)}
                onDecrement={() => removeItem(item)}
                onRemove={() => removeItemFromCart(item)}
                data={item}
              />
            ))
          ) : (
            <>
              <NoProductImg>
                <NoCartBag />
              </NoProductImg>
              <NoProductMsg>No products found</NoProductMsg>
            </>
          )}
        </ItemWrapper>
      </Scrollbars>

      <CheckoutButtonWrapper>
        <PromoCode>
          {!coupon?.discountInPercent ? (
            <>
              {!displayCoupon ? (
                <button onClick={toggleCoupon}>Have a special code?</button>
              ) : (
                <CouponBoxWrapper>
                  <CouponBox
                    onChange={handleChange}
                    value={couponText}
                    onClick={handleApplyCoupon}
                    disabled={!couponText.length || !items.length}
                    style={{
                      boxShadow: "0 3px 6px rgba(0, 0, 0, 0.06)",
                    }}
                  />
                  {error ? <ErrorMsg>{error}</ErrorMsg> : ""}
                </CouponBoxWrapper>
              )}
            </>
          ) : (
            <CouponCode>
              Coupon Applied <span>{coupon.code}</span>
            </CouponCode>
          )}
        </PromoCode>

        {cartItemsCount !== 0 ? (
          <Link href="/checkout">
            <CheckoutButton onClick={onCloseBtnClick}>
              <>
                <Title>Checkout</Title>
                <PriceBox>
                  {CURRENCY}
                  {calculatePrice()}
                </PriceBox>
              </>
            </CheckoutButton>
          </Link>
        ) : (
          <CheckoutButton>
            <>
              <Title>Checkout</Title>
              <PriceBox>
                {CURRENCY}
                {calculatePrice()}
              </PriceBox>
            </>
          </CheckoutButton>
        )}
      </CheckoutButtonWrapper>
    </CartPopupBody>
  );
};

export default Cart;
