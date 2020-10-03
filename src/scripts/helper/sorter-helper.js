const descendingByRating = (a, b) => {
  let comparison = 0;
  if (a.rating > b.rating) {
    comparison = -1;
  } else if (a.rating < b.rating) {
    comparison = 1;
  }
  return comparison;
};

export default descendingByRating;
