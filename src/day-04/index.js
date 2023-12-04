function toScratchcards(input) {
  return input.map((line) => {
    // Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
    const [card, cardData] = line.split(':');
    const [, id] = card.split(/\s+/).map(Number);
    const [winningNumbersString, numbersString] = cardData.split('|');
    const winningNumbers = new Set(
      winningNumbersString.trim().split(/\s+/).map(Number)
    );
    const numbers = new Set(numbersString.trim().split(/\s+/).map(Number));
    return { id, winningNumbers, numbers };
  });
}

const idScores = new Map();
function scoreScratchcard({ id, winningNumbers, numbers }) {
  if (idScores.has(id)) {
    return idScores.get(id);
  }
  const matches = [...numbers].filter((number) => winningNumbers.has(number));
  const score = matches.length === 0 ? 0 : Math.pow(2, matches.length - 1);
  const r = { score, totalMatched: matches.length };
  idScores.set(id, r);
  return r;
}

function getCleanState(cards, initialValue = 0) {
  const state = new Map();
  for (const card of cards) {
    state.set(card.id, initialValue);
  }
  return state;
}

export function part1(input) {
  const scratchcards = toScratchcards(input);
  let score = 0;
  for (const card of scratchcards) {
    score += scoreScratchcard(card).score;
  }
  return score;
}

export function part2(input) {
  const scratchcards = toScratchcards(input);
  const scratchcardsCounts = getCleanState(scratchcards, 1);
  for (const card of scratchcards) {
    const { totalMatched } = scoreScratchcard(card);
    for (let i = 1; i <= totalMatched; i++) {
      const cardId = card.id + i;
      if (!scratchcardsCounts.has(cardId)) break;
      scratchcardsCounts.set(
        cardId,
        scratchcardsCounts.get(cardId) + scratchcardsCounts.get(card.id)
      );
    }
  }
  return Array.from(scratchcardsCounts.values()).reduce((a, b) => a + b);
}
