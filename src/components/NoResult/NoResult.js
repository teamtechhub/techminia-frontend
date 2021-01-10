import React from "react";
import { useLocation } from "react-router-dom";
import NoResultSvg from "./no-result.svg";
import { NoResultWrapper, ImageWrapper, ButtonWrapper } from "./NoResult.style";
import { ArrowPrev } from "components/AllSvgIcon";
import Button from "components/Button/Button";
// import { SearchContext } from 'contexts/search/search.context';

const NoResultFound = ({ id }) => {
  const router = useLocation();
  // const { dispatch } = React.useContext(SearchContext);

  function onClickButton() {
    // dispatch({
    //   type: 'RESET',
    // });
    const href = router.pathname;

    router.push(href, href, { shallow: true });
  }
  return (
    <NoResultWrapper id={id}>
      <h3>Sorry, No result found :(</h3>

      <ImageWrapper>
        <img src={NoResultSvg} alt="No Result" />
      </ImageWrapper>

      <ButtonWrapper>
        <div onClick={onClickButton}>
          <Button>
            <ArrowPrev /> Go Back
          </Button>
        </div>
      </ButtonWrapper>
    </NoResultWrapper>
  );
};

export default NoResultFound;
