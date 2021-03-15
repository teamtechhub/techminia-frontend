import React, { Component } from "react";
import inputIsValid from "./validate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fontawesome from "@fortawesome/fontawesome";
import solid, { faStar, faStarHalf } from "@fortawesome/fontawesome-free-solid";
import regular from "@fortawesome/fontawesome-free-regular";

fontawesome.library.add(solid, regular);

export default class StarRating extends Component {
  static defaultProps = {
    minRating: 0,
    maxRating: 10,
    rating: 5,
    starRatio: 2,
    limit: 1000,
  };

  componentWillMount() {
    let { rating, minRating, maxRating, starRatio, limit } = this.props;
    if (!inputIsValid(rating, minRating, maxRating, starRatio, limit)) {
      throw new Error(
        `Rating must be between ${minRating} and ${maxRating} (${rating}).`
      );
    }
  }

  fullStars() {
    let { rating, starRatio } = this.props;
    return Math.floor(rating / starRatio);
  }

  halfStars() {
    let { rating, starRatio } = this.props;
    let x = rating % starRatio;
    let i = (1 / 2) * starRatio;
    return x >= i ? 1 : 0;
  }

  emptyStars() {
    return this.maxStars() - this.fullStars() - this.halfStars();
  }

  maxStars() {
    let { maxRating, starRatio } = this.props;
    return Math.ceil(maxRating / starRatio);
  }

  render() {
    let fullStars = this.fullStars();
    let halfStars = this.halfStars();
    let emptyStars = this.emptyStars();

    let renderFullStars = () => {
      return fullStars !== 0
        ? Array(fullStars)
            .fill(null)
            .map((item, i) => {
              return (
                <FontAwesomeIcon className={faStar} key={`fs${i}`} icon="star" />
              );
            })
        : "";
    };

    let renderHalfStars = () => {
      return halfStars !== 0
        ? Array(halfStars)
            .fill(null)
            .map((item, i) => {
              return (
                <span key={`hs${i}`} className="fa-layers fa-fw star">
                  <FontAwesomeIcon icon={faStarHalf} />
                  <FontAwesomeIcon
                    icon={[faStar, faStarHalf]}
                    flip="horizontal"
                  />
                </span>
              );
            })
        : "";
    };

    let renderEmptyStars = () => {
      return emptyStars !== 0
        ? Array(emptyStars)
            .fill(null)
            .map((item, i) => {
              return (
                <FontAwesomeIcon
                  className={faStar}
                  key={`es${i}`}
                  icon={["far", "star"]}
                />
              );
            })
        : "";
    };

    return (
      <div className="star-rating">
        {renderFullStars()}
        {renderHalfStars()}
        {renderEmptyStars()}
      </div>
    );
  }
}
