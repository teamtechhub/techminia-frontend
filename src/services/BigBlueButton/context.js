import React from "react";

const BigBlueButtonContext = React.createContext(null);

export const withBigBlueButton = (Component) => (props) => (
  <BigBlueButtonContext.Consumer>
    {(api) => <Component {...props} api={api} />}
  </BigBlueButtonContext.Consumer>
);

export default BigBlueButtonContext;
