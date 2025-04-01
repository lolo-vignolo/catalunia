import Image from "next/image";
import styles from "./header.module.css";

export const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2.3rem",
          marginLeft: "3rem",
        }}
      >
        <h1 className={styles.title}>Auca de la creació </h1>
        <h1 className={styles.title}>del comtat de les</h1>
        <h1 className={styles.title}>Muntanyes de Prades</h1>
      </div>
      <Image src="/images/caballo.png" alt="Prades" width={300} height={300} />
    </div>
  );
};
