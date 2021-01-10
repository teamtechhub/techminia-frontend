import InputSearch from "./Input";
import React, { useEffect, useRef, useState } from "react";
import SearchResults from "./SearchResults";
import SearchWrapper, {
  SearchBoxWrapper,
  CurrentType,
} from "./SearchBox.style";
import { SearchIcon } from "../AllSvgIcon";

const Search = ({
  suggestions,
  buttonText,
  buttonIcon,
  inputStyle,
  style,
  bordered,
  hideType,
  showSvg,
  autoSuggestion,
  className,
  handleSearch,
  onClick,
  value,
  expand,
  minimal,
  pathname,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [toggleSuggestion, setToggleSuggestion] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);

  let searchRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleSearchInput = (event) => {
    setSearchValue(event.target.value);
    setToggleSuggestion(true);
    handleSearch(event.target.value);
  };

  const ucwords = (str) => {
    const newString = str.replace(/\//g, "");
    const humanString = newString.replace(/-/g, " ");
    return (humanString + "").replace(/^([a-z])|\s+([a-z])/g, function ($1) {
      return $1.toUpperCase();
    });
  };

  const setSuggestion = (suggestion) => {
    setSearchValue(suggestion);
    setToggleSuggestion(false);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setToggleSuggestion(false);
      setToggleSearch(false);
    }
  };

  const onClearBtnClick = () => {
    setSearchValue("");
  };

  return (
    <SearchWrapper
      className={className}
      ref={searchRef}
      style={style}
      autoSuggestion={autoSuggestion}
      hideType={hideType}
      expand={expand}
    >
      <SearchBoxWrapper
        className={`${hideType ? "hideType" : ""} ${
          expand === true ? (toggleSearch ? "expanded" : "collapsed") : ""
        } ${minimal === true ? "minimal" : ""}`}
      >
        {pathname && pathname !== "/" ? (
          <CurrentType>{ucwords(pathname)}</CurrentType>
        ) : (
          <CurrentType>Darasa</CurrentType>
        )}

        <InputSearch
          type="text"
          value={value}
          onChange={handleSearchInput}
          onFocus={() => setToggleSearch(true)}
          onBlur={() => setToggleSearch(false)}
          buttonIcon={buttonIcon}
          buttonText={buttonText}
          style={inputStyle}
          bordered={bordered}
          showSvg={showSvg}
          onClick={() => onClick(searchValue)}
        />
      </SearchBoxWrapper>
      {autoSuggestion && toggleSuggestion ? (
        <SearchResults
          suggestions={suggestions}
          clearSearch={onClearBtnClick}
          setSuggestionValue={(suggestion) => setSuggestion(suggestion)}
        />
      ) : null}
    </SearchWrapper>
  );
};

Search.defaultProps = {
  bordered: false,
  autoSuggestion: false,
  buttonText: "Search",
  buttonIcon: <SearchIcon />,
  inputStyle: {
    width: "100%",
  },
};

export default Search;
