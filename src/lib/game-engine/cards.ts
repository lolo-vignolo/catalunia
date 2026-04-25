/**
 * Game-engine functions for the card collection.
 *
 * Pure functions — no React, no side-effects, fully testable in isolation.
 * Components call these; game-engine never imports React.
 */

import { cardsData } from '@/data/cardData';
import type { Card, CardData } from '@/types/game';
import { TOTAL_CARDS } from '@/constants/cards';

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Derive a URL-safe slug from a town name (strips diacritics). */
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Map the legacy raw data shape to our typed CardData. */
function toCardData(raw: (typeof cardsData)[number]): CardData {
  return {
    id: raw.id,
    slug: toSlug(raw.titles[0]),
    townName: raw.titles[0],
    titles: raw.titles,
    imagePath: raw.portadaImg,
    colorImagePath: raw.image,
    borderColor: raw.borderColor,
    passwordImg: raw.passwordImg,
    poem: {
      row1: raw.description_row1,
      row2: raw.description_row2,
      row3: raw.description_row3,
      row4: raw.description_row4,
    },
    mapLink: raw.link,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Returns the Card (data + unlock status) for a given ?id= param value,
 * or `undefined` if the token is not recognised.
 */
export function getCardById(
  passwordImg: string,
  unlockedCards: string[],
): Card | undefined {
  const raw = cardsData.find((c) => c.passwordImg === passwordImg);
  if (!raw) return undefined;
  return { ...toCardData(raw), isUnlocked: unlockedCards.includes(passwordImg) };
}

/**
 * Returns true when the card identified by `passwordImg` is in the
 * player's unlocked collection.
 */
export function isCardUnlocked(
  passwordImg: string,
  unlockedCards: string[],
): boolean {
  return unlockedCards.includes(passwordImg);
}

/**
 * Returns unlock progress: count, total and percentage (0–100).
 */
export function getTotalProgress(unlockedCards: string[]): {
  unlocked: number;
  total: number;
  percentage: number;
} {
  const unlocked = unlockedCards.length;
  return {
    unlocked,
    total: TOTAL_CARDS,
    percentage: Math.round((unlocked / TOTAL_CARDS) * 100),
  };
}

/**
 * Returns all 20 cards with their current unlock status.
 * Preserves the original card order.
 */
export function getAllCards(unlockedCards: string[]): Card[] {
  return cardsData.map((raw) => ({
    ...toCardData(raw),
    isUnlocked: unlockedCards.includes(raw.passwordImg),
  }));
}
