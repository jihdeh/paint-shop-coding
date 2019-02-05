const forEach = require("ramda/src/forEach");
const inc = require("ramda/src/inc");
const all = require("ramda/src/all");
const any = require("ramda/src/any");
const map = require("ramda/src/map");
const pipe = require("ramda/src/pipe");
const colorMixSolution = require("./colorMixSolution");
const structureCustomerColorInterest = require("./structureCustomerColorInterest");

const solutionSatisfiesAllCustomers = (result, customerColorInterest) => {
  //check if solution satifies all customers;
  return pipe(
    all(importances =>
      any(selection => result[selection.color - 1] === selection.finish)(
        importances
      )
    )
  )(customerColorInterest);
};

const finishMixing = (numberOfColors, color, customerColorInterest) => {
  const colors = new Array(numberOfColors); //basically empty arrays

  const found = all(importance => {
    const isNotValidToOverride = //because it is fixed or has finish
      colors[importance.color - 1] &&
      (colors[importance.color - 1].fixedPaint || importance.fixedPaint) &&
      colors[importance.color - 1].finish !== importance.finish;

    if (isNotValidToOverride) {
      return false;
    }
    colors[importance.color - 1] = Object.assign(
      {},
      colors[importance.color - 1],
      importance
    );
    return true;
  })(color);

  if (!found) return false;
  const result = pipe(
    map((color, i) => {
      return color
        ? color
        : {
            color: inc(i),
            finish: "G"
          };
    }),
    map(color => color.finish)
  )(colors);

  if (!solutionSatisfiesAllCustomers(result, customerColorInterest)) {
    return false;
  }
  return result.join(" ");
};

const calculateResult = ({ numberOfColors, customerColorInterest }) => {
  const colorSturcture = structureCustomerColorInterest(customerColorInterest);
  
  // multiply the number of element in every set of
  //paint to get possible combinations
  const possibleCombinatons = customerColorInterest.reduce(
    (accumulator, currentValue) => accumulator * currentValue.length,
    1
  );

  for (let i = 0; i < possibleCombinatons; i++) {
    const sortedColors = colorMixSolution(i, colorSturcture);
    const solution = finishMixing(
      numberOfColors,
      sortedColors,
      customerColorInterest
    );
    if (solution) return solution;
  }

  return "No solution exists";
};

module.exports = calculateResult;
