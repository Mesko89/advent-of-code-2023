function parseGames(input) {
  return input.map((line) => {
    // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    const [game, gameData] = line.split(':');
    const gameNumber = parseInt(game.split(' ')[1], 10);
    const rounds = gameData.split(';').map((round) => {
      return round.split(',').reduce((map, roll) => {
        const [numberString, color] = roll.trim().split(' ');
        map[color] = parseInt(numberString, 10);
        return map;
      }, {});
    });
    return { gameNumber, rounds };
  });
}

function isValidGame(game, marbles) {
  return game.rounds.every((round) => {
    const colors = Object.keys(round);
    return !colors.some((color) => {
      return round[color] > marbles[color];
    });
  });
}

function findMinimumMarbles(game) {
  const minimums = {
    red: 0,
    green: 0,
    blue: 0,
  };
  for (const round of game.rounds) {
    const colors = Object.keys(round);
    for (const color of colors) {
      minimums[color] = Math.max(minimums[color], round[color]);
    }
  }
  return minimums;
}

export function part1(input) {
  const games = parseGames(input);
  return games
    .filter((game) => isValidGame(game, { red: 12, green: 13, blue: 14 }))
    .map((game) => game.gameNumber)
    .reduce((a, b) => a + b);
}

export function part2(input) {
  const games = parseGames(input);
  return games
    .map((game) => findMinimumMarbles(game))
    .map(({ red, green, blue }) => red * green * blue)
    .reduce((a, b) => a + b);
}
