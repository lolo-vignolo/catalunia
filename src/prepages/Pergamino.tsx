"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import styles from "./cardprepage.module.css";
import { cardsData } from "@/data/cardData";
import { useSearchParams } from "next/navigation";
import { Flourish, FlourishAlt } from "@/svg/Flourish";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useGameStore } from "@/hooks/useGameStore";

const Pergamino = () => {
  const searchParams = useSearchParams();
  // ⚠️ Always read as searchParams.id — QR codes use this exact param name
  const id = searchParams.get("id");
  const card = cardsData.find((card) => card.passwordImg === id);
  const { unlockCard } = useGameStore();

  // Unlock the card when the user lands via QR scan
  useEffect(() => {
    const idParam = searchParams.get("id");
    if (idParam) {
      unlockCard(idParam);
      // Signal CardGrid to show the celebration modal when user navigates back
      sessionStorage.setItem("newlyUnlocked", idParam);
    }
  }, [searchParams, unlockCard]);

  if (!card) return null;

  return (
    <motion.div
      className={styles.container}
      initial={{
        scaleY: 0,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 5%, 0% 5%)",
        opacity: 0.7,
        borderRadius: "60px 60px 10px 10px",
        boxShadow: "0px 25px 60px rgba(0,0,0,0.6)",
        rotate: -2,
      }}
      animate={{
        scaleY: 1,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        opacity: 1,
        borderRadius: "25px",
        boxShadow: "0px 12px 30px rgba(0,0,0,0.4)",
        rotate: 0,
        transition: {
          duration: 2,
          ease: [0.25, 1, 0.5, 1],
        },
      }}
    >
      <motion.div
        className={styles.innerContent}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { delay: 1, duration: 1.5, ease: "easeOut" },
        }}
      >
        <div className={styles.containerCard}>
          {/* Back button — min 48px touch target */}
          <Link
            href="/"
            className={styles.backButton}
            aria-label="Tornar a la col·lecció"
            style={{ borderColor: card.borderColor }}
          >
            <ArrowLeft size={24} aria-hidden="true" />
            Tornar
          </Link>

          <div
            className={styles.imageFrame}
            style={{
              border: `3px solid ${card.borderColor}`,
              outline: `5px solid ${card.borderColor}`,
              outlineOffset: "2px",
            }}
          >
            <Image src={card.image} alt={`Cromo de ${card.titles[0]}`} width={300} height={300} />
          </div>

          <div className={styles.descritionContainer}>
            <div className={styles.flourishWrapper}><Flourish color={card.borderColor} /></div>
            <div className={styles.poemBlock}>
              <p className={styles.description}>{card.description_row1}</p>
              <p className={styles.description}>{card.description_row2}</p>
              <p className={styles.description}>{card.description_row3}</p>
              <p className={styles.description}>{card.description_row4}</p>
            </div>

            <div className={styles.flourishWrapper}><FlourishAlt color={card.borderColor} /></div>
            <Image
              src={"/images/sellos/selloReal.webp"}
              alt="Sello reial del comtat"
              className={styles.sello}
              width={80}
              height={80}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Pergamino;
