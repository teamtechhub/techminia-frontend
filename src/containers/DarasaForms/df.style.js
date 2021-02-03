import styled from "styled-components";

export const Container = styled.div`
  padding-top: 12px;

  background-color: transparent;
  border-bottom: none;
  flex-direction: column;
  outline: none;
  cursor: auto;

  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2),
    0 1px 1px 0 rgba(0, 0, 0, 0.141), 0 1px 3px 0 rgba(0, 0, 0, 0.122);
  background-color: #fff;
  border: 1px solid #dadce0;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  position: relative;
  transition: box-shadow 0.25s cubic-bezier(0, 0, 0.2, 1);
`;

export const SideView = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  height: -webkit-calc(100% + 2px);
  height: calc(100% + 2px);
  left: -1px;
  padding-right: 10px;
  position: absolute;
  bottom: -1px;
  width: 6px;
`;

export const MainContent = styled.div`
  -webkit-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 100%;

  .toggle-switch {
    position: relative;
    margin-right: 10px;
    width: 75px;
    display: inline-block;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    text-align: left;
  }
  .toggle-switch-checkbox {
    display: none;
  }
  .toggle-switch-label {
    display: block;
    overflow: hidden;
    cursor: pointer;
    border: 0 solid #bbb;
    border-radius: 20px;
    margin: 0;
  }
  .toggle-switch-label:focus {
    outline: none;
  }
  .toggle-switch-label:focus > span {
    box-shadow: 0 0 2px 5px red;
  }
  .toggle-switch-label > span:focus {
    outline: none;
  }
  .toggle-switch-inner {
    display: block;
    width: 200%;
    margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
  }
  .toggle-switch-inner:before,
  .toggle-switch-inner:after {
    display: block;
    float: left;
    width: 50%;
    height: 34px;
    padding: 0;
    line-height: 34px;
    font-size: 14px;
    color: white;
    font-weight: bold;
    box-sizing: border-box;
  }
  .toggle-switch-inner:before {
    content: attr(data-yes);
    text-transform: uppercase;
    padding-left: 10px;
    background-color: #652e8d;
    color: #fff;
  }
  .toggle-switch-disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
  .toggle-switch-disabled:before {
    background-color: #ddd;
    cursor: not-allowed;
  }
  .toggle-switch-inner:after {
    content: attr(data-no);
    text-transform: uppercase;
    padding-right: 10px;
    background-color: #bbb;
    color: #fff;
    text-align: right;
  }
  .toggle-switch-switch {
    display: block;
    width: 24px;
    margin: 5px;
    background: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    border: 0 solid #bbb;
    border-radius: 20px;
    transition: all 0.3s ease-in 0s;
  }
  .toggle-switch-checkbox:checked + .toggle-switch-label .toggle-switch-inner {
    margin-left: 0;
  }
  .toggle-switch-checkbox:checked + .toggle-switch-label .toggle-switch-switch {
    right: 0px;
  }
  .toggle-switch.small-switch {
    width: 40px;
  }
  .toggle-switch.small-switch .toggle-switch-inner:after,
  .toggle-switch.small-switch .toggle-switch-inner:before {
    content: "";
    height: 20px;
    line-height: 20px;
  }
  .toggle-switch.small-switch .toggle-switch-switch {
    width: 16px;
    right: 20px;
    margin: 2px;
  }
  @media screen and (max-width: 991px) {
    .toggle-switch {
      transform: scale(0.9);
    }
  }
  @media screen and (max-width: 767px) {
    .toggle-switch {
      transform: scale(0.825);
    }
  }
  @media screen and (max-width: 575px) {
    .toggle-switch {
      transform: scale(0.75);
    }
  }
`;

export const TitleRow = styled.div`
  -webkit-box-align: start;
  box-align: start;
  -webkit-align-items: flex-start;
  align-items: flex-start;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  padding-left: 24px;
  padding-bottom: 8px;
`;
export const TitleInput = styled.div`
  -webkit-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  margin-right: 8px;
`;

export const PicInput = styled.div`
  margin-right: 8px;
  opacity: 1;

  color: #5f6368;
  fill: #5f6368;

  -webkit-user-select: none;
  -webkit-transition: background 0.3s;
  transition: background 0.3s;
  border: 0;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  cursor: pointer;
  display: inline-block;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
  height: 48px;
  outline: none;
  overflow: hidden;
  position: relative;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
  width: 48px;
  z-index: 0;
`;

export const TypeChooser = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  margin-right: 24px;
  margin-bottom: 0;
  position: relative;
`;

export const SelectBox = styled.div`
  background-color: transparent;
  border: 1px solid #dadce0;
  -webkit-border-radius: 4px;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;

  -webkit-user-select: none;
  -webkit-transition: background 0.3s;
  transition: background 0.3s;
  -webkit-border-radius: 3px;
  color: #444;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  outline: none;
  position: relative;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
`;

export const SelectBoxContent = styled.div`
  border-radius: 4px;
  max-width: none;
  height: auto;
  cursor: pointer;
`;

export const OptionsRow = styled.div`
  -webkit-box-align: start;
  box-align: start;
  display: block;
  padding-left: 24px;
  padding-bottom: 8px;
`;

export const PopUp = styled.div`
  // min-width: 224px;
  top: 30.2px;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
  padding: 8px 0 8px 0;
  -webkit-border-radius: 4px;
  border-radius: 4px;

  transition: opacity 0.1s linear;
  background: #ffffff;
  border: 0;
  opacity: 0;
  display: none;

  outline: 1px solid transparent;
  overflow: hidden;
  overflow-y: auto;
  position: fixed;
  z-index: 2000;
  &.active {
    display: block;
    opacity: 1;
    position: absolute;
  }
  &.inactive {
    opacity: 0;
  }
`;

export const PopupOption = styled.div`
  max-width: none;

  padding-left: 48px;
  align-items: center;

  cursor: pointer;
  height: auto;
  padding-right: 26px;
  padding-bottom: 8px;
  padding-top: 8px;

  font-family: Roboto, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.2px;
  line-height: 20px;
  color: #202124;
  min-width: 112px;

  border-color: transparent;
  list-style: none;
  outline: none;
  // overflow: hidden;
  position: relative;
  text-align: left;
  white-space: nowrap;

  span {
    line-height: 32px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    overflow: hidden;
    position: relative;
  }
`;

export const PopUpOptionIcon = styled.div`
  height: 24px;
  opacity: 1;
  top: 15px;
  width: 24px;

  background-repeat: no-repeat;
  left: 12px;
  position: absolute;
  right: auto;
  vertical-align: middle;
`;

export const SingleForm = styled.div`
  width: 152px;

  margin-right: 19px;
  display: inline-block;
  margin: 0 0 24px 0;
  vertical-align: top;
  @media only screen and (min-width: 1100px) {
    width: 164px;
  }
  @media only screen and (min-width: 1400px) {
    width: 171px;
  }
`;

export const FormHeader = styled.div`
  max-height: 25vw;
  max-width: 100vw;
  height: 192.5px;
  width: 770px;

  background-size: cover;
  background-position: center;

  border: 1px solid #dadce0;
  border-radius: 8px;
  margin-bottom: 12px;
`;
export const QuestionHeader = styled.div`
  padding: 0 30px;
  margin-bottom: 15px;
  font-size: 14px;
  color: #8995a1;
  h2 {
    margin-top: 0;

    font-size: 25px;
    line-height: inherit;

    margin: 15px 0;
    font-family: Arial, sans-serif;
    font-weight: normal;
    color: #f44336;
    text-transform: none;
    text-shadow: none;
    text-align: left;
  }
`;
export const QuestionInfoContainer = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  align-items: flex-start;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
`;
export const QuestionInfoCategory = styled.section`
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  margin-right: 15px;
`;
export const QuestionInfoCategoryIcon = styled.div`
  background-color: #9c27b0;
  border-radius: 50%;
  padding: 5px;
  position: relative;
  margin-right: 7.5px;
  top: -10px;
`;
export const QCIcon = styled.div`
  background-image: url(https://cdn.quizzclub.com/tags/geography.png?v=qi4);

  height: 25px;
  width: 25px;

  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

export const QCTitle = styled.div`
  margin-bottom: 0;

  font-size: inherit;
  color: inherit;
  font-weight: bold;
  margin: 0;
  line-height: inherit;
  h3 {
    text-transform: none;
    text-shadow: none;
    text-align: left;
  }
`;

export const QuestionInfo = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  margin-right: 15px;
`;

export const Answers = styled.div``;
export const AnswersList = styled.div`
  margin: 22.5px 0 0;
  padding: 0;
  list-style: none;
`;
export const AnswersItem = styled.li`
  -webkit-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
  will-change: opacity;
  margin: 0 0 7.5px;
`;

export const AnswersLink = styled.div`
  position: relative;
  padding: 17px 45px;
  display: inline-flex;
  line-height: 1;
  outline: none;
  color: #fff;
  font-size: 20px;
  background-color: #b35bc2;
  border: none;
  border-left: 6px solid #ec7323;
  width: 100%;
  cursor: pointer;
  text-align: left;
  span {
    position: relative;
    z-index: 1;
  }
`;

export const AnswerFeedback = styled.div`
  margin-top: 15px;
  margin-bottom: 30px;
  padding: 30px 30px;
  margin-bottom: 30px;
  position: relative;
  color: #151515;
  background: #fff;
`;
