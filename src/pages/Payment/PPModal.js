import React from "react";

export default function PPModal(props) {
  const { text, subtext } = props;
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      {text}
      <br />
      {subtext}
    </div>
  );
}
