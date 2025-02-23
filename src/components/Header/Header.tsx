import Image from "next/image";
import styles from "./header.module.css";

export const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.title}>
        Auca de la creacio del comtat de les Muntanyes de Prades
      </h1>
      <Image src="/images/caballo.png" alt="Prades" width={300} height={300} />
    </div>
  );
};
