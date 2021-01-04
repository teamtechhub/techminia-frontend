import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Modal } from "@redq/reuse-modal";
import { SEO } from "components/seo";
import Checkout from "containers/Checkout/Checkout";
import { withApollo } from "utils/apollo";
import { ProfileProvider } from "contexts/profile/profile.provider";
import gql from "graphql-tag";

export const GET_LOGGED_IN_CUSTOMER = gql`
  query getUser($id: String = "1") {
    me(id: $id) {
      id
      name
      email
      address {
        id
        type
        name
        info
      }
      contact {
        id
        type
        number
      }
      card {
        id
        type
        cardType
        name
        lastFourDigit
      }
    }
  }
`;
const CheckoutPage = ({ deviceType }) => {
  const { data, error, loading } = useQuery(GET_LOGGED_IN_CUSTOMER);
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) return <div>{error.message}</div>;
  const token = "true";

  return (
    <>
      <SEO title="Checkout - Darasa" description="Checkout Details" />
      <ProfileProvider initData={data.me}>
        <Modal>
          <Checkout token={token} deviceType={deviceType} />
        </Modal>
      </ProfileProvider>
    </>
  );
};

export default withApollo(CheckoutPage);
