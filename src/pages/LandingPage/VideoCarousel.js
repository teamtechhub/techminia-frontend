import React from "react";
import {
  Col1,
  Col2,
  Container,
  CourseTitle,
  CourseRating,
  Instructor,
  MGrid,
  RatingTextOnly,
  StarRatingSection,
  StarRatingNumberOnly,
  Tally,
  Video,
  VideoPreview,
  VideoTeachers,
  VideoText,
  WatchButton,
  Wrapper,
} from "./VideoCarousel.style";
import { AreaHeading } from "./LandingPage.style";
import StarRating from "containers/StarRating/StarRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "components/Carousel/Carousel";
import Fade from "react-reveal/Fade";
import tuit from "images/tuit.png";

const videos = [
  {
    id: 1,
    title: "Role of DNA in protein synthesis",
    class: "Biology Form Four",
    teachers: "Mr. Kamau, Mr. Omondi",
    rating: 5,
    minRating: 0,
    maxRating: 10,
    starRatio: 2,
    hardLimit: 10,
    tally: "26,014",
    placeholder: tuit,
  },
  {
    id: 2,
    title: "Role of DNA in protein synthesis",
    class: "Biology Form Four",
    teachers: "Mr. Kamau, Mr. Omondi",
    rating: 5,
    minRating: 0,
    maxRating: 10,
    starRatio: 2,
    hardLimit: 10,
    tally: "26,014",
    placeholder: tuit,
  },
  {
    id: 3,
    title: "Role of DNA in protein synthesis",
    class: "Biology Form Four",
    teachers: "Mr. Kamau, Mr. Omondi",
    rating: 5,
    minRating: 0,
    maxRating: 10,
    starRatio: 2,
    hardLimit: 10,
    tally: "26,014",
    placeholder: tuit,
  },
  {
    id: 4,
    title: "Role of DNA in protein synthesis",
    class: "Biology Form Four",
    teachers: "Mr. Kamau, Mr. Omondi",
    rating: 5,
    minRating: 0,
    maxRating: 10,
    starRatio: 2,
    hardLimit: 10,
    tally: "26,014",
    placeholder: tuit,
  },
  {
    id: 5,
    title: "Role of DNA in protein synthesis",
    class: "Biology Form Four",
    teachers: "Mr. Kamau, Mr. Omondi",
    rating: 5,
    minRating: 0,
    maxRating: 10,
    starRatio: 2,
    hardLimit: 10,
    tally: "26,014",
    placeholder: tuit,
  },
];

function VideoCarousel({ deviceType }) {
  return (
    <Container>
      <AreaHeading>
        <h3>Popular Classes</h3>
      </AreaHeading>
      <Wrapper>
        <Carousel
          deviceType={deviceType}
          autoPlay={true}
          infinite={true}
          data={videos}
          component={(video, index) => (
            <Fade key={index} bottom duration={800} delay={index * 100}>
              <Video>
                <VideoPreview>
                  <img src={video.placeholder} alt="tuition" />
                  <div>
                    <FontAwesomeIcon icon={"play-circle"} className="icon" />
                  </div>
                </VideoPreview>
                <VideoText>
                  <CourseTitle>{video.title}</CourseTitle>
                  <Instructor>{video.class}</Instructor>
                  <CourseRating>
                    <StarRatingSection>
                      <RatingTextOnly>
                        {video.rating} out of {video.maxRating}
                      </RatingTextOnly>
                      <StarRatingNumberOnly>
                        {video.rating}/{video.maxRating}
                      </StarRatingNumberOnly>
                      <StarRating
                        rating={video.rating}
                        minRating={video.minRating}
                        maxRating={video.maxRating}
                        starRatio={video.starRatio}
                        limit={video.hardLimit}
                      />
                    </StarRatingSection>
                    <Tally>({video.tally})</Tally>
                  </CourseRating>

                  {/* <MGrid className="summary-row">
                    <Col2>
                      <h5>SUMMARY</h5>
                    </Col2>
                    <Col2>
                      <VideoLikes>
                        <li>
                          <i>🙂 </i>124
                        </li>
                        <li>
                          <i>🙁 </i>3
                        </li>
                      </VideoLikes>
                    </Col2>
                  </MGrid> */}
                  {/* <MGrid>
                    <Col1>
                      <VideoDescription>
                        one seen is an elderly woman stating her father was a
                        farmer, but did not start out that way.
                      </VideoDescription>
                    </Col1>
                  </MGrid> */}
                  <MGrid>
                    <Col1>
                      <VideoTeachers>{video.teachers}</VideoTeachers>
                    </Col1>
                  </MGrid>
                  <MGrid className="action-row">
                    <Col2>
                      <WatchButton>
                        <h3>
                          <FontAwesomeIcon icon={"play-circle"} /> WATCH VIDEO
                        </h3>
                      </WatchButton>
                    </Col2>
                  </MGrid>
                </VideoText>
              </Video>
            </Fade>
          )}
        />
      </Wrapper>
    </Container>
  );
}

export default VideoCarousel;
