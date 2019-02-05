const { readFileSync } = require("fs");
const { compose, reduce, map, filter, split, or } = require("ramda");

/*
GOAL - TURN [ '1 G 2 G', '2 G', '2 G', '' ]
TO  - [ [ { color: 1, finish: 'G' }, { color: 2, finish: 'G' } ],
   [ { color: 2, finish: 'G' } ],
   [ { color: 2, finish: 'G' } ] ]
*/

const fileParser = filePath => {
  const content = readFileSync(filePath, "utf8");
  const lines = content.split(/[\r\n]+/);

  const numberOfColors = parseInt(lines.shift(), 10);

  const customerColorInterest = compose(
    map(record =>
      reduce(
        (accumulator, currentValue) => {
          or(currentValue === "M", currentValue === "G")
            ? (accumulator[accumulator.length - 1].finish = currentValue)
            : accumulator.push({ color: parseInt(currentValue, 10) });
          return accumulator;
        },
        [],
        record
      )
    ),
    filter(records => !!records[0]),
    map(split(/\s+/))
  )(lines);

  return { numberOfColors, customerColorInterest };
};

module.exports = fileParser;
