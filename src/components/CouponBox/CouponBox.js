import React from "react";
import {
  CouponBoxWrapper,
  Display,
  CouponCode,
  DiscountPrice,
  CancelBtn,
} from "./CouponBox.style";
import { CloseIcon } from "components/AllSvgIcon";
import { Input } from "components/forms/input";
import Button from "components/Button/Button";

const CouponBox = ({
  onChange,
  value,
  onClick,
  disabled,
  className,
  style,
  ...props
}) => {
  return (
    <CouponBoxWrapper
      className={className ? className : "boxedCoupon"}
      style={style}
    >
      <Input
        onChange={onChange}
        value={value}
        placeholder={"Enter Coupon Here"}
        {...props}
      />
      <Button
        type="button"
        onClick={onClick}
        disabled={disabled}
        padding="0 30px"
      >
        Apply
      </Button>
    </CouponBoxWrapper>
  );
};

export const CouponDisplay = ({
  code,
  currency,
  price,
  sign,
  onClick,
  style,
  btnStyle,
}) => {
  return (
    <Display style={style} className="couponDisplayBox">
      <CouponCode className="couponCodeText">{code}</CouponCode>
      <DiscountPrice className="discountedPrice">
        {sign}
        {currency}
        {price}
      </DiscountPrice>
      <CancelBtn onClick={onClick} style={btnStyle}>
        <CloseIcon />
      </CancelBtn>
    </Display>
  );
};

export default CouponBox;
