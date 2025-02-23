"use client";
import styles from "./navbar.module.css";
import { Info } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { InfoTooltip } from "../tooltips/InfoTooltip";

export const Navbar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogoContainer}>
        <Image src="/images/escudo.webp" alt="Prades" width={50} height={50} />
        <h1 className={styles.title}>700 anys</h1>
      </div>
      <Info
        size={30}
        color="#fff"
        style={{ cursor: "pointer" }}
        onClick={() => setModalIsOpen(!modalIsOpen)}
      />
      {modalIsOpen && <InfoTooltip close={setModalIsOpen} />}
    </nav>
  );
};
