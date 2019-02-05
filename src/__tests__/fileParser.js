const { join } = require("path");
const fileParser = require("../fileParser");

test("It should run through file and return line values", done => {
  const expectedResult = {
    numberOfColors: 5,
    customerColorInterest: [
      [
        {
          color: 1,
          finish: "M"
        },
        {
          color: 3,
          finish: "G"
        },
        {
          color: 5,
          finish: "G"
        }
      ],
      [
        {
          color: 2,
          finish: "G"
        },
        {
          color: 3,
          finish: "M"
        },
        {
          color: 4,
          finish: "G"
        }
      ],
      [
        {
          color: 5,
          finish: "M"
        }
      ]
    ]
  };
  const output = fileParser(
    join(__dirname, "..", "..", "testcases", "testscenario1.txt")
  );
  expect(output).toEqual(expectedResult);
  done();
});
