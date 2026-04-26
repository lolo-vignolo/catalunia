'use client';

/**
 * Global game store — source of truth for the player's collection.
 *
 * Persisted to localStorage via Zustand persist middleware so progress
 * survives page reloads and QR rescans.
 *
 * Shape follows the GameState interface in src/types/game.ts.
 * All mutation logic lives here; UI components only call the actions.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { GameState } from '@/types/game';
import { CARD_TOKEN_SET } from '@/constants/cards';

type GameStore = Omit<GameState, never>;

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      unlockedCards: [] as string[],
      tokens: 0,
      _hasHydrated: false,

      setHasHydrated: (value: boolean) => set({ _hasHydrated: value }),

      unlockCard: (passwordImg: string) => {
        // Guard: only accept valid tokens, never duplicate
        if (!CARD_TOKEN_SET.has(passwordImg)) return;
        if (get().unlockedCards.includes(passwordImg)) return;

        set((state) => ({
          unlockedCards: [...state.unlockedCards, passwordImg],
          tokens: state.tokens + 1,
        }));
      },
    }),
    {
      name: 'qr-game-store', // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist the data, not the actions or transient flags
      partialize: (state) => ({
        unlockedCards: state.unlockedCards,
        tokens: state.tokens,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
