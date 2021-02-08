import React from "react";
import {
  Col1,
  CourseRating,
  RatingTextOnly,
  StarRatingSection,
  StarRatingNumberOnly,
  Tally,
  VideoTeachers,
} from "./VideoCarousel.style";
import StarRating from "containers/StarRating/StarRating";

export default function CourseRatings(video) {
  return (
    <div>
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
    </div>
  );
}
