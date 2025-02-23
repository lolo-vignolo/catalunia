"use client";
import Image from "next/image";
import styles from "./cardprepage.module.css";
import { cardsData } from "@/data/cardData";
import { useSearchParams } from "next/navigation";
import { Flourish, FlourishAlt } from "@/svg/Flourish";
import { ArrowLeft } from "lucide-react";

export default function CardPrePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Accede a los parámetros de la query

  const card = cardsData.find((card) => card.id === id);
  if (!card) return null;

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className={styles.containerCard}>
      <ArrowLeft
        size={40}
        color="#000"
        style={{
          cursor: "pointer",
          marginRight: "auto",
        }}
        onClick={handleGoBack}
      />
      <div
        style={{
          width: "fit-content",
          height: "fit-content",
          border: `3px solid ${card.borderColor}`,
          outline: `5px solid ${card.borderColor}`,
          outlineOffset: "2px",
        }}
      >
        <Image src={card.image} alt="1" width={300} height={300} />
      </div>
      <div className={styles.descritionContainer}>
        <Flourish color={card.borderColor} />
        <p className={styles.description}>{card.description}</p>
        <FlourishAlt color={card.borderColor} />

        <Image
          src={"/images/sellos/selloReal.webp"}
          alt="1"
          width={80}
          height={80}
        />
      </div>
    </div>
  );
}
