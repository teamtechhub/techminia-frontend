import React from "react";

const Alerts = (props) => {
  const { alert, message } = props;

  console.log("showing", message);

  if (message) {
    if (message.error) {
      alert.error(message.error);
    } else if (message.success) {
      alert.success(message.success);
    } else if (message.info) {
      alert.info(message.info);
    }
  }
  return <div />;
};

export default Alerts;
