import styles from "./navbar.module.css";
import { Info } from "lucide-react";
import Image from "next/image";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogoContainer}>
        <Image src="/images/escudo.webp" alt="Prades" width={50} height={50} />
        <h1 className={styles.title}>700 anys</h1>
      </div>
      <Info size={30} color="#fff" />
    </nav>
  );
};
