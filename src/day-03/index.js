const key = (x, y) => `${x},${y}`;
function parseGearsGrid(grid) {
  const numbers = [];
  const symbols = new Map();
  for (let y = 0; y < grid.length; y++) {
    const line = grid[y];
    for (let x = 0; x < line.length; x++) {
      if (line[x] === '.') continue;
      if (/\d/.test(line[x])) {
        const pos = { x, y };
        do {
          x++;
        } while (/\d/.test(line[x]));
        const number = parseInt(line.substring(pos.x, x), 10);
        numbers.push({ number, pos, length: x - pos.x });
        x--;
      } else {
        symbols.set(key(x, y), { pos: { x, y }, symbol: line[x] });
      }
    }
  }
  return { numbers, symbols };
}

function getPartSymbols(number, symbols) {
  const partSymbols = [];
  const { pos, length } = number;
  // Check top row
  for (let x = pos.x - 1; x <= pos.x + length; x++) {
    const key = `${x},${pos.y - 1}`;
    if (symbols.has(key)) {
      partSymbols.push(symbols.get(key));
    }
  }
  // Check bottom row
  for (let x = pos.x - 1; x <= pos.x + length; x++) {
    const key = `${x},${pos.y + 1}`;
    if (symbols.has(key)) {
      partSymbols.push(symbols.get(key));
    }
  }
  // Check left column
  const leftKey = `${pos.x - 1},${pos.y}`;
  if (symbols.has(leftKey)) {
    partSymbols.push(symbols.get(leftKey));
  }
  // Check right column
  const rightKey = `${pos.x + length},${pos.y}`;
  if (symbols.has(rightKey)) {
    partSymbols.push(symbols.get(rightKey));
  }
  return partSymbols;
}

function findPartNumbers(gearsGrid) {
  const { numbers, symbols } = gearsGrid;
  return numbers.filter((number) => getPartSymbols(number, symbols).length > 0);
}

export function part1(input) {
  const gearsGrid = parseGearsGrid(input);
  return findPartNumbers(gearsGrid).reduce((a, b) => a + b.number, 0);
}

export function part2(input) {
  const gearsGrid = parseGearsGrid(input);
  const numbersWithSymbols = gearsGrid.numbers.map((number) => {
    return {
      number: number.number,
      symbols: getPartSymbols(number, gearsGrid.symbols),
    };
  });
  const numbersPerGearSymbol = {};
  for (const { number, symbols } of numbersWithSymbols) {
    for (const { pos, symbol } of symbols) {
      if (symbol !== '*') continue;
      const posKey = key(pos.x, pos.y);
      if (!numbersPerGearSymbol[posKey]) {
        numbersPerGearSymbol[posKey] = [];
      }
      numbersPerGearSymbol[posKey].push(number);
    }
  }
  return Object.entries(numbersPerGearSymbol)
    .filter(([, numbers]) => numbers.length > 1)
    .map(([, numbers]) => numbers.reduce((a, b) => a * b, 1))
    .reduce((a, b) => a + b, 0);
}
