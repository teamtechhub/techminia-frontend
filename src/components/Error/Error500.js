import React, { useState } from "react";
import { Wrapper, Gears, Gear, Bar, H2, H1 } from "./Error.style";
import ErrorHandler from "utils/errorHandler";
import { HOME, DASHBOARD } from "constants/routes.constants";
import { Center } from "styles/pages.style";
import Button from "components/Button/Button";
import { useHistory } from "react-router-dom";

export default function Error500(err) {
  const [className, setClassName] = useState("");
  const { message, error, code } = ErrorHandler(err);
  const history = useHistory();

  setTimeout(function () {
    setClassName("loading");
  }, 1000);
  return (
    <Wrapper className={`${className} blue`}>
      {code ? <H2>{code}</H2> : null}
      <H1>
        Oops! <b>:(</b>
      </H1>
      <H2> There seems to be a problem</H2>
      <Gears>
        <Gear className="one">
          <Bar />
          <Bar />
          <Bar />
        </Gear>
        <Gear className="two">
          <Bar />
          <Bar />
          <Bar />
        </Gear>
        <Gear className="three">
          <Bar />
          <Bar />
          <Bar />
        </Gear>
      </Gears>
      <div
        style={{
          margin: "190px 10px 10px 10px",
          display: "flex",
          padding: "20px",
          justifyContent: "center",
          background: "#343434",
          color: "#fff",
        }}
      >
        {message ? (
          <H2 style={{ color: "#fff" }}>{message}</H2>
        ) : (
          <pre>{JSON.stringify(error, null, 2)}</pre>
        )}
      </div>
      <div
        style={{
          margin: "5px",
          display: "flex",
          padding: "20px",
          justifyContent: "center",
          color: "#652e8d",
        }}
      >
        <Center>
          <Button
            onClick={() => history.push(`${HOME}`)}
            size="small"
            title="Back Home"
            style={{
              fontSize: 15,
              color: "#fff",
              backgroundColor: "#652e8d",
              float: "right",
              margin: "10px",
            }}
          />
          <Button
            onClick={() => history.push(`${DASHBOARD}`)}
            size="small"
            title="To Dashboard"
            style={{
              fontSize: 15,
              color: "#000",
              backgroundColor: "#ec7623",
              float: "right",
              margin: "10px",
            }}
          />
        </Center>
      </div>
    </Wrapper>
  );
}
