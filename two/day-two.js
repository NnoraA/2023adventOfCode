const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  const gameArr = data.split("\n");

  const possibleObj = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const possibleIdsSum = gameArr.reduce((acc, game) => {
    const [round, values] = game.split(":");
    const sets = values.split(" ");
    const id = round.split(" ")[1];

    const isPossible = sets.find((set, index) => {
      const parsedValue = parseInt(set);
      if (!!parsedValue) {
        const color =
          index + 1 === sets.length - 1
            ? sets[index + 1]
            : sets[index + 1].slice(0, -1);
        return parsedValue > parseInt(possibleObj[color]);
      }
      return false;
    });

    return isPossible ? acc : parseInt(id) + acc;
  }, 0);

  console.log("first part", possibleIdsSum);

  const sumOfPowerSets = gameArr.reduce((acc, game) => {
    const values = game.split(":")[1];
    const sets = values.split(" ");

    const minimumNumCubeObj = {
      red: 0,
      green: 0,
      blue: 0,
    };

    sets.forEach((set, index) => {
      const parsedValue = parseInt(set);
      if (!!parsedValue) {
        const color =
          index + 1 === sets.length - 1
            ? sets[index + 1]
            : sets[index + 1].slice(0, -1);
        if (parsedValue > minimumNumCubeObj[color]) {
          minimumNumCubeObj[color] = parsedValue;
        }
      }
    });

    const power =
      minimumNumCubeObj["red"] *
      minimumNumCubeObj["green"] *
      minimumNumCubeObj["blue"];

    return acc + power;
  }, 0);

  console.log("secound part", sumOfPowerSets);
});
