import React from "react";
import { Wrapper, Circle, Shadow, Span } from "./Loader.style";

function Loader() {
  return (
    <Wrapper
    // style={{
    //   display: "contents",
    //   margin: "auto",
    // }}
    >
      <Circle />
      <Circle />
      <Circle />
      <Shadow />
      <Shadow />
      <Shadow />
      <Span>Loading</Span>
    </Wrapper>
  );
}
export default Loader;
