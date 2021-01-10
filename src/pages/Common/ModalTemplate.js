import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  OfferSection,
  Offer,
  Wrapper,
  Container,
  SubHeading,
  Heading,
} from "./style";
import axios from "axios";
import { BASE_URL } from "constants/constants";
import { tokenConfig } from "helpers";
import Error500 from "components/Error/Error500";
import Loader from "components/Loader/Loader";
import moment from "moment";
import { CURRENCY } from "constants/constants";
import Button from "components/Button/Button";
import { closeModal } from "@redq/reuse-modal";

function ModalTemplate(account, application, actions) {
  const history = useHistory();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    try {
      axios
        .get(`${BASE_URL}/jobs/applications/${application.id}/`, tokenConfig())
        .then((res) => {
          // const arr = res.data.results;
          // const result = arr.reduce((acc, d) => {
          //   acc.push({
          //     key: d.name,
          //     value: d.id,
          //   });
          //   return acc;
          // }, []);
          setProfile(res.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log("Catching Errors:", err);
          setError(err);
        });
    } catch (error) {
      console.log("Catching Errors:", error);
      setError(error);
      setLoading(false);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (error) {
    return <Error500 err={error} />;
  }
  return (
    <Wrapper>
      <Container style={{ paddingBottom: 30 }}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Heading>{account.full_name}</Heading>
            <SubHeading>({account.email})</SubHeading>
            <SubHeading>
              <Button
                onClick={() => {
                  history.push(`/dashboard/profile/${account.id}`);
                  closeModal();
                }}
                size="small"
                title={`View Profile`}
                style={{
                  fontSize: 15,
                  color: "#652e8d",
                  backgroundColor: "#ec7623",
                }}
              />
            </SubHeading>
            <SubHeading>
              Budget {CURRENCY}
              {profile.budget}
            </SubHeading>
            <SubHeading>
              Applied{" "}
              {moment(new Date()).diff(moment(profile.applied_on), "days")} days
              ago
            </SubHeading>
            <SubHeading>
              Comment : <br />
              {profile.comment}
            </SubHeading>
            <OfferSection>
              <Offer>{actions}</Offer>
            </OfferSection>
          </>
        )}
      </Container>
    </Wrapper>
  );
}

export default ModalTemplate;
