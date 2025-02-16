"use client";
import styles from "./page.module.css";
import { Card } from "@/components/Card/Card";
import { cardsData } from "@/data/cardData";
import { Suspense, useState } from "react";
import { Modal } from "@/components/Modal/Modal";
import { Header } from "@/components/Header/Header";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import Image from "next/image";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <main className={styles.main}>
        <Navbar />
        <div style={{ position: "relative" }}>
          <Header />
          <div className={styles.cardsContainer}>
            {cardsData.map((card) => {
              return (
                <Suspense key={card.id} fallback={<div>Loading...</div>}>
                  <Card card={card} setShowModal={setShowModal} />
                </Suspense>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </Modal>
  );
}
