"use client";
import Image from "next/image";
import styles from "./card.module.css";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface CardProps {
  isAllowwed: boolean | undefined;
  isFocused: boolean | undefined;
  card: {
    id: string;
    titles: string[];
    portadaImg: string;
    image: string;
    description: string;
    link: string;
    passwordImg: string;
    borderColor: string;
  };
}

export const Card = ({ card, isAllowwed, isFocused }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isFocused) {
      cardRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <div className={styles.cardContainer} ref={cardRef} tabIndex={0}>
      <Link
        href={`/cardpage?id=${card.passwordImg}`}
        className={styles.imageContainer}
        style={{
          border: `2px solid ${card.borderColor}`,
          outline: `4px solid ${card.borderColor}`,
          outlineOffset: "2px",
          pointerEvents: isAllowwed ? "auto" : "none",
        }}
      >
        <Image
          src={!isAllowwed ? card.portadaImg : card.image}
          alt="Prades"
          style={{
            filter: !isAllowwed ? " blur(3px) brightness(0.8)" : "",
          }}
          layout="fill"
        />
        {!isAllowwed && (
          <Image
            src="/images/sellos/selloMedieval.png"
            alt="Sello Real"
            className={styles.selloReal}
            height={70}
            width={70}
          />
        )}
      </Link>
      <div className={styles.bodyContainer}>
        {card.titles.map((title, index) => (
          <h2
            key={index}
            className={styles.cardTitle}
            style={{
              color: hoveredIndex === index ? card.borderColor : "#000",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            {title}
          </h2>
        ))}
        {isModalOpen && (
          <div
            className={styles.modal}
            style={{ backgroundColor: card.borderColor }}
          >
            <p>
              Busca <span>📍</span>
              <span>
                <a href={card.link} target="_blank" rel="noreferrer">
                  {card.titles.map((title, index) => (
                    <p key={index}>
                      {title + " "}
                      {index === card.titles.length - 1 ? "" : "/ "}
                    </p>
                  ))}
                </a>
              </span>{" "}
              al mapa i fes click a la icona o a la barra lateral
            </p>

            <button
              className={styles.closeModal}
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
