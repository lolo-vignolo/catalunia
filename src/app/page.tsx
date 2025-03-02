"use client";
import styles from "./page.module.css";
import { Card } from "@/components/Card/Card";
import { cardsData } from "@/data/cardData";
import { Suspense, useEffect, useState } from "react";
import { Modal } from "@/components/Modal/Modal";
import { Header } from "@/components/Header/Header";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { Flourish, FlourishAlt } from "@/svg/Flourish";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [listOfAllowedCards, setListOfAllowedCards] = useState<
    string[] | undefined
  >([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const passwordsSaved = localStorage.getItem("qr-list");
      if (passwordsSaved) {
        const listOfPasswords = passwordsSaved.split(",");
        setListOfAllowedCards(listOfPasswords);
      }
    }
  }, []);

  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <main className={styles.main}>
        <Navbar />
        <div className={styles.mainContainer}>
          <img
            src="/images/pergaminoCorner.webp"
            alt="Prades"
            className={styles.imageBg}
          />
          <Header />
          <div className={styles.flourishContainer}>
            <Flourish />
          </div>
          <div className={styles.cardsContainer}>
            {cardsData.map((card) => {
              const isAllowwed = listOfAllowedCards?.includes(card.passwordImg);
              const isFocused =
                listOfAllowedCards?.[listOfAllowedCards.length - 1] ===
                card.passwordImg;

              return (
                <Suspense key={card.id} fallback={<div>Loading...</div>}>
                  <Card
                    card={card}
                    isAllowwed={isAllowwed}
                    isFocused={isFocused}
                  />
                </Suspense>
              );
            })}
            <FlourishAlt />
          </div>
        </div>
      </main>
      <Footer />
    </Modal>
  );
}
