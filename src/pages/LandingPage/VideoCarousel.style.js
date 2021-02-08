import styled from "styled-components";

export const Container = styled.div`
  clear: both;
  position: relative;
  padding: 30px 0;
  font-size: 14px;
  color: #fff;
  bottom: 0;

  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1300px;
  margin: 0 auto;
  padding: 10px;
  /* background: red; */
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-gap: 20px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

export const VideoContainer = styled.div`
  width: 375px;
  height: 650px;
  background-color: #1e1b26;
  margin: 60px auto 0 auto;
  box-shadow: 5px 5px 115px -14px black;
  border-radius: 4px;
`;

export const VideoPreview = styled.div`
  padding-bottom: 56.25%;
  position: relative;
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(236, 118, 35, 1) 0%,
    rgba(101, 46, 141, 1) 100%
  );
  border-radius: 4px;
  border: 1px solid #dcdacb;
  overflow: hidden;
  > div {
    width: 100%;
    height: 100%;
    opacity: 1;
    background-size: cover;
    position: absolute;
    z-index: 99;
    transition: ease 0.5s;
    > .icon {
      width: 4vw;
      height: 4vw;
      fill: #fff;
      margin: auto;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }
  > img {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    display: block;
    transition: opacity linear 100ms;
  }
  &:hover {
    > div {
      background: rgba(0, 0, 0, 0.5);
      opacity: 1;
    }
  }
`;

export const Video = styled.div`
  background: #fff;
  z-index: 1 !important;
  display: block;
  border-radius: 4px;
  margin: 0 10px;
`;

export const VideoText = styled.div`
  color: #3c3b37;
  white-space: nowrap;
  flex: 1;
  min-width: 1px;
  position: relative;
  margin: 10px;
`;

export const CourseTitle = styled.div`
  margin-top: 0.8rem;
  margin-bottom: 0.4rem;
  display: block !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02rem;
  font-size: 15px;
`;

export const Instructor = styled.div`
  margin-bottom: 0.4rem;
  color: #73726c;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 400;
  line-height: 1.4;
  font-size: 1.2rem;
`;

export const CourseRating = styled.div`
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
export const StarRatingSection = styled.span`
  display: inline-flex;
  align-items: center;
`;
export const RatingTextOnly = styled.span`
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
`;

export const StarRatingNumberOnly = styled.span`
  margin-right: 0.4rem;
  color: #be5a0e;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02rem;
  font-size: 1.4rem;
`;

export const SVG = styled.div`
  display: block;
  width: 7rem;
  height: 1.6rem;
`;
export const Tally = styled.span`
  color: #73726c;
  margin-left: 0.4rem;
  font-weight: 400;
  line-height: 1.4;
  font-size: 1.2rem;
`;

export const MGrid = styled.div`
  width: 100%;
  *zoom: 1;
  .summary-row {
    margin-top: 12px;
  }
  .action-row {
    margin-top: 24px;
  }
  &:after {
    clear: both;
  }
  &:before,
  &:after {
    content: "";
    display: table;
  }
`;

export const Col = styled.div`
  margin: 0% 0.5% 0.5% 0.5%;
  padding: 1%;
  float: left;
  display: block;
`;

export const Col1 = styled(Col)`
  width: 98%;
`;
export const Col2 = styled(Col)`
  width: 47%;
`;
export const Col3 = styled(Col)`
  width: 30.3333333333%;
`;
export const Col4 = styled(Col)`
  width: 22%;
`;
export const Col5 = styled(Col)`
  width: 17%;
`;
export const Col6 = styled(Col)`
  width: 13.6666666667%;
`;
export const Col3Rest = styled(Col)`
  width: 63.6666666667%;
`;
export const Col4Rest = styled(Col)`
  width: 72%;
`;
export const Col5Rest = styled(Col)`
  width: 77%;
`;
export const Col6Rest = styled(Col)`
  width: 80.3333333333%;
`;

export const ActionButton = styled.div`
  text-align: right;
  > i {
    color: yellow;
    font-size: 28px;
    text-align: right;
  }
`;

export const WatchButton = styled.div`
  h3 {
    font-size: 14px;
    color: #652e8d;
    > i {
      font-size: 14px;
      margin-right: 2px;
      position: relative;
      float: left;
      line-height: 1;
      color: #652e8d;
    }
  }
  display: block;
  border: 1px solid #652e8d;
  border-radius: 5px;
  padding: 4px;
  width: 140px;
  &:hover {
    background: linear-gradient(
      90deg,
      rgba(236, 118, 35, 1) 0%,
      rgba(101, 46, 141, 1) 100%
    );
    > h3 {
      color: #fff;
      font-size: 14px;
      > i {
        font-size: 14px;
        color: #fff;
      }
    }
  }
`;

export const VideoGen = styled.ul`
  margin: 0px;
  padding: 0px;
  li {
    font-family: $paragraph-font-family;
    font-size: $text-summary;
    color: darken($accent-color, 40%);
    width: auto;
    display: block;
    float: left;
    margin-right: 6px;
    font-weight: $semi-bold;
  }
`;

export const VideoLikes = styled(VideoGen)`
  float: right;
  li {
    color: $brand-color;
    &:last-child {
      margin-right: 0px;
    }
    i {
      font-size: 14px;
      margin-right: 4px;
      position: relative;
      float: left;
      line-height: 1;
    }
  }
`;

export const VideoDetails = styled.div`
  font-family: $paragraph-font-family;
  font-size: $text-summary;
  font-weight: $light;
  color: darken($accent-color, 20%);
  margin: 0px;
`;

export const VideoDescription = styled.p`
  font-family: $paragraph-font-family;
  font-size: $text-movie-description;
  font-weight: $regular;
  color: darken($accent-color, 30%);
  margin: 0px;
  text-align: justify;
  line-height: 1.3;
`;

export const VideoTeachers = styled.div`
  font-family: $paragraph-font-family;
  font-size: $text-summary;
  font-weight: $light;
  color: $accent-color;
  font-style: italic;
  margin: 0px;
`;
