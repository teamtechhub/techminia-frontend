import React from "react";

export default function PPModal(props) {
  console.log(props);
  const { text, subtext } = props;
  return (
    <div>
      {text}
      <br />
      {subtext}
    </div>
  );
}
