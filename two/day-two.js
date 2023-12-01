const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  const calibrationValuesArr = data.split("\n");

  console.log(calibrationValuesArr);
});
