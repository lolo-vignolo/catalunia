"use client";
import styles from "./navbar.module.css";
import { Info } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InfoTooltip } from "../tooltips/InfoTooltip";
import { useGameStore } from "@/hooks/useGameStore";
import { TOTAL_CARDS } from "@/constants/cards";

export const Navbar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const tokens = useGameStore((state) => state.tokens);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogoContainer}>
        <Image
          src="/images/escudo.webp"
          alt="Escut del Comtat de Prades"
          width={40}
          height={50}
          priority
        />
        <h1 className={styles.title}>L&apos;aventura dels 700 anys</h1>
      </div>

      <div className={styles.navbarRight}>
        <motion.span
          key={tokens}
          className={styles.tokenCounter}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 0.4 }}
        >
          🪙 {tokens} / {TOTAL_CARDS}
        </motion.span>

        <button
          className={styles.infoButton}
          onClick={() => setModalIsOpen(!modalIsOpen)}
          aria-label="Informació del joc"
          aria-expanded={modalIsOpen}
        >
          <Info size={28} color="#fff" aria-hidden="true" />
        </button>
      </div>

      <AnimatePresence>
        {modalIsOpen && <InfoTooltip close={setModalIsOpen} />}
      </AnimatePresence>
    </nav>
  );
};
