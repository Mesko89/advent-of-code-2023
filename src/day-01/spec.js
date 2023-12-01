import { part1, part2 } from './index';

describe('Day 1: Trebuchet?!', () => {
  describe('part1', () => {
    it('should solve it', () => {
      expect(part1(['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet'])).toBe(
        142
      );
    });
  });
  describe('part2', () => {
    it('should solve it', () => {
      expect(part2(['sevenine'])).toBe(79);
      expect(
        part2([
          'two1nine',
          'eightwothree',
          'abcone2threexyz',
          'xtwone3four',
          '4nineeightseven2',
          'zoneight234',
          '7pqrstsixteen',
        ])
      ).toBe(281);
    });
  });
});
