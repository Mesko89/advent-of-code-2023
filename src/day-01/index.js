const digitRx = /\d/;
function calibrationValues(input) {
  return input.map((line) => {
    const firstNumber = line.split('').find((a) => digitRx.test(a));
    const lastNumber = line
      .split('')
      .reverse()
      .find((a) => digitRx.test(a));
    return parseInt(firstNumber, 10) * 10 + parseInt(lastNumber, 10);
  });
}

const properDigitRx = /(one|two|three|four|five|six|seven|eight|nine|\d)/;
const properDigitReversedRx =
  /(eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|\d)/;
const toIntMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
};
function properCalibrationValues(input) {
  return input.map((line) => {
    const [, first] = line.match(properDigitRx);
    const [, last] = line
      .split('')
      .reverse()
      .join('')
      .match(properDigitReversedRx);
    const firstNumber = toIntMap[first];
    const lastNumber = toIntMap[last.split('').reverse().join('')];
    return firstNumber * 10 + lastNumber;
  });
}

export function part1(input) {
  return calibrationValues(input).reduce((a, b) => a + b);
}
export function part2(input) {
  return properCalibrationValues(input).reduce((a, b) => a + b);
}
