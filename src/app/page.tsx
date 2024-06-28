import Image from "next/image";
import styles from "./page.module.css";
import { Card } from "@/components/Card";
import { cardsData } from "@/data/cardData";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className={styles.headerContainer}>
          <Image
            src="/images/caballo.png"
            alt="Prades"
            width={300}
            height={300}
          />
          <h1 className={styles.title}>
            Auca de la creacio del comtat de les Muntanyes de Prades
          </h1>
        </div>
        <div className={styles.cardsContainer}>
          {cardsData.map((card) => {
            return (
              <Suspense key={card.id} fallback={<div>Loading...</div>}>
                <Card card={card} />
              </Suspense>
            );
          })}
        </div>
      </div>
    </main>
  );
}
