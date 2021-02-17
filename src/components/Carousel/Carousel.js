import React from "react";
import Carousel from "react-multi-carousel";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { ArrowNext, ArrowPrev } from "../AllSvgIcon";

const ButtonPrev = styled("button")`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${themeGet("colors.white", "#ffffff")};
  color: ${themeGet("colors.primary.regular", "#009E7F")};
  padding: 0;
  border-radius: 20px;
  box-shadow: ${themeGet("shadows.base", "0 3px 6px rgba(0, 0, 0, 0.16)")};
  border: 0;
  outline: 0;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 40px;
  margin-top: -20px;
  z-index: 99;
`;

const ButtonNext = styled("button")`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: ${themeGet("colors.primary.regular", "#009E7F")};
  padding: 0;
  border-radius: 20px;
  box-shadow: ${themeGet("shadows.base", "0 3px 6px rgba(0, 0, 0, 0.16)")};
  border: 0;
  outline: 0;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 40px;
  margin-top: -20px;
  z-index: 99;
`;

const ButtonGroupWrapper = styled("div")``;

const PrevButton = ({ onClick, children }) => {
  return (
    <ButtonPrev
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="prevButton"
    >
      {children}
    </ButtonPrev>
  );
};
const NextButton = ({ onClick, children }) => {
  return (
    <ButtonNext
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="nextButton"
    >
      {children}
    </ButtonNext>
  );
};

const ButtonGroup = ({ next, previous }) => {
  return (
    <ButtonGroupWrapper>
      <>
        <PrevButton onClick={() => previous()}>
          <ArrowPrev />
        </PrevButton>
        <NextButton onClick={() => next()}>
          <ArrowNext />
        </NextButton>
      </>

      {/* if prop isRtl true swap prev and next btn */}
    </ButtonGroupWrapper>
  );
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 500 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
  },
};
export default function CustomCarousel({
  data,
  deviceType: { mobile, tablet, desktop },
  component,
  autoPlay = false,
  infinite = true,
  customLeftArrow,
  customRightArrow,
  itemClass,
  isRtl,
  ...props
}) {
  let deviceType = "desktop";
  if (mobile) {
    deviceType = "mobile";
  }
  if (tablet) {
    deviceType = "tablet";
  }
  return (
    <div key={data.id} dir="ltr">
      <Carousel
        arrows={false}
        responsive={responsive}
        ssr={true}
        showDots={false}
        slidesToSlide={1}
        infinite={infinite}
        containerClass="container-with-dots"
        itemClass={itemClass}
        deviceType={deviceType}
        autoPlay={autoPlay}
        autoPlaySpeed={3000}
        renderButtonGroupOutside={props.renderButtonGroupOutside || true}
        additionalTransfrom={0}
        customButtonGroup={<ButtonGroup />}
        {...props}
        // use dir ltr when rtl true
      >
        {data.map((item, index) => {
          if (component) return component(item);
          return (
            <div style={{ padding: "0 15px", overflow: "hidden" }} key={index}>
              <a
                href={item.link}
                style={{ display: "flex", cursor: "pointer" }}
              >
                <img
                  key={item.id}
                  src={item.imgSrc}
                  alt={item.alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    position: "relative",
                  }}
                />
              </a>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
