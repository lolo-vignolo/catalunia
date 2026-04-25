/**
 * Static constants for the 20-card auca collection.
 *
 * CARD_TOKENS are the ?id= values embedded in every physical QR code.
 * ⚠️  Never reorder or reassign — printed QR codes are immutable.
 */

export const TOTAL_CARDS = 20 as const;

/** Sequential card ids, "1" through "20". */
export const CARD_IDS = [
  '1', '2', '3', '4', '5',
  '6', '7', '8', '9', '10',
  '11', '12', '13', '14', '15',
  '16', '17', '18', '19', '20',
] as const;

export type CardId = (typeof CARD_IDS)[number];

/**
 * QR-code tokens (passwordImg) in card order (card 1 → index 0, …).
 * Each token corresponds to a unique physical QR sticker.
 */
export const CARD_TOKENS = [
  '86753098', // 1  – Siurana
  '20394857', // 2  – Prades
  '48572619', // 3  – Falset
  '73619284', // 4  – Capafonts / Bellmunt de Priorat
  '84736291', // 5  – La Febró / El Molar
  '28374651', // 6  – Arbolí / El Masroig
  '91028374', // 7  – Cornudella de Montsant / Marçà
  '74839201', // 8  – Albarca / Capçanes
  '91029384', // 9  – Ulldemolins / Els Guiamets
  '74829301', // 10 – Vilanova de Prades / Garcia
  '57382910', // 11 – Vallclara / Móra d'Ebre
  '38475619', // 12 – La Riba / Tivissa
  '82937456', // 13 – Farena / Pratdip
  '18293746', // 14 – Mont-ral / Vandellòs
  '48573629', // 15 – L'Aleixar / L'Hospitalet de l'Infant
  '19384756', // 16 – Maspujols / Gratallops
  '91028375', // 17 – La Morera de Montsant / Torroja del Priorat
  '19283745', // 18 – Escaladei / La Vilella Alta
  '91029381', // 19 – La Vilella Baixa / Porrera
  '10293847', // 20 – La Figuera / Poboleda
] as const;

export type CardToken = (typeof CARD_TOKENS)[number];

/** Quick O(1) lookup: is a given token a valid card token? */
export const CARD_TOKEN_SET = new Set<string>(CARD_TOKENS);
