import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory, useLocation } from "react-router-dom";
import { Wrapper, Title, Header } from "./styles";
import { Link } from "components/Link";
import { H5 } from "components/H5";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_MUTATION, VERIFY_MUTATION } from "./mutations";
import {
  unhashPassword,
  addObjectToLocalStorageObject,
  normalizeErrors,
  useTimer,
} from "utils";

function EmailActivation() {
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [token] = useState(match.params.emailToken);
  const [activation, setActivation] = useState();

  const counter = useTimer(5);
  const [setVerification] = useMutation(VERIFY_MUTATION);
  const [setLoginAuth] = useMutation(LOGIN_MUTATION);
  useEffect(() => {
    const fetchData = async () => {
      await setVerification({
        variables: { token: token },
      })
        .then((response) => {
          if (response.data === undefined) {
            console.log("data not loaded");
          } else if (response.data.verifyAccount.success) {
            setActivation("Verification Successful ✔");
            const pwd = unhashPassword(); // === undefined ? "" : unhashPassword();
            const email = JSON.parse(
              localStorage.getItem("darasa_auth_profile")
            ).email;
            setTimeout(async () => {
              try {
                const { loading, data, errors } = await setLoginAuth({
                  variables: {
                    email: email,
                    password: pwd,
                  },
                });
                if (loading) return loading;
                if (errors) {
                  console.log("Server Error kwa login", errors[0].message);
                  return errors[0].message;
                }
                if (data) {
                  if (data.tokenAuth.success) {
                    console.log("data received", data);
                    var payload = data.tokenAuth.payload;
                    let extraPayloadData = {
                      refreshToken: data.tokenAuth.refreshToken,
                      refreshExpiresIn: data.tokenAuth.refreshExpiresIn,
                      token: data.tokenAuth.token,
                    };
                    payload = { ...payload, ...extraPayloadData };
                    addObjectToLocalStorageObject(
                      "darasa_auth_payload",
                      payload
                    );
                    var profile = data.tokenAuth.user;
                    delete profile.__typename;
                    addObjectToLocalStorageObject(
                      "darasa_auth_profile",
                      profile
                    );
                    history.push(location.state.referrer);
                  } else {
                    normalizeErrors(data.tokenAuth.errors);
                    return normalizeErrors(data.tokenAuth.errors);
                  }
                }
              } catch (error) {
                console.log(
                  "SERVER ERRORS",
                  JSON.stringify(error).graphQLErrors ||
                    JSON.stringify(error).networkError ||
                    JSON.stringify(error)
                );
              }
            }, 2000);
          } else {
            const dataError =
              response.data.verifyAccount.errors.nonFieldErrors[0].message;
            console.log("the data Error: ", dataError);
            setActivation(dataError);
          }
        })
        .catch((e) => {
          const errors = e; //.graphQLErrors.map(error => error.message);
          console.log("Check The errors", errors);
          setActivation("Server Error");
        });
    };
    try {
      fetchData();
    } catch (error) {
      console.log("Catching Errors:", error);
      setActivation("Server Error");
    }
  }, [token, history, location, setVerification, setLoginAuth]);

  return (
    <>
      <Title>
        <H5>
          <Link to="/">{"<"} Home</Link>
        </H5>
      </Title>

      <Wrapper>
        <Header>
          <h1
            style={{
              color:
                activation === undefined ||
                activation === "Verification Successful ✔"
                  ? "green"
                  : "red",
            }}
          >
            {activation === undefined ? "Loading ..." : activation}
          </h1>
          <h5>redirecting in {counter}...</h5>
          {/* <Button onClick={handleVerification(event)}> Click Me </Button> */}

          {/* <div>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </div>
          <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div> */}
        </Header>
      </Wrapper>
    </>
  );
}

export default EmailActivation;
