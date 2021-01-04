import React from "react";
import { useHistory } from "react-router-dom";
import {
  ProductsRow,
  ProductsCol,
  ButtonWrapper,
  LoaderWrapper,
  LoaderItem,
  ProductCardWrapper,
} from "./ProductsList.style";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { NetworkStatus } from "apollo-client";
import Placeholder from "components/Placeholder/Placeholder";
import Fade from "react-reveal/Fade";
import NoResultFound from "components/NoResult/NoResult";
import Button from "components/Button/Button";
import ErrorMessage from "components/error-message/error-message";
import BookCard from "components/ProductCard/ProductCardBook";
import { useRouterQuery } from "utils/useRouterQuery";

export const GET_PRODUCTS = gql`
  query getProducts(
    $type: String
    $text: String
    $category: String
    $offset: Int
    $limit: Int
  ) {
    products(
      type: $type
      text: $text
      category: $category
      offset: $offset
      limit: $limit
    ) {
      items {
        id
        title
        slug
        unit
        price
        salePrice
        description
        discountInPercent
        type
        image
        author {
          id
          name
        }
        gallery {
          url
        }
        categories {
          id
          title
          slug
        }
      }
      hasMore
    }
  }
`;
export const Products = ({
  deviceType,
  fetchLimit = 20,
  loadMore = true,
  type,
}) => {
  const query = useRouterQuery();
  const history = useHistory();
  const { data, error, loading, fetchMore, networkStatus } = useQuery(
    GET_PRODUCTS,
    {
      variables: {
        type: type,
        text: query.get("text"),
        category: query.get("category"),
        offset: 0,
        limit: fetchLimit,
      },
      notifyOnNetworkStatusChange: true,
    }
  );
  const loadingMore = networkStatus === NetworkStatus.fetchMore;

  if (error) return <ErrorMessage message={error.message} />;
  if (loading && !loadingMore) {
    return (
      <LoaderWrapper>
        <LoaderItem>
          <Placeholder uniqueKey="1" />
        </LoaderItem>
        <LoaderItem>
          <Placeholder uniqueKey="2" />
        </LoaderItem>
        <LoaderItem>
          <Placeholder uniqueKey="3" />
        </LoaderItem>
      </LoaderWrapper>
    );
  }

  if (!data || !data.products || data.products.items.length === 0) {
    return <NoResultFound />;
  }
  const handleLoadMore = () => {
    fetchMore({
      variables: {
        offset: Number(data.products.items.length),
        limit: fetchLimit,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        return {
          products: {
            __typename: previousResult.products.__typename,
            items: [
              ...previousResult.products.items,
              ...fetchMoreResult.products.items,
            ],
            hasMore: fetchMoreResult.products.hasMore,
          },
        };
      },
    });
  };

  const renderCard = (productType, props) => {
    return (
      <BookCard
        title={props.title}
        image={props.image}
        name={props?.author?.name}
        data={props}
        deviceType={deviceType}
        onClick={() => history.push(`/product/${props.slug}`, props)}
      />
    );
  };
  return (
    <>
      <ProductsRow>
        {data.products.items.map((item, index) => (
          <ProductsCol
            key={index}
            style={type === "book" ? { paddingLeft: 0, paddingRight: 1 } : {}}
          >
            <ProductCardWrapper>
              <Fade
                duration={800}
                delay={index * 10}
                style={{ height: "100%" }}
              >
                {renderCard(type, item)}
              </Fade>
            </ProductCardWrapper>
          </ProductsCol>
        ))}
      </ProductsRow>
      {loadMore && data.products.hasMore && (
        <ButtonWrapper>
          <Button
            onClick={handleLoadMore}
            isLoading={loadingMore}
            variant="secondary"
            style={{
              fontSize: 14,
            }}
            border="1px solid #f1f1f1"
          >
            Load More
          </Button>
        </ButtonWrapper>
      )}
    </>
  );
};
export default Products;
