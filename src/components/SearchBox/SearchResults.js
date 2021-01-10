import React from 'react';
import {
  SearchResultWrapper,
  ItemWrapper,
  SubmenuHeading,
} from './SearchBox.style';


const SearchResults= ({
  suggestions,
  itemStyle,
  wrapperStyle,
  setSuggestionValue,
  clearSearch,
}) => {
  const setSuggestion = (suggestion) => {
    setSuggestionValue(suggestion);
  };

  return (
    <SearchResultWrapper {...wrapperStyle}>
      <SubmenuHeading>
        <h3>Recent Search</h3> <button onClick={clearSearch}>Clear</button>
      </SubmenuHeading>
      {suggestions.map((suggestion) => (
        <ItemWrapper
          {...itemStyle}
          key={suggestion}
          onClick={() => setSuggestion(suggestion)}
        >
          {suggestion}
        </ItemWrapper>
      ))}
    </SearchResultWrapper>
  );
};

export default SearchResults;
