import styles from "./navbar.module.css";
import globalStyle from "../app/page.module.css";
import Image from "next/image";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Image src="/images/caballo.png" alt="Prades" width={50} height={50} />
      <h1 className={styles.title}>Set cents comtat prades</h1>
    </nav>
  );
};
