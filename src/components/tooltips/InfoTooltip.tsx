"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./infoTooltip.module.css";

export const InfoTooltip = ({ close }: { close: (value: boolean) => void }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <div
      className={styles.backdrop}
      onClick={() => close(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tooltip-title"
    >
      <motion.div
        className={styles.panel}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
        <button
          ref={closeRef}
          className={styles.closeButton}
          onClick={() => close(false)}
          aria-label="Tanca la finestra d'informació"
        >
          ✕
        </button>

        <div className={styles.content}>
          <h2 id="tooltip-title" className={styles.mainTitle}>
            {ca.title}
          </h2>
          <p className={styles.text}>{ca.text}</p>

          <h3 className={styles.sectionTitle}>{ca.howToPlay}</h3>
          <ul className={styles.stepsList}>
            <li className={styles.step}>{ca.step1}</li>
            <li className={styles.step}>{ca.step2}</li>
            <li className={styles.step}>{ca.step3}</li>
            <li className={styles.step}>{ca.step4}</li>
          </ul>

          <h3 className={styles.sectionTitle}>{ca.objective}</h3>
          <p className={styles.text}>{ca.objectiveText}</p>

          <h3 className={styles.sectionTitle}>{ca.ready}</h3>
          <p className={styles.text}>{ca.readyText}</p>
        </div>
      </motion.div>
    </div>
  );
};

const ca = {
  title:
    "🏰 Viu l'èpica aventura dels 700 anys del comtat de les Muntanyes de Prades! 🎉",
  text: "Enguany celebrem el 7è centenari de la creació del comtat de les Muntanyes de Prades i la seva annexió amb la baronia d'Entença. Aprofita l'efemèride per conèixer els indrets que havien format part d'aquest important senyoriu tot jugant.",
  howToPlay: "🗺️ Com s'hi juga?",
  step1:
    "1️⃣ Escull un poble del mapa (si vols completar l'auca, hauràs d'anar a Siurana, Prades i Falset, les capitals històriques del comtat, mentre que la resta de cromos els podràs obtenir en dos llocs diferents, indicats amb un mateix color)",
  step2:
    "2️⃣ Desplaça't a la destinació escollida i busca el cavaller dels 700 (una pista: el podràs trobar en edificis singulars, als Ajuntaments, Oficines de Turisme o panells informatius del municipi)",
  step3:
    "3️⃣ Escaneja amb el teu mòbil el codi QR que veuràs al costat de cada cavaller i se't desbloquejarà una imatge secreta i el text de cada vinyeta",
  step4:
    "4️⃣ Completa la teva col·lecció de cromos virtuals que configuren l'auca.",
  objective: "🔎 Objectiu del joc",
  objectiveText:
    "A la pàgina principal veuràs 20 cromos per descobrir. A sota de cada cromo hi trobaràs el nom del poble i un '📍 Busca al mapa' per localitzar on és el codi QR.",
  ready: "💡 Esteu preparats i preparades?",
  readyText:
    "Molta sort i... a buscar sense parar! Descobreix i gaudeix de tot el que l'antic comtat de les Muntanyes de Prades us pot oferir 🏃‍♂️🎯",
};
