"use client";
import Image from "next/image";
import styles from "./card.module.css";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface CardProps {
  setShowModal: (showModal: boolean) => void;
  card: {
    id: string;
    titles: string[];
    portadaImg: string;
    image: string;
    description: string;
    link: string;
    passwordImg: string;
    passwordDescription: string;
    borderColor: string;
  };
}

export const Card = ({ card, setShowModal }: CardProps) => {
  const searchParams = useSearchParams();
  const [allowedImg, setAllowedImg] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { passwordDescription, passwordImg } = card;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const idParam = searchParams.get("id");
      const amountOfCards = localStorage.getItem("amount");

      if (idParam) {
        const checkIfIdExists = localStorage.getItem("qr-list");
        const amount = parseInt(amountOfCards || "0");
        if (checkIfIdExists) {
          const qrList = checkIfIdExists.split(",");
          // Si el id no está en la lista, se agrega
          if (!qrList.includes(idParam)) {
            //suma 1 al contador de cartas
            localStorage.setItem("amount", `${amount + 1}`);

            localStorage.setItem("qr-list", `${checkIfIdExists},${idParam}`);
            setShowModal(true);
            setTimeout(() => {
              setShowModal(false);
            }, 3000);
          }
        } else {
          // Si no existe la lista, se crea con el id actual
          localStorage.setItem("amount", "1");
          localStorage.setItem("qr-list", idParam);
          setShowModal(true);
          setTimeout(() => {
            setShowModal(true);
          }, 5000);
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
      }
      // Set focus if idParam matches card.passwordImg
      const isCardFocused = idParam === passwordImg;
      setIsFocused(isCardFocused);

      // Scroll into view if the card is focused
      if (isCardFocused && cardRef.current) {
        cardRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [searchParams, passwordDescription, passwordImg]);

  return (
    <div className={styles.cardContainer} ref={cardRef}>
      <Link
        href={`/cardpage?id=${card.id}`}
        className={styles.imageContainer}
        style={{
          border: `2px solid ${card.borderColor}`,
          outline: `4px solid ${card.borderColor}`,
          outlineOffset: "2px",
        }}
      >
        <Image
          src={card.portadaImg}
          alt="Prades"
          style={
            {
              // filter: !allowedImg ? " blur(3px) brightness(0.8)" : "",
            }
          }
          layout="fill"
        />
        <Image
          src="/images/sellos/selloMedieval.png"
          alt="Sello Real"
          className={styles.selloReal}
          height={70}
          width={70}
        />
      </Link>
      <div className={styles.bodyContainer}>
        {card.titles.map((title, index) => (
          <h2
            key={index}
            className={styles.cardTitle}
            style={{
              color: isHovered ? card.borderColor : "#000",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {title}
          </h2>
        ))}
      </div>
    </div>
  );
};
