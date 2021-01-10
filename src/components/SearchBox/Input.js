import React from "react";
import { SearchBox, SearchButton, SearchInputWrapper } from "./SearchBox.style";

const InputSearch = ({
  type,
  value,
  buttonText,
  buttonIcon,
  onChange,
  style,
  onKeyPress,
  onBlur,
  onClick,
  onFocus,
  bordered,
  showSvg,
  inputClass,
}) => {
  return (
    <>
      <SearchInputWrapper
        style={style}
        bordered={bordered}
        showSvg={showSvg}
        className={`${inputClass} ${bordered === true ? "bordered" : ""}`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {showSvg && (
            <span className="searchIcon" onClick={onClick}>
              {buttonIcon}
            </span>
          )}
          <SearchBox
            type={type}
            value={value}
            placeholder={`Search Darasa from here`}
            onChange={onChange}
            onFocus={onFocus}
            onKeyPress={onKeyPress}
            onBlur={onBlur}
          />
          {showSvg !== true ? (
            <SearchButton onClick={onClick}>
              {buttonIcon}
              {buttonText !== "" || null ? (
                <span className="buttonText">{buttonText}</span>
              ) : (
                ""
              )}
            </SearchButton>
          ) : (
            ""
          )}
        </form>
      </SearchInputWrapper>
    </>
  );
};
export default InputSearch;
