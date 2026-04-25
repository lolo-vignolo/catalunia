'use client';

import { useState, useEffect } from 'react';
import { GameCard } from './GameCard';
import { ProgressBar } from './ProgressBar';
import { CelebrationModal } from './CelebrationModal';
import { FlourishAlt } from '@/svg/Flourish';
import { useGameStore } from '@/hooks/useGameStore';
import { getAllCards } from '@/lib/game-engine/cards';
import type { Card } from '@/types/game';
import styles from './cardGrid.module.css';

/**
 * Client component — owns all interactive game state.
 * Rendered by the Server Component page.tsx via Suspense.
 */
export function CardGrid() {
  const { unlockedCards, unlockCard } = useGameStore();
  const [celebrationCard, setCelebrationCard] = useState<Card | null>(null);

  /**
   * One-time migration from the legacy `qr-list` (CSV) localStorage key
   * used before Zustand was introduced.
   */
  useEffect(() => {
    const migrated = localStorage.getItem('qr-migrated');
    if (migrated) return;

    const legacy = localStorage.getItem('qr-list');
    if (legacy) {
      legacy
        .split(',')
        .filter(Boolean)
        .forEach((token) => unlockCard(token));
      localStorage.removeItem('qr-list');
    }
    localStorage.setItem('qr-migrated', '1');
  }, [unlockCard]);

  /**
   * Show celebration when returning from a QR scan.
   * Pergamino sets sessionStorage['newlyUnlocked'] before navigating back.
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const newlyUnlockedId = sessionStorage.getItem('newlyUnlocked');
    if (!newlyUnlockedId) return;
    sessionStorage.removeItem('newlyUnlocked');
    const card = getAllCards(unlockedCards).find(
      (c) => c.passwordImg === newlyUnlockedId && c.isUnlocked,
    );
    if (card) setCelebrationCard(card);
  }, []); // run once on mount — Zustand is already hydrated from localStorage

  const cards = getAllCards(unlockedCards);

  return (
    <>
      <ProgressBar unlocked={unlockedCards.length} />

      {/* role="list" pairs with role="listitem" on each GameCard article */}
      <div role="list" className={styles.grid}>
        {cards.map((card, index) => (
          <GameCard
            key={card.id}
            card={card}
            isUnlocked={card.isUnlocked}
            index={index}
          />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '1rem 0' }}>
        <FlourishAlt />
      </div>

      <CelebrationModal
        card={celebrationCard}
        unlockedCount={unlockedCards.length}
        onClose={() => setCelebrationCard(null)}
      />
    </>
  );
}
