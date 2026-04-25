'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { Card } from '@/types/game';
import styles from './gameCard.module.css';

export interface GameCardProps {
  card: Card;
  isUnlocked: boolean;
  /** Index in the grid — first 4 cards get priority loading */
  index: number;
}

export function GameCard({ card, isUnlocked, index }: GameCardProps) {
  const isPriority = index < 4;

  return (
    <motion.article
      role="listitem"
      className={styles.card}
      aria-label={`Cromo de ${card.townName} - ${isUnlocked ? 'col·leccionat' : 'per descobrir'}`}
    >
      {/* ── Locked state: static, unlock only by scanning QR in person ── */}
      {!isUnlocked && (
        <div
          className={styles.imageWrapper}
          style={{ borderColor: card.borderColor, outlineColor: card.borderColor }}
        >
          <Image
            src={card.imagePath}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={isPriority}
            loading={isPriority ? undefined : 'lazy'}
            className={styles.imageLocked}
          />
          <span className={styles.overlay} aria-hidden="true" />
          <span className={styles.lockIcon} aria-hidden="true">🔒</span>
        </div>
      )}

      {/* ── Unlocked state: navigate to card detail page ── */}
      {isUnlocked && (
        <Link
          href={`/cardpage?id=${card.passwordImg}`}
          className={styles.imageWrapper}
          style={{ borderColor: card.borderColor, outlineColor: card.borderColor }}
        >
          <Image
            src={card.colorImagePath}
            alt={`Cromo de ${card.townName}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={isPriority}
            loading={isPriority ? undefined : 'lazy'}
            className={styles.imageUnlocked}
          />
          <AnimatePresence>
            <motion.div
              key="sello"
              className={styles.selloWrapper}
              initial={{ opacity: 0, rotate: -15, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
              aria-hidden="true"
            >
              <Image
                src="/images/sellos/selloMedieval.png"
                alt=""
                width={70}
                height={70}
                priority={false}
              />
            </motion.div>
          </AnimatePresence>
        </Link>
      )}

      {/* ── Card body ── */}
      <div className={styles.body}>
        {card.titles.map((title) => (
          <h2 key={title} className={styles.title} style={{ color: card.borderColor }}>
            {title}
          </h2>
        ))}

        {/* Locked → show map location so user knows where to find the QR */}
        {!isUnlocked && (
          <a
            href={card.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapLink}
            style={{ color: card.borderColor }}
            aria-label={`Busca ${card.townName} al mapa`}
          >
            📍 Busca al mapa
          </a>
        )}

        {/* Unlocked → show the medieval poem */}
        {isUnlocked && (
          <div className={styles.poem} style={{ borderColor: card.borderColor }}>
            <p className={styles.poemLine}>{card.poem.row1}</p>
            <p className={styles.poemLine}>{card.poem.row2}</p>
            <p className={styles.poemLine}>{card.poem.row3}</p>
            <p className={styles.poemLine}>{card.poem.row4}</p>
          </div>
        )}
      </div>
    </motion.article>
  );
}
