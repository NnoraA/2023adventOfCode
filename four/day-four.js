const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  const scratchcards = data.split("\n");
  const totalWorth = scratchcards.reduce((acc, card) => {
    const numbers = card.split(":")[1];
    const [winnerNums, elfNums] = numbers.split("|");
    const winnerNumsArr = winnerNums.split(" ");
    const elfNumsArr = elfNums.split(" ").filter((num) => num !== "");

    const elfWinnerNums = elfNumsArr.filter((elfNum) =>
      winnerNumsArr.includes(elfNum)
    );

    return elfWinnerNums.length !== 0
      ? acc + Math.pow(2, elfWinnerNums.length - 1)
      : acc;
  }, 0);

  //console.log("first part", totalWorth);

  const cardsWithCopy = scratchcards.map((card) => {
    const numbers = card.split(":")[1];
    const [winnerNums, elfNums] = numbers.split("|");
    const winnerNumsArr = winnerNums.split(" ");
    const elfNumsArr = elfNums.split(" ").filter((num) => num !== "");

    const elfWinnerNums = elfNumsArr.filter((elfNum) =>
      winnerNumsArr.includes(elfNum)
    );

    console.log(elfWinnerNums);

    return { elfWinnerNums, copyNum: 1 };
  });

  const totalCard = cardsWithCopy.reduce((acc, curr, i) => {
    const copyNumber = curr["elfWinnerNums"].length;
    if (copyNumber > 0) {
      console.log("hány", curr["copyNum"]);
      for (let copy = 0; copy < curr["copyNum"]; copy++) {
        for (let index = i + 1; index < i + 1 + copyNumber; index++) {
          console.log(i, index, "c", cardsWithCopy[i]["copyNum"]);
          cardsWithCopy[index]["copyNum"] += 1;
        }
      }
    }
    console.log(curr);

    return acc + curr["copyNum"];
  }, 0);

  console.log("secound part", totalCard);
});
