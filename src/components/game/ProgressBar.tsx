'use client';

import { motion } from 'framer-motion';
import { TOTAL_CARDS } from '@/constants/cards';
import styles from './progressBar.module.css';

export interface ProgressBarProps {
  unlocked: number;
}

export function ProgressBar({ unlocked }: ProgressBarProps) {
  const percentage = Math.round((unlocked / TOTAL_CARDS) * 100);

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>
        <strong>{unlocked}</strong> de {TOTAL_CARDS} cromos col·leccionats
      </p>

      <div
        role="progressbar"
        aria-valuenow={unlocked}
        aria-valuemin={0}
        aria-valuemax={TOTAL_CARDS}
        aria-label={`${unlocked} de ${TOTAL_CARDS} cromos col·leccionats`}
        className={styles.track}
      >
        <motion.div
          className={styles.fill}
          initial={{ width: '0%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
