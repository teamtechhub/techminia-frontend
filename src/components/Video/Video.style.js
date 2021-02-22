import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const Text = styled.span`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.base", "15")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.label", "#909090")};
  margin-top: 15px;
  text-align: center;
`;

export const VideoPlayer = styled.div`
  width: 100%;
  max-width: 100%;
  // .player-wrapper {
  //   width: 480px;
  //   height: 270px;
  // }

  display: block;
  vertical-align: top;
  box-sizing: border-box;
  color: #fff;
  background-color: #000;
  position: relative;
  font-size: 10px;
  line-height: 1;
  font-family: serif, Times, "Times New Roman";
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  iframe {
    width: 100%;
    height: inherit;
  }
`;

export const ControlBar = styled.div`
  display: flex;
  visibility: visible;
  opacity: 1;
  transition: visibility 0.1s ease 0s, opacity 0.1s ease 0s;
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 3em;
  background-color: rgba(43, 51, 63, 0.7);
`;

export const PlayPauseButton = styled.button`
  cursor: pointer;
  flex: 0 0 auto;
  position: relative;
  text-align: center;
  height: 100%;
  width: 4em;
  outline: none;
  margin: 0px;
  padding: 0px;
  color: inherit;
  display: inline-block;
  font-size: inherit;
  line-height: inherit;
  text-transform: none;
  appearance: none;
  background: none;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  overflow: visible;
  text-decoration: none;
  transition: none 0s ease 0s;
  speak: none;
  font-style: normal;
  font-weight: normal;
  -webkit-font-smoothing: antialiased;
  font-family: video-react !important;
  font-variant: normal;
  &:before {
    font-size: 1.8em;
    line-height: 1.67;
    content: "";
    text-align: center;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
  span {
    clip: rect(0px, 0px, 0px, 0px);
    height: 1px;
    position: absolute;
    width: 1px;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    margin: -1px;
    overflow: hidden;
    padding: 0px;
  }
`;

export const VolumeButton = styled.div``;
export const CurrentTime = styled.div``;
export const VideoDuration = styled.div``;
export const VideoProgress = styled.div``;
export const FullScreenIcon = styled.button``;
