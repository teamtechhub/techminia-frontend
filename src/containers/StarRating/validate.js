export let ratingIsValid = function (rating, minRating, maxRating) {
  if (rating >= minRating && rating <= maxRating) return true;
  return false;
};

export let valuesNotZeroOrLess = function (...values) {
  let filteredValues = values.filter((value) => value > 0);

  return values.length === filteredValues.length;
};

export let valuesNotNegative = function (...values) {
  let filteredValues = values.filter((value) => value >= 0);

  return values.length === filteredValues.length;
};

export let minLessThanMax = function (minRating, maxRating) {
  return minRating < maxRating;
};

export let valuesLessThanHardLimit = function (limit, ...values) {
  let filteredValues = values.filter((value) => value <= limit);

  return values.length === filteredValues.length;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (rating, minRating, maxRating, starRatio, limit) {
  return (
    valuesLessThanHardLimit(limit, minRating, maxRating) &&
    valuesNotNegative(rating, minRating, maxRating) &&
    valuesNotZeroOrLess(starRatio) &&
    minLessThanMax(minRating, maxRating)
  );
}
