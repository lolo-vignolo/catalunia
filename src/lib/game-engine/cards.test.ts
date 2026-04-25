import { describe, it, expect } from 'vitest';
import {
  getCardById,
  isCardUnlocked,
  getTotalProgress,
  getAllCards,
} from './cards';

// Fixtures
const SIURANA_TOKEN = '86753098'; // card 1
const PRADES_TOKEN = '20394857';  // card 2
const UNKNOWN_TOKEN = '00000000';

describe('getCardById — initial state', () => {
  it('returns undefined for an unknown token', () => {
    expect(getCardById(UNKNOWN_TOKEN, [])).toBeUndefined();
  });

  it('returns a Card for a valid token', () => {
    const card = getCardById(SIURANA_TOKEN, []);
    expect(card).toBeDefined();
    expect(card?.passwordImg).toBe(SIURANA_TOKEN);
  });

  it('returned Card has all required fields', () => {
    const card = getCardById(SIURANA_TOKEN, [])!;
    expect(card.id).toBe('1');
    expect(card.townName).toBe('Siurana');
    expect(card.slug).toBe('siurana');
    expect(card.imagePath).toContain('cat-bn-1.png');
    expect(card.colorImagePath).toContain('700-Prades-Pilarin-1');
    expect(card.poem.row1.length).toBeGreaterThan(0);
  });
});

describe('getCardById — unlock interaction', () => {
  it('isUnlocked is false when card is NOT in unlockedCards', () => {
    const card = getCardById(SIURANA_TOKEN, [])!;
    expect(card.isUnlocked).toBe(false);
  });

  it('isUnlocked is true when card IS in unlockedCards', () => {
    const card = getCardById(SIURANA_TOKEN, [SIURANA_TOKEN])!;
    expect(card.isUnlocked).toBe(true);
  });

  it('only the matching card is marked unlocked', () => {
    const card = getCardById(PRADES_TOKEN, [SIURANA_TOKEN])!;
    expect(card.isUnlocked).toBe(false);
  });
});

describe('getCardById — accessibility', () => {
  it('townName is a non-empty string (used in aria-label)', () => {
    const card = getCardById(SIURANA_TOKEN, [])!;
    expect(card.townName.trim().length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------

describe('isCardUnlocked', () => {
  it('returns false when unlocked list is empty', () => {
    expect(isCardUnlocked(SIURANA_TOKEN, [])).toBe(false);
  });

  it('returns true when token is in the list', () => {
    expect(isCardUnlocked(SIURANA_TOKEN, [SIURANA_TOKEN])).toBe(true);
  });

  it('returns false for unknown token even if list is non-empty', () => {
    expect(isCardUnlocked(UNKNOWN_TOKEN, [SIURANA_TOKEN])).toBe(false);
  });
});

// ---------------------------------------------------------------------------

describe('getTotalProgress — initial state', () => {
  it('returns 0 / 20 / 0% when nothing is unlocked', () => {
    const progress = getTotalProgress([]);
    expect(progress.unlocked).toBe(0);
    expect(progress.total).toBe(20);
    expect(progress.percentage).toBe(0);
  });
});

describe('getTotalProgress — interaction', () => {
  it('counts unlocked cards correctly', () => {
    const progress = getTotalProgress([SIURANA_TOKEN, PRADES_TOKEN]);
    expect(progress.unlocked).toBe(2);
    expect(progress.percentage).toBe(10);
  });

  it('returns 100% when all 20 cards are unlocked', () => {
    const allTokens = getAllCards([]).map((c) => c.passwordImg);
    const progress = getTotalProgress(allTokens);
    expect(progress.unlocked).toBe(20);
    expect(progress.percentage).toBe(100);
  });
});

// ---------------------------------------------------------------------------

describe('getAllCards — initial state', () => {
  it('returns exactly 20 cards', () => {
    expect(getAllCards([])).toHaveLength(20);
  });

  it('all cards are locked when unlockedCards is empty', () => {
    const cards = getAllCards([]);
    expect(cards.every((c) => !c.isUnlocked)).toBe(true);
  });

  it('preserves card order (first card is Siurana)', () => {
    const cards = getAllCards([]);
    expect(cards[0].townName).toBe('Siurana');
  });
});

describe('getAllCards — interaction', () => {
  it('marks only unlocked cards as unlocked', () => {
    const cards = getAllCards([SIURANA_TOKEN]);
    const siurana = cards.find((c) => c.passwordImg === SIURANA_TOKEN)!;
    const prades = cards.find((c) => c.passwordImg === PRADES_TOKEN)!;
    expect(siurana.isUnlocked).toBe(true);
    expect(prades.isUnlocked).toBe(false);
  });
});

describe('getAllCards — accessibility', () => {
  it('every card has a non-empty townName for aria-label construction', () => {
    const cards = getAllCards([]);
    cards.forEach((card) => {
      expect(card.townName.trim().length).toBeGreaterThan(0);
    });
  });
});
