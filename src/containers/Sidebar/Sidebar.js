import React, { useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Sticky from "react-stickynode";
import gql from "graphql-tag";
import { Scrollbars } from "react-custom-scrollbars";
import Popover from "components/Popover/Popover";
import { ArrowDropDown, CategoryIcon } from "components/AllSvgIcon";
import { useAppState } from "contexts/app/app.provider";
import {
  SidebarMobileLoader,
  SidebarLoader,
} from "components/Placeholder/Placeholder";
import {
  CategoryWrapper,
  TreeWrapper,
  PopoverHandler,
  PopoverWrapper,
  SidebarWrapper,
} from "./Sidebar.style";
import { SearchContext } from "contexts/search/search.context";
import { TreeMenu } from "components/TreeMenu/TreeMenu";
import { useQuery } from "@apollo/react-hooks";

const GET_CATEGORIES = gql`
  query getCategories($type: String!) {
    categories(type: $type) {
      id
      title
      slug
      icon
      children {
        id
        title
        slug
      }
    }
  }
`;
const SidebarCategory = ({ deviceType: { mobile, tablet, desktop }, type }) => {
  const { state } = useContext(SearchContext);
  const history = useHistory();
  const location = useLocation();
  const pathname = location.pathname;
  const query = new URLSearchParams(location.search);
  const { data, loading } = useQuery(GET_CATEGORIES, {
    variables: { type },
  });
  const selectedQueries = query.get("category");

  const onCategoryClick = (slug) => {
    console.log("category being handled");
    console.log("the text state", state.text);

    history.push(`${pathname}?category=${slug}`);
  };
  const isSidebarSticky = useAppState("isSidebarSticky");

  if (!data || loading) {
    if (mobile || tablet) {
      return <SidebarMobileLoader />;
    }
    return <SidebarLoader />;
  }
  return (
    <CategoryWrapper>
      <PopoverWrapper>
        <Popover
          handler={
            <PopoverHandler>
              <div>
                <CategoryIcon />
                Select your Category
              </div>
              <div>
                <ArrowDropDown />
              </div>
            </PopoverHandler>
          }
          className="category-popover"
          content={
            <TreeMenu
              data={data.categories}
              onClick={onCategoryClick}
              active={selectedQueries}
            />
          }
        />
      </PopoverWrapper>

      <SidebarWrapper style={{ paddingTop: 45 }}>
        <Sticky enabled={isSidebarSticky} top={110}>
          <Scrollbars
            universal
            autoHide
            autoHeight
            autoHeightMax={688}
            renderView={(props) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  marginLeft: 0,
                  marginRight: props.style.marginRight,
                }}
              />
            )}
          >
            <TreeWrapper>
              <TreeMenu
                data={data.categories}
                onClick={onCategoryClick}
                active={selectedQueries}
              />
            </TreeWrapper>
          </Scrollbars>
        </Sticky>
      </SidebarWrapper>
    </CategoryWrapper>
  );
};

export default SidebarCategory;
