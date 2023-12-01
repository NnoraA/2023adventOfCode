const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  const calibrationValuesArr = data.split("\n");

  const sumOfOriginalNums = calibrationValuesArr.reduce((acc, calibration) => {
    const splittedCalArr = calibration.split("");
    const numsArr = splittedCalArr.filter((car) => !!parseInt(car));
    const joinedNumber = parseInt(numsArr[0] + numsArr[numsArr.length - 1]);
    return acc + joinedNumber;
  }, 0);

  console.log("first part", sumOfOriginalNums);

  const possibleWords = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  const switchToNumber = (calString, word, num) => {
    const index = calString.indexOf(word);

    const switchedSubString = `${calString.substring(
      0,
      index
    )}${num}${calString.substring(index + 1, calString.length)}`;

    if (switchedSubString.includes(word)) {
      return switchToNumber(switchedSubString, word, num);
    }

    return switchedSubString;
  };

  const realSumOfOriginalNums = calibrationValuesArr.reduce(
    (acc, calibration) => {
      for (let index = 3; index <= calibration.length; index++) {
        const subOfCalibration = calibration.substring(0, index);

        Object.entries(possibleWords).forEach(([word, num]) => {
          if (subOfCalibration.includes(word)) {
            calibration = switchToNumber(calibration, word, num);
          }
        });
      }

      const splittedCalArr = calibration.split("");
      const numsArr = splittedCalArr.filter((car) => !!parseInt(car));
      const joinedNumber = parseInt(numsArr[0] + numsArr[numsArr.length - 1]);

      return acc + joinedNumber;
    },
    0
  );

  console.log("secound part", realSumOfOriginalNums);
});
