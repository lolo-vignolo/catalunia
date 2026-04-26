/**
 * Static card data — shape of every cromo in the auca.
 * Does NOT include runtime game state (isUnlocked).
 */
export interface CardData {
  /** Sequential numeric id, "1"–"20" */
  id: string;
  /** URL-safe slug derived from the primary town name */
  slug: string;
  /** Primary town name (first element of titles) */
  townName: string;
  /** All town names covered by this card (1 or 2) */
  titles: string[];
  /** Black-and-white portada image path (locked state) */
  imagePath: string;
  /** Full-colour image path (unlocked state) */
  colorImagePath: string;
  /** Accent border colour for this card */
  borderColor: string;
  /**
   * QR-code token — this is the value in the ?id= URL param.
   * ⚠️  Never rename or re-map: physical QR codes in print point to
   *     /cardpage?id=<passwordImg>
   */
  passwordImg: string;
  /** Four-line medieval poem for this card */
  poem: {
    row1: string;
    row2: string;
    row3: string;
    row4: string;
  };
  /** Google Maps link for the card's location */
  mapLink: string;
}

/**
 * Card as seen by UI components — static data merged with
 * the current unlock state from the Zustand store.
 */
export interface Card extends CardData {
  isUnlocked: boolean;
}

/**
 * Shape of the global Zustand game store.
 * unlockedCards holds passwordImg values of scanned QR codes.
 */
export interface GameState {
  unlockedCards: string[];
  tokens: number;
  _hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  unlockCard: (passwordImg: string) => void;
}
