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
    if (typeof window !== "undefined") {
      const idParam = searchParams.get("id");

      if (idParam) {
        const checkIfIdExists = localStorage.getItem("qr-list");
        if (checkIfIdExists) {
          const qrList = checkIfIdExists.split(",");

          // Si el id no está en la lista, se agrega
          if (!qrList.includes(idParam)) {
            localStorage.setItem("qr-list", `${checkIfIdExists},${idParam}`);
          }
        } else {
          // Si no existe la lista, se crea con el id actual
          localStorage.setItem("qr-list", idParam);
        }
      }

      // Verificar los permisos de la imagen y descripción
      const storedQrList = localStorage.getItem("qr-list");
      if (storedQrList) {
        const qrList = storedQrList.split(",");

        // Si los ids de las cartas están en la lista, se permiten mostrar las imágenes y descripciones
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
