// Server Component — no 'use client'. All interactivity lives in <CardGrid />.
import { Suspense } from 'react';
import styles from './page.module.css';
import { Navbar } from '@/components/Navbar/Navbar';
import { GameHeader } from '@/components/ui/GameHeader';
import { Footer } from '@/components/Footer/Footer';
import { CardGrid } from '@/components/game/CardGrid';
import { Flourish } from '@/svg/Flourish';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          {/* decorative corner parchment — aria-hidden */}
          <img
            src="/images/pergaminoCorner.webp"
            alt=""
            className={styles.imageBg}
            aria-hidden="true"
          />

          <GameHeader />

          <div className={styles.flourishContainer}>
            <Flourish color="#5c3100" />
          </div>

          {/* CardGrid is a Client Component: handles Zustand, unlocking, modal */}
          <Suspense fallback={<div className={styles.gridPlaceholder} />}>
            <CardGrid />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
