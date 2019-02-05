const reverse = require("ramda/src/reverse");
const map = require("ramda/src/map");
const pipe = require("ramda/src/pipe");

const getColorMixSolution = (index, customerColorInterest) => {
  let combinationIndex = index;
  // calculate the index for every preffered posix
  const reverseColorInterestLength = pipe(
    map(color => color.length),
    reverse
  )(customerColorInterest);

  const colorMixSolutionIndexes = pipe(
    map(length => {
      const index = combinationIndex % length;
      combinationIndex = Math.floor(combinationIndex / length);
      return index;
    }),
    reverse
  )(reverseColorInterestLength);

  const colorMixSolutionIndx = colorMixSolutionIndexes.map(
    (index, line) => customerColorInterest[line][index]
  );
  return colorMixSolutionIndx;
};

const colorMixSolution = (i, customerColorInterest) =>
  getColorMixSolution(i, customerColorInterest);

module.exports = colorMixSolution;
