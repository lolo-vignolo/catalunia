"use client";
import Image from "next/image";
import styles from "./card.module.css";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CardProps {
  card: {
    id: number;
    title: string;
    image: string;
    description: string;
    passwordImg: string;
    passwordDescription: string;
  };
}

export const Card = ({ card }: CardProps) => {
  const searchParams = useSearchParams();

  const [allowedImg, setAllowedImg] = useState<boolean>(false);
  const [allowedDescription, setAllowedDescription] = useState<boolean>(false);

  const { passwordDescription, passwordImg } = card;

  useEffect(() => {
    if (typeof window !== undefined) {
      const idParam = searchParams.get("id");
      if (idParam) {
        const checkIfIdExists = localStorage.getItem("qr-list");
        if (checkIfIdExists) {
          const qrList = checkIfIdExists.split(",");

          if (!qrList.includes(idParam)) {
            localStorage.setItem("qr-list", `${checkIfIdExists},${idParam}`);
          }
        }
      }

      const storedQrList = localStorage.getItem("qr-list");
      if (storedQrList) {
        const qrList = storedQrList.split(",");

        if (qrList.includes(passwordImg)) {
          setAllowedImg(true);
        }
        if (qrList.includes(passwordDescription)) {
          setAllowedDescription(true);
        }
      }
    }
  }, [searchParams, passwordDescription, passwordImg]);

  return (
    <div className={styles.cardContainer}>
      <h1>{passwordDescription ? "hola" : "chau"}</h1>
      <div className={styles.imageContainer}>
        <Image
          src={card.image}
          alt="Prades"
          style={{ filter: !allowedImg ? "blur(5px)" : "" }}
          layout="fill"
        />
      </div>
      <div
        className={styles.bodyContainer}
        style={{ filter: !allowedDescription ? "blur(5px)" : "" }}
      >
        <p className={styles.cardBody}>{card.description}</p>
      </div>
    </div>
  );
};
