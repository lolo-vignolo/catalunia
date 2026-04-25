'use client';

import { useEffect, useRef, useId } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { Card } from '@/types/game';
import { TOTAL_CARDS } from '@/constants/cards';
import styles from './celebrationModal.module.css';

export interface CelebrationModalProps {
  card: Card | null;
  unlockedCount: number;
  onClose: () => void;
}

const CONFETTI_ITEMS = Array.from({ length: 10 }, (_, i) => i);

export function CelebrationModal({ card, unlockedCount, onClose }: CelebrationModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Focus trap — move focus to close button when modal opens
  useEffect(() => {
    if (card) {
      closeRef.current?.focus();
    }
  }, [card]);

  // Close on Escape key
  useEffect(() => {
    if (!card) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [card, onClose]);

  return (
    <AnimatePresence>
      {card && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* ── Modal panel ── */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={styles.panel}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {/* Confetti */}
            <div className={styles.confettiContainer} aria-hidden="true">
              {CONFETTI_ITEMS.map((i) => (
                <span key={i} className={styles.confettiPiece} data-index={i} />
              ))}
            </div>

            {/* Card image */}
            <div
              className={styles.imageWrapper}
              style={{ borderColor: card.borderColor, outlineColor: card.borderColor }}
            >
              <Image
                src={card.colorImagePath}
                alt={`Cromo de ${card.townName}`}
                width={220}
                height={290}
                style={{ objectFit: 'cover', display: 'block' }}
                priority
              />
            </div>

            {/* Text */}
            <h2 id={titleId} className={styles.title}>
              Enhorabona!
            </h2>
            <p className={styles.subtitle}>
              Ja tens el cromo de{' '}
              <strong style={{ color: card.borderColor }}>{card.townName}</strong>!
            </p>
            <p className={styles.counter}>
              Tens{' '}
              <strong style={{ color: card.borderColor }}>
                {unlockedCount}
              </strong>{' '}
              cromo{unlockedCount !== 1 ? 's' : ''} de {TOTAL_CARDS}!
            </p>

            {/* Close button — min 48px touch target */}
            <button
              ref={closeRef}
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Tanca la finestra de celebració"
            >
              Continua
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
