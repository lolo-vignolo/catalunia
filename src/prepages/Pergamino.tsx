"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./cardprepage.module.css";
import { cardsData } from "@/data/cardData";
import { useSearchParams } from "next/navigation";
import { Flourish, FlourishAlt } from "@/svg/Flourish";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Pergamino = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const card = cardsData.find((card) => card.passwordImg === id);

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
    }
  }, [searchParams]);

  if (!card) return null;

  return (
    <motion.div
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
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        paddingTop: "5rem",
        height: "65rem",
        transformOrigin: "top",
        backgroundImage: "url('/images/pergamino.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Contenido del pergamino */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { delay: 1, duration: 1.5, ease: "easeOut" },
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontSize: "24px",
          fontWeight: "bold",
          textShadow: "2px 2px 5px rgba(0,0,0,0.3)",
          padding: "20px",
        }}
      >
        <div className={styles.containerCard}>
          <button
            style={{
              position: "absolute",
              top: "-2rem",
              left: "2rem",
              width: "4rem",
              display: "flex",
              justifyContent: "center",
              borderRadius: "0.5rem",
              border: `solid 3px ${card.borderColor} `,
            }}
          >
            <Link href="/">
              <ArrowLeft size={30} color="#000" />
            </Link>
          </button>
          <div
            style={{
              width: "fit-content",
              height: "fit-content",
              border: `3px solid ${card.borderColor}`,
              outline: `5px solid ${card.borderColor}`,
              outlineOffset: "2px",
              boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease-in-out",
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
      </motion.div>
    </motion.div>
  );
};

export default Pergamino;
