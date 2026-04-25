import { describe, it, expect } from 'vitest';
import {
  TOTAL_CARDS,
  CARD_IDS,
  CARD_TOKENS,
  CARD_TOKEN_SET,
} from './cards';

describe('cards constants — initial state', () => {
  it('TOTAL_CARDS is 20', () => {
    expect(TOTAL_CARDS).toBe(20);
  });

  it('CARD_IDS has exactly 20 entries', () => {
    expect(CARD_IDS).toHaveLength(20);
  });

  it('CARD_IDS starts at "1" and ends at "20"', () => {
    expect(CARD_IDS[0]).toBe('1');
    expect(CARD_IDS[19]).toBe('20');
  });

  it('CARD_TOKENS has exactly 20 entries', () => {
    expect(CARD_TOKENS).toHaveLength(20);
  });

  it('CARD_TOKEN_SET size matches CARD_TOKENS length (no duplicates)', () => {
    expect(CARD_TOKEN_SET.size).toBe(CARD_TOKENS.length);
  });
});

describe('cards constants — token lookup', () => {
  it('known token is found in CARD_TOKEN_SET', () => {
    expect(CARD_TOKEN_SET.has('86753098')).toBe(true); // Siurana
  });

  it('unknown token is not found in CARD_TOKEN_SET', () => {
    expect(CARD_TOKEN_SET.has('00000000')).toBe(false);
  });

  it('each CARD_IDS entry maps to a corresponding token', () => {
    CARD_IDS.forEach((id, index) => {
      expect(CARD_TOKENS[index]).toBeDefined();
      expect(typeof CARD_TOKENS[index]).toBe('string');
    });
  });
});

describe('cards constants — accessibility (text availability)', () => {
  it('every token is a non-empty string (usable as aria-label / URL param)', () => {
    CARD_TOKENS.forEach((token) => {
      expect(token.trim().length).toBeGreaterThan(0);
    });
  });
});
