'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './gameHeader.module.css';

/**
 * Hero section: pergamino title + medieval horse.
 * Replaces the old Header component with a motion entrance animation.
 */
export function GameHeader() {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.titles}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h1 className={styles.title}>Auca de la creació</h1>
        <h1 className={styles.title}>del comtat de les</h1>
        <h1 className={styles.title}>Muntanyes de Prades</h1>
      </motion.div>

      {/* Horse image — entrance fade + perpetual float */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Image
            src="/images/caballo.png"
            alt="Cavall medieval — emblema del comtat"
            width={280}
            height={280}
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
