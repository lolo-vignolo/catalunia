/**
 * Tests for useGameStore.
 *
 * Zustand stores are tested by directly calling actions and asserting
 * on the resulting state — no React rendering needed for pure store tests.
 *
 * Run with: npx vitest
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from './useGameStore';

// Zustand v5 exposes .getState() / .setState() on the store object itself
const store = useGameStore;

const SIURANA_TOKEN = '86753098';
const PRADES_TOKEN = '20394857';
const UNKNOWN_TOKEN = '00000000';

function resetStore() {
  store.setState({ unlockedCards: [], tokens: 0 });
}

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------
describe('useGameStore — initial state', () => {
  beforeEach(resetStore);

  it('starts with an empty unlockedCards array', () => {
    expect(store.getState().unlockedCards).toHaveLength(0);
  });

  it('starts with 0 tokens', () => {
    expect(store.getState().tokens).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// unlockCard interaction
// ---------------------------------------------------------------------------
describe('useGameStore — unlockCard interaction', () => {
  beforeEach(resetStore);

  it('adds a valid token to unlockedCards', () => {
    store.getState().unlockCard(SIURANA_TOKEN);
    expect(store.getState().unlockedCards).toContain(SIURANA_TOKEN);
  });

  it('increments tokens by 1 on each valid unlock', () => {
    store.getState().unlockCard(SIURANA_TOKEN);
    expect(store.getState().tokens).toBe(1);

    store.getState().unlockCard(PRADES_TOKEN);
    expect(store.getState().tokens).toBe(2);
  });

  it('does NOT add a duplicate token', () => {
    store.getState().unlockCard(SIURANA_TOKEN);
    store.getState().unlockCard(SIURANA_TOKEN); // duplicate

    expect(store.getState().unlockedCards).toHaveLength(1);
    expect(store.getState().tokens).toBe(1);
  });

  it('ignores an unknown / invalid token', () => {
    store.getState().unlockCard(UNKNOWN_TOKEN);

    expect(store.getState().unlockedCards).toHaveLength(0);
    expect(store.getState().tokens).toBe(0);
  });

  it('preserves order of unlocked cards', () => {
    store.getState().unlockCard(SIURANA_TOKEN);
    store.getState().unlockCard(PRADES_TOKEN);

    const { unlockedCards } = store.getState();
    expect(unlockedCards[0]).toBe(SIURANA_TOKEN);
    expect(unlockedCards[1]).toBe(PRADES_TOKEN);
  });
});

// ---------------------------------------------------------------------------
// Accessibility — token counter used in aria-label / ProgressBar
// ---------------------------------------------------------------------------
describe('useGameStore — accessibility', () => {
  beforeEach(resetStore);

  it('tokens value is always a non-negative integer (safe for aria-valuenow)', () => {
    expect(store.getState().tokens).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(store.getState().tokens)).toBe(true);
  });

  it('unlockedCards.length matches tokens after multiple unlocks', () => {
    store.getState().unlockCard(SIURANA_TOKEN);
    store.getState().unlockCard(PRADES_TOKEN);

    const { tokens, unlockedCards } = store.getState();
    expect(tokens).toBe(unlockedCards.length);
  });
});
