import React from "react";
import { logToConsole } from "utils/logging";

const Alerts = (props) => {
  const { alert, message } = props;

  logToConsole("showing", message);

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
