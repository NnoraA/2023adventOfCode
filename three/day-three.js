const { log } = require("console");
const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  const schematicArr = data.split("\n");

  const splittedArr = schematicArr.map((row) => row.split(""));

  const isSymbol = (caracter) =>
    isNaN(parseInt(caracter)) && caracter !== "." && caracter !== undefined;

  let sum = 0;

  splittedArr.forEach((column, columnIndex) => {
    let numArr = [];
    let isPartNum = false;

    column.forEach((row, rowIndex) => {
      const parsedValue = parseInt(row);
      if (!isNaN(parsedValue)) {
        numArr.push(row);
        const middleLeft =
          splittedArr[columnIndex - 1] &&
          isSymbol(splittedArr[columnIndex - 1][rowIndex]);
        const middleRight =
          splittedArr[columnIndex + 1] &&
          isSymbol(splittedArr[columnIndex + 1][rowIndex]);
        const top = isSymbol(splittedArr[columnIndex][rowIndex + 1]);
        const bottom = isSymbol(splittedArr[columnIndex][rowIndex - 1]);
        const topLeft =
          splittedArr[columnIndex - 1] &&
          isSymbol(splittedArr[columnIndex - 1][rowIndex + 1]);
        const topRight =
          splittedArr[columnIndex + 1] &&
          isSymbol(splittedArr[columnIndex + 1][rowIndex + 1]);
        const bottomLeft =
          splittedArr[columnIndex - 1] &&
          isSymbol(splittedArr[columnIndex - 1][rowIndex - 1]);
        const bottomRight =
          splittedArr[columnIndex + 1] &&
          isSymbol(splittedArr[columnIndex + 1][rowIndex - 1]);

        const hasSymbolAdjacent =
          middleLeft ||
          middleRight ||
          top ||
          bottom ||
          topLeft ||
          topRight ||
          bottomLeft ||
          bottomRight;

        if (hasSymbolAdjacent) {
          isPartNum = true;
        }
      }

      const numEnd = isNaN(parsedValue) || rowIndex === column.length - 1;
      if (numEnd && !isNaN(parseInt(column[rowIndex - 1])) && isPartNum) {
        const partNum = numArr.join("");
        sum += parseInt(partNum);
        isPartNum = false;
        numArr = [];
      } else if (isNaN(parsedValue) && !isNaN(parseInt(column[rowIndex - 1]))) {
        numArr = [];
      }
    });
  });

  //console.log("first part", sum);

  const possibleGears = [];

  splittedArr.forEach((row, rowIndex) => {
    row.forEach((car, columnIndex) => {
      if (car === "*") {
        const topSlice =
          splittedArr[rowIndex + 1] &&
          splittedArr[rowIndex + 1].slice(columnIndex - 3, columnIndex + 4);
        const middleSlice =
          splittedArr[rowIndex] &&
          splittedArr[rowIndex].slice(columnIndex - 3, columnIndex + 4);
        const bottomSlice =
          splittedArr[rowIndex - 1] &&
          splittedArr[rowIndex - 1].slice(columnIndex - 3, columnIndex + 4);

        let obj = { topSlice, middleSlice, bottomSlice };
        possibleGears.push(obj);
      }
    });
  });

  const wrapNumer = (arrOne, arrTwo, caracter, arr, index) => {
    if (!isNaN(parseInt(caracter))) {
      if (
        (index === 4 && isNaN(parseInt(arr[index - 1]))) ||
        (index === 1 && isNaN(parseInt(arr[index + 1]))) ||
        (index === 5 && isNaN(parseInt(arr[index - 1]))) ||
        (index === 0 && isNaN(parseInt(arr[index + 1]))) ||
        (isNaN(parseInt(arr[2])) &&
          isNaN(parseInt(arr[3])) &&
          isNaN(parseInt(arr[4])))
      ) {
        return;
      }
      if (
        arrOne.length === 0 ||
        (arrOne.length < 3 &&
          arrOne.length > 0 &&
          !isNaN(parseInt(arr[index - 1])))
      ) {
        arrOne.push(caracter);
      } else if (arrOne.length !== 0 && isNaN(parseInt(arr[index - 1]))) {
        arrTwo.push(caracter);
      }
    }
  };

  const gearArr = possibleGears.map((pgear) => {
    const gearOne = [];
    const gearTwo = [];
    pgear["topSlice"].forEach((car, i) => {
      wrapNumer(gearOne, gearTwo, car, pgear["topSlice"], i);
    });

    pgear["middleSlice"].forEach((car, i) => {
      wrapNumer(gearOne, gearTwo, car, pgear["middleSlice"], i);
    });

    pgear["bottomSlice"].forEach((car, i) => {
      wrapNumer(gearOne, gearTwo, car, pgear["bottomSlice"], i);
    });

    console.log(gearOne, gearTwo);
    return gearOne.length !== 0 && gearTwo.length !== 0
      ? gearOne.join("") * gearTwo.join("")
      : 0;
  });

  const sumOfGears = gearArr.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  console.log(sumOfGears);
});
