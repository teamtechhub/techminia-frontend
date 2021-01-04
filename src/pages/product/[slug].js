import React from "react";
import gql from "graphql-tag";
import { SEO } from "components/seo";
import { Modal } from "@redq/reuse-modal";
import ProductSingleWrapper, {
  ProductSingleContainer,
} from "styles/product-single.style";
// import { initializeApollo } from "utils/apollo";
import ProductDetailsBook from "components/ProductDetail/ProductDetailBook";
import CartPopUp from "containers/Cart/CartPopUp";
import { useHistory, useLocation } from "react-router-dom";

export const GET_PRODUCT_DETAILS = gql`
  query getProduct($slug: String!) {
    product(slug: $slug) {
      id
      slug
      title
      type
      unit
      price
      salePrice
      description
      discountInPercent
      gallery {
        url
      }
      image
      categories {
        id
        slug
        title
      }
      author {
        id
        name
        avatar
        bio
        socials {
          id
          media
          profileLink
        }
      }
      meta {
        publisher
        isbn
        edition
        languages
        country
        numberOfReader
        numberOfPage
        samplePDF
      }
    }
  }
`;

const ProductPage = ({ deviceType }) => {
  const history = useHistory();
  const location = useLocation();
  console.log("history", history);
  console.log("location", location.state);
  const data = location.state;
  const content = <ProductDetailsBook product={data} deviceType={deviceType} />;

  return (
    <>
      <SEO
        title={`${data.title} - Darasa E-Library`}
        description={`${data.title} Details`}
      />

      <Modal>
        <ProductSingleWrapper>
          <ProductSingleContainer>
            {content}
            <CartPopUp deviceType={deviceType} />
          </ProductSingleContainer>
        </ProductSingleWrapper>
      </Modal>
    </>
  );
};
// export async function getServerSideProps({ params }) {
//   const apolloClient = initializeApollo();

//   const { data } = await apolloClient.query({
//     query: GET_PRODUCT_DETAILS,
//     variables: {
//       slug: params.slug,
//     },
//   });
//   return {
//     props: {
//       data,
//     },
//   };
// }
export default ProductPage;
