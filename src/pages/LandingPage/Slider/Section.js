/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback } from "react";
import { Waypoint } from "react-waypoint";
import { useStickyDispatch } from "contexts/app/app.provider";
import {
  BannerComponent,
  BannerContent,
  HeadingWrapper,
  SubHeadingWrapper,
  BannerCaption,
  GetStarted,
} from "./slider.style";

const Section = ({ heading, subHeading, bannerCaption, cta }) => {
  const useDispatch = useStickyDispatch();
  const setSticky = useCallback(() => useDispatch({ type: "SET_STICKY" }), [
    useDispatch,
  ]);
  const removeSticky = useCallback(
    () => useDispatch({ type: "REMOVE_STICKY" }),
    [useDispatch]
  );

  const onWaypointPositionChange = ({ currentPosition }) => {
    if (!currentPosition || currentPosition === "above") {
      setSticky();
    }
  };

  return (
    <BannerComponent
      className="bg-blue-100 sm:bg-transparent"
      style={{ zIndex: 2 }}
    >
      <BannerContent>
        <HeadingWrapper>{heading}</HeadingWrapper>
        <SubHeadingWrapper>{subHeading}</SubHeadingWrapper>
        <BannerCaption>{bannerCaption}</BannerCaption>
        <GetStarted>{cta}</GetStarted>
      </BannerContent>
      <Waypoint
        onEnter={removeSticky}
        onLeave={setSticky}
        onPositionChange={onWaypointPositionChange}
      />
    </BannerComponent>
  );
};
export default Section;
