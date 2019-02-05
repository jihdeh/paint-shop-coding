const pipe = require("ramda/src/pipe");
const map = require("ramda/src/map");

const sortColor = (a, b) => {
  // M is less preferred because it's expensive
  if (a.finish === "M" && b.finish === "G") {
    return 1;
  }
  // G is smaller, less expensive than M
  if (a.finish === "G" && b.finish === "M") {
    return -1;
  }
  // If the finishing is the same, sort by color ascending
  return a.color - b.color;
};

const structureCustomerColorInterest = customerColorInterest => {
  // sort finish and color by order of importance
  // marks preferences with a single option as fixedPaint
  return pipe(
    map(colorInterest => colorInterest.sort(sortColor)),
    map(sortedColorInterest => {
      if (sortedColorInterest.length === 1) {
        sortedColorInterest[0].fixedPaint = true;
      }
      return sortedColorInterest;
    })
  )(customerColorInterest);
  // to get [[{"color": 1, "finish": "G"}, {"color": 2, "finish": "G"}], [{"color": 2, "finish": "G", "fixedPaint": true}], [{"color": 2, "finish": "G", "fixedPaint": true}]]
};

module.exports = structureCustomerColorInterest;
